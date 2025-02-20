import { AppDataSource } from '../config/data-source';
import { CreateProposalDto, UpdateProposalStatusDto } from '../dtos/proposalDto';
import { ProposalFeedback } from '../models/proposalFeedbackModel';
import { Proposal } from '../models/proposalModel';
import { ProposalStatus } from '../types/proposalTypes';

export class ProposalService {
  private proposalRepository = AppDataSource.getRepository(Proposal);

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

  async updateProposalStatus(
    proposalId: string,
    updateStatusDto: UpdateProposalStatusDto
  ): Promise<Proposal> {
    const proposal = await this.proposalRepository.findOne({
      where: { id: proposalId },
      relations: ['freelancer', 'gig'] // Cargar las relaciones
    });

    if (!proposal) {
      throw new Error('Proposal not found');
    }

    proposal.status = updateStatusDto.status as ProposalStatus;
    
    // Si hay feedback, añadirlo
    if (updateStatusDto.feedback) {
      const feedback = new ProposalFeedback();
      feedback.proposal = proposal;
      feedback.content = updateStatusDto.feedback;
      // Guardar el feedback
      await AppDataSource.getRepository('ProposalFeedback').save(feedback);
    }

    return this.proposalRepository.save(proposal);
  }

  async getProposalsByGig(gigId: string): Promise<Proposal[]> {
    return this.proposalRepository.find({
      where: { gig: { id: gigId } },
      relations: ['freelancer', 'feedback', 'gig'],
      order: {
        createdAt: 'DESC'
      }
    });
  }

  // Método adicional útil
  async getFreelancerProposals(freelancerId: string): Promise<Proposal[]> {
    return this.proposalRepository.find({
      where: { freelancer: { id: freelancerId } },
      relations: ['gig', 'feedback'],
      order: {
        createdAt: 'DESC'
      }
    });
  }
}