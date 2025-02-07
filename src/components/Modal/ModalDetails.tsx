"use client";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PencilIcon } from '../ui/icons';
import { Dispatch, FormEvent, SetStateAction, useState, useEffect } from 'react';

type SocialNetwork = {
  platform: string;
  url: string;
};

type Profile = {
  firstName: string;
  lastName: string;
  location: string;
  socialNetworks: SocialNetwork[];
};

export type EditProfileModalProps = {
  profile: Profile;
  setProfile: Dispatch<SetStateAction<Profile>>;
};

function EditProfileModal({ profile, setProfile }: EditProfileModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Profile>(profile);
  const [newSocialNetwork, setNewSocialNetwork] = useState<SocialNetwork>({
    platform: '',
    url: ''
  });

  useEffect(() => {
    if (isOpen) {
      setFormData(profile);
    }
  }, [isOpen, profile]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProfile(formData);
    setIsOpen(false);
  };

  const handleClose = () => {
    setFormData(profile);
    setIsOpen(false);
  };

  const addSocialNetwork = () => {
    if (newSocialNetwork.platform && newSocialNetwork.url) {
      setFormData(prev => ({
        ...prev,
        socialNetworks: [...prev.socialNetworks, newSocialNetwork]
      }));
      setNewSocialNetwork({ platform: '', url: '' });
    }
  };

  const removeSocialNetwork = (index: number) => {
    setFormData(prev => ({
      ...prev,
      socialNetworks: prev.socialNetworks.filter((_, i) => i !== index)
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) handleClose();
      setIsOpen(open);
    }}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <PencilIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombre</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    firstName: e.target.value
                  }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Apellido</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    lastName: e.target.value
                  }))}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Ubicación</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  location: e.target.value
                }))}
              />
            </div>

            <div className="space-y-4">
              <Label>Redes Sociales</Label>
              {formData.socialNetworks.map((social, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={social.platform}
                    disabled
                    className="w-1/3"
                  />
                  <Input
                    value={social.url}
                    disabled
                    className="w-2/3"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeSocialNetwork(index)}
                  >
                    ×
                  </Button>
                </div>
              ))}
              
              <div className="flex gap-2">
                <Input
                  placeholder="Plataforma"
                  value={newSocialNetwork.platform}
                  onChange={(e) => setNewSocialNetwork(prev => ({
                    ...prev,
                    platform: e.target.value
                  }))}
                  className="w-1/3"
                />
                <Input
                  placeholder="URL"
                  value={newSocialNetwork.url}
                  onChange={(e) => setNewSocialNetwork(prev => ({
                    ...prev,
                    url: e.target.value
                  }))}
                  className="w-2/3"
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={addSocialNetwork}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit">Guardar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfileModal;