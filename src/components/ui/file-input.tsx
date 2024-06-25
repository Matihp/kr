import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import Icon from '@mdi/react';
import { mdiDeleteCircle } from '@mdi/js';
import { PencilIcon } from './icons';

// Extendemos FileWithPath para incluir la propiedad preview opcional
interface ExtendedFile extends FileWithPath {
  preview?: string;
}

const Dropzone: React.FC = () => {
  const [files, setFiles] = useState<ExtendedFile[]>([]);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    console.log('Archivos aceptados:', acceptedFiles); // Log para depurar los archivos aceptados

    const filesWithPreview = acceptedFiles.map(file => ({
      ...file,
      preview: file.type && file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    })) as ExtendedFile[];

    setFiles(prevFiles => [...prevFiles, ...filesWithPreview]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = (file: ExtendedFile) => () => {
    console.log('Eliminando archivo:', file); // Log para depurar el archivo a eliminar

    const newFiles = files.filter(f => f !== file);
    if (file.preview) {
      URL.revokeObjectURL(file.preview);
    }
    setFiles(newFiles);
  };

  useEffect(() => {
    // Revocar los object URLs para evitar fugas de memoria
    return () => {
      files.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  // Función para truncar el nombre del archivo a máximo 10 caracteres
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
          <div key={file.path} style={{ display: 'inline-block', position: 'relative', margin: '5px' }}>
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












