import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Icon from '@mdi/react';
import { mdiDeleteCircle } from '@mdi/js';
import { PencilIcon } from './icons';

interface ExtendedFile extends File {
  path: string;
  preview?: string;
}

interface DropzoneProps {
  onDrop: (acceptedFiles: File[]) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onDrop }) => {
  const [files, setFiles] = useState<ExtendedFile[]>([]);

  const onDropAccepted = useCallback((acceptedFiles: File[]) => {
    console.log('Archivos aceptados:', acceptedFiles);

    const filesWithPreview = acceptedFiles.map(file => ({
      ...file,
      preview: file.type && file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    })) as ExtendedFile[];

    setFiles(prevFiles => {
      if (prevFiles.length > 0) {
        return [filesWithPreview[0]];
      }
      return [...prevFiles, ...filesWithPreview];
    });

    onDrop(acceptedFiles);
  }, [onDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDropAccepted, maxFiles: 1 });

  const removeFile = (file: ExtendedFile) => () => {
    console.log('Eliminando archivo:', file);

    const newFiles = files.filter(f => f !== file);
    if (file.preview) {
      URL.revokeObjectURL(file.preview);
    }
    setFiles(newFiles);
    onDrop([]); // Informamos que no hay archivo
  };

  useEffect(() => {
    return () => {
      files.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  const truncateFileName = (fileName: string) => {
    if (fileName.length <= 10) {
      return fileName;
    } else {
      return fileName.slice(0, 7) + '...';
    }
  };

  return (
    <div {...getRootProps()} style={{ border: '1px dashed black', padding: '20px', textAlign: 'center' }}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Suelta los archivos aquí...</p>
      ) : (
        <p>Arrastra y suelta algunos archivos aquí, o haz clic para seleccionar archivos</p>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
        {files.map(file => (
          <div key={file.path || ''} style={{ display: 'inline-block', position: 'relative', margin: '5px' }}>
            {file.preview ? (
              <div>
                <img src={file.preview} className='h-20 w-20 object-cover rounded-sm' alt="Preview" />
                <span className='text-black'>{truncateFileName(file.path || 'Sin nombre')}</span>
              </div>
            ) : (
              <span>{truncateFileName(file.path || 'Sin nombre')}</span>
            )}
            <button onClick={removeFile(file)} style={{ position: 'absolute', top: 23, right: 0 }} >
              <Icon path={mdiDeleteCircle} size={1} color={'red'} className='hover:opacity-50'/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropzone;












