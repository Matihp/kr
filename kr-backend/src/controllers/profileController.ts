import { Request, Response } from 'express';
import { ProfileService } from '../services/profileService';
import { ProfileData } from '../types/profileTypes';
import { handleError } from '../utils/errorUtils';

export class ProfileController {
  private profileService: ProfileService;

  constructor() {
    this.profileService = new ProfileService();
  }

  public updateProfile = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const profileData: ProfileData = req.body;

    try {
      const user = await this.profileService.updateProfile(userId, profileData);
      res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
      handleError(error, res);
    }
  };
}

