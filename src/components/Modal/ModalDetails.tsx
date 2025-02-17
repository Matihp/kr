"use client";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PencilIcon } from '../ui/icons';
import { useState, useEffect } from 'react';

type Profile = {
  firstName: string;
  lastName: string;
  location: string;
  socialLinks: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
  };
};

export type EditProfileModalProps = {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
};

const defaultProfile: Profile = {
  firstName: '',
  lastName: '',
  location: '',
  socialLinks: {
    linkedin: '',
    instagram: '',
    twitter: ''
  }
};

function EditProfileModal({ profile, setProfile }: EditProfileModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Profile>({
    ...defaultProfile,
    ...profile,
    socialLinks: {
      ...defaultProfile.socialLinks,
      ...profile.socialLinks
    }
  });
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        ...defaultProfile,
        ...profile,
        socialLinks: {
          ...defaultProfile.socialLinks,
          ...profile.socialLinks
        }
      });
    }
  }, [isOpen, profile]);

  const fetchLocationSuggestions = async (query: string) => {
    if (query.length < 3) {
      setLocationSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1`
      );
      const data = await response.json();
      
      const suggestions = data
        .filter((item: any) => item.address.city || item.address.town || item.address.village)
        .map((item: any) => {
          const city = item.address.city || item.address.town || item.address.village;
          return `${city}, ${item.address.country}`;
        })
        .filter((value: string, index: number, self: string[]) => self.indexOf(value) === index)
        .slice(0, 5);

      setLocationSuggestions(suggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching locations:', error);
      setLocationSuggestions([]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProfile(formData);
    setIsOpen(false);
  };

  const handleClose = () => {
    setFormData({
      ...defaultProfile,
      ...profile,
      socialLinks: {
        ...defaultProfile.socialLinks,
        ...profile.socialLinks
      }
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) handleClose();
      setIsOpen(open);
    }}>
      <DialogTrigger asChild>
        <PencilIcon />
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
            
            <div className="space-y-2 relative">
              <Label htmlFor="location">Ubicación</Label>
              <Input
                id="location"
                value={formData.location !== 'Ubicación' ? formData.location : ''}
                onChange={(e) => {
                  setFormData(prev => ({
                    ...prev,
                    location: e.target.value
                  }));
                  fetchLocationSuggestions(e.target.value);
                }}
                onFocus={() => setShowSuggestions(true)}
              />
              {showSuggestions && locationSuggestions.length > 0 && (
                <div className="absolute z-10 w-full bg-white border rounded-md shadow-lg mt-1">
                  {locationSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          location: suggestion
                        }));
                        setShowSuggestions(false);
                      }}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Label>Redes Sociales</Label>
              <div className="space-y-2">
                <Input
                  placeholder="URL de LinkedIn"
                  value={formData.socialLinks.linkedin}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    socialLinks: {
                      ...prev.socialLinks,
                      linkedin: e.target.value
                    }
                  }))}
                />
                <Input
                  placeholder="URL de Instagram"
                  value={formData.socialLinks.instagram}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    socialLinks: {
                      ...prev.socialLinks,
                      instagram: e.target.value
                    }
                  }))}
                />
                <Input
                  placeholder="URL de Twitter"
                  value={formData.socialLinks.twitter}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    socialLinks: {
                      ...prev.socialLinks,
                      twitter: e.target.value
                    }
                  }))}
                />
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