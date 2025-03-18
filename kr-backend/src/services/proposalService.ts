import { Not } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { CreateProposalDto, UpdateProposalStatusDto } from '../dtos/proposalDto';
import { ProposalFeedback } from '../models/proposalFeedbackModel';
import { Proposal } from '../models/proposalModel';
import { ProposalStatus } from '../types/proposalTypes';
import { NotificationService } from './notificationService';
import { NotificationType } from '../types/notificationTypes';

export class ProposalService {
  private proposalRepository = AppDataSource.getRepository(Proposal);
  private notificationService = new NotificationService();

  async getFreelancerProposals(freelancerId: string): Promise<Proposal[]> {
    return this.proposalRepository.find({
      where: { freelancer: { id: freelancerId } },
      relations: ['gig', 'gig.recruiter'],
      order: { createdAt: 'DESC' }
    });
  }

  async getProposalById(proposalId: string, userId?: string, userType?: string): Promise<Proposal> {
    const queryOptions: any = {
      where: { id: proposalId },
      relations: ['freelancer', 'gig', 'gig.recruiter']
    };
    
    if (userId) {
      if (userType === 'freelancer') {
        queryOptions.where.freelancer = { id: userId };
      } else if (userType === 'recruiter') {
        queryOptions.where.gig = { recruiter: { id: userId } };
      }
    }
    
    const proposal = await this.proposalRepository.findOne(queryOptions);
    
    if (!proposal) {
      throw new Error('Proposal not found or you do not have permission to view it');
    }
    
    return proposal;
  }

  async getGigProposals(gigId: string): Promise<Proposal[]> {
    return this.proposalRepository.find({
      where: { gig: { id: gigId } },
      relations: ['freelancer', 'gig', 'gig.recruiter'],
      order: { createdAt: 'DESC' }
    });
  }

  async createProposal(freelancerId: string, createProposalDto: CreateProposalDto): Promise<Proposal> {
    // Verificar que el gig existe
    const gig = await AppDataSource.getRepository('Gig').findOne({
      where: { id: createProposalDto.gigId }
    });

    if (!gig) {
      throw new Error('Gig not found');
    }

    const proposal = new Proposal();
    proposal.freelancer = { id: freelancerId } as any;
    proposal.gig = { id: createProposalDto.gigId } as any;
    proposal.price = createProposalDto.price;
    proposal.description = createProposalDto.description;
    proposal.videoUrl = createProposalDto.videoUrl;
    proposal.priceOptions = createProposalDto.priceOptions;
    proposal.status = ProposalStatus.PENDING;

    const savedProposal = await this.proposalRepository.save(proposal);

    // Retornar la propuesta con sus relaciones
    return this.proposalRepository.findOne({
      where: { id: savedProposal.id },
      relations: ['freelancer', 'gig']
    }) as Promise<Proposal>;
  }

  async updateProposal(
    proposalId: string,
    freelancerId: string,
    updateProposalDto: any
  ): Promise<Proposal> {
    const proposal = await this.proposalRepository.findOne({
      where: { id: proposalId, freelancer: { id: freelancerId } },
      relations: ['freelancer', 'gig']
    });
  
    if (!proposal) {
      throw new Error('Propuesta no encontrada o no tienes permiso para editarla');
    }
  
    // Solo permitir editar propuestas pendientes
    if (proposal.status !== ProposalStatus.PENDING) {
      throw new Error('Solo se pueden editar propuestas que estén en estado pendiente');
    }
  
    // Actualizar los campos proporcionados
    if (updateProposalDto.price !== undefined) {
      proposal.price = updateProposalDto.price;
    }
    
    if (updateProposalDto.description !== undefined) {
      proposal.description = updateProposalDto.description;
    }
    
    if (updateProposalDto.videoUrl !== undefined) {
      proposal.videoUrl = updateProposalDto.videoUrl;
    }
    
    if (updateProposalDto.priceOptions !== undefined) {
      proposal.priceOptions = updateProposalDto.priceOptions;
    }
  
    return this.proposalRepository.save(proposal);
  }
  
  async deleteProposal(proposalId: string, freelancerId: string): Promise<void> {
    const proposal = await this.proposalRepository.findOne({
      where: { id: proposalId, freelancer: { id: freelancerId } },
      relations: ['freelancer']
    });
  
    if (!proposal) {
      throw new Error('Propuesta no encontrada o no tienes permiso para eliminarla');
    }
  
    // Solo permitir eliminar propuestas pendientes
    if (proposal.status !== ProposalStatus.PENDING) {
      throw new Error('Solo se pueden eliminar propuestas que estén en estado pendiente');
    }
  
    await this.proposalRepository.remove(proposal);
  }

  async updateProposalStatus(
    proposalId: string,
    updateStatusDto: UpdateProposalStatusDto
  ): Promise<Proposal> {
    const proposal = await this.proposalRepository.findOne({
      where: { id: proposalId },
      relations: ['freelancer', 'gig', 'gig.recruiter']
    });

    if (!proposal) {
      throw new Error('Proposal not found');
    }

    if (!proposal.freelancer || !proposal.gig) {
      throw new Error('Proposal data is incomplete');
    }

    proposal.status = updateStatusDto.status as ProposalStatus;

    // Si la propuesta es aceptada
    if (updateStatusDto.status === ProposalStatus.ACCEPTED) {
      // Rechazar automáticamente otras propuestas
      await this.rejectOtherProposals(proposal.gig.id, proposalId);    
      // Notificar al freelancer aceptado - with null check
      if (proposal.freelancer && proposal.freelancer.id) {
        await this.notificationService.create({
          userId: proposal.freelancer.id,
          message: `¡Felicitaciones! Tu propuesta para "${proposal.gig.title}" ha sido aceptada.`,
          type: NotificationType.SUCCESS,
          isRead: false
        });
      }
      // Si hay feedback, añadirlo (solo para propuestas aceptadas)
      if (updateStatusDto.feedback && proposal.gig.recruiter) {
        const feedback = new ProposalFeedback();
        feedback.proposal = proposal;
        feedback.user = proposal.gig.recruiter;
        feedback.content = updateStatusDto.feedback;
        await AppDataSource.getRepository(ProposalFeedback).save(feedback);
      }
    }

    return this.proposalRepository.save(proposal);
  }

  private async rejectOtherProposals(gigId: string, acceptedProposalId: string): Promise<void> {
    const otherProposals = await this.proposalRepository.find({
      where: {
        gig: { id: gigId },
        id: Not(acceptedProposalId),
        status: Not(ProposalStatus.REJECTED)
      },
      relations: ['freelancer', 'gig']
    });

    for (const proposal of otherProposals) {
      proposal.status = ProposalStatus.REJECTED;
      await this.proposalRepository.save(proposal);

      if (proposal.freelancer && proposal.freelancer.id && proposal.gig) {
        // Notificar a los freelancers rechazados
        await this.notificationService.create({
          userId: proposal.freelancer.id,
          message: `Tu propuesta para "${proposal.gig.title}" no ha sido seleccionada. ¡No te desanimes, hay más oportunidades!`,
          type: NotificationType.INFO,
          isRead: false
        });
      }
    }
  }
}