import { useState, useCallback } from 'react';

export interface PhotoUploadOptions {
  multiple?: boolean;
  maxSize?: number; // in MB
  acceptedTypes?: string[];
}

export interface UploadedPhoto {
  id: string;
  url: string;
  file: File;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
}

export function usePhotoUpload(options: PhotoUploadOptions = {}) {
  const {
    multiple = true,
    maxSize = 10, // 10MB default
    acceptedTypes = ['image/jpeg', 'image/png', 'image/heic', 'image/webp']
  } = options;

  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = useCallback((file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return `File type ${file.type} is not supported. Please use JPG, PNG, HEIC, or WebP.`;
    }

    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB.`;
    }

    return null;
  }, [acceptedTypes, maxSize]);

  const uploadPhotos = useCallback(async (files: FileList | File[]): Promise<UploadedPhoto[]> => {
    setIsUploading(true);
    setError(null);

    try {
      const fileArray = Array.from(files);
      const validFiles: File[] = [];
      
      // Validate all files first
      for (const file of fileArray) {
        const validationError = validateFile(file);
        if (validationError) {
          setError(validationError);
          setIsUploading(false);
          return [];
        }
        validFiles.push(file);
      }

      // If not multiple, only take the first file
      const filesToProcess = multiple ? validFiles : validFiles.slice(0, 1);

      // Create photo objects with local URLs for immediate preview
      const newPhotos: UploadedPhoto[] = filesToProcess.map(file => ({
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        url: URL.createObjectURL(file),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date()
      }));

      // In a real app, you would upload to your server/cloud storage here
      // For now, we'll simulate an upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update photos state
      if (multiple) {
        setPhotos(prev => [...prev, ...newPhotos]);
      } else {
        setPhotos(newPhotos);
      }

      setIsUploading(false);
      return newPhotos;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      setIsUploading(false);
      return [];
    }
  }, [multiple, validateFile]);

  const removePhoto = useCallback((photoId: string) => {
    setPhotos(prev => {
      const photoToRemove = prev.find(p => p.id === photoId);
      if (photoToRemove) {
        // Clean up object URL to prevent memory leaks
        URL.revokeObjectURL(photoToRemove.url);
      }
      return prev.filter(p => p.id !== photoId);
    });
  }, []);

  const clearPhotos = useCallback(() => {
    // Clean up all object URLs
    photos.forEach(photo => {
      URL.revokeObjectURL(photo.url);
    });
    setPhotos([]);
    setError(null);
  }, [photos]);

  const getPhotoUrls = useCallback(() => {
    return photos.map(photo => photo.url);
  }, [photos]);

  return {
    photos,
    isUploading,
    error,
    uploadPhotos,
    removePhoto,
    clearPhotos,
    getPhotoUrls
  };
}