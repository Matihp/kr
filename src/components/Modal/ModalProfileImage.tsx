import React, { useState, useCallback, ChangeEvent, useRef } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RotateCw, ZoomIn } from "lucide-react";
import { PencilIcon } from '../ui/icons';

export interface EditedImage {
  imageUrl: string;
  zoom: number;
  rotation: number;
}

interface ModalProfileImageProps {
  onSave: (editedImage: EditedImage) => void;
  currentImageUrl: string;
}

const ModalProfileImage: React.FC<ModalProfileImageProps> = ({ onSave, currentImageUrl }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(currentImageUrl);
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleZoomChange = useCallback((value: number[]) => {
    setZoom(value[0]);
  }, []);

  const handleRotationChange = useCallback(() => {
    setRotation((prev) => (prev + 90) % 360);
  }, []);

  const processImage = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (imgRef.current && previewUrl) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Could not get 2D context'));
          return;
        }

        const img = new Image();
        img.onload = () => {
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;

          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate((rotation * Math.PI) / 180);
          ctx.scale(zoom, zoom);
          ctx.drawImage(
            img,
            -img.naturalWidth / 2,
            -img.naturalHeight / 2,
            img.naturalWidth,
            img.naturalHeight
          );

          resolve(canvas.toDataURL('image/jpeg'));
        };
        img.src = previewUrl;
      } else {
        reject(new Error('No image to process'));
      }
    });
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const processedImageUrl = await processImage();
      onSave({ imageUrl: processedImageUrl, zoom, rotation });
      setIsOpen(false);
    } catch (error) {
      console.error('Error processing image:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    } finally {
      setIsLoading(false);
    }
  };
  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <PencilIcon onClick={openModal} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Foto de Perfil</DialogTitle>
          <DialogDescription>Sube y edita tu foto de perfil.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
          {previewUrl && (
            <div className="relative w-full h-64 overflow-hidden">
              <img
                ref={imgRef}
                src={previewUrl}
                alt="Profile Preview"
                style={{
                  transform: `scale(${zoom}) rotate(${rotation}deg)`,
                  transition: 'transform 0.3s ease',
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>
          )}
          <div className="flex items-center space-x-2">
            <ZoomIn className="h-4 w-4" />
            <Slider
              value={[zoom]}
              min={0.5}
              max={2}
              step={0.1}
              onValueChange={handleZoomChange}
            />
          </div>
          <Button onClick={handleRotationChange} className="w-full">
            <RotateCw className="mr-2 h-4 w-4" /> Rotar
          </Button>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? 'Guardando...' : 'Guardar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalProfileImage;