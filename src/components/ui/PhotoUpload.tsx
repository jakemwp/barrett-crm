import React, { useRef, useState } from 'react';
import { 
  Camera, 
  Upload, 
  Smartphone, 
  FolderOpen, 
  X, 
  Eye, 
  Trash2,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { Button } from './Button';
import { cn } from '../../lib/utils';

interface PhotoUploadProps {
  title: string;
  description?: string;
  onPhotosChange?: (urls: string[]) => void;
  initialPhotos?: string[];
  disabled?: boolean;
  className?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  acceptedTypes?: string[];
}

export function PhotoUpload({
  title,
  description,
  onPhotosChange,
  initialPhotos = [],
  disabled = false,
  className,
  multiple = true,
  maxSize = 10,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/heic', 'image/webp']
}: PhotoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<{ id: string; url: string; file?: File }[]>(
    initialPhotos.map((url, index) => ({
      id: `initial-${index}`,
      url,
      isInitial: true
    }))
  );
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return `File type ${file.type} is not supported. Please use JPG, PNG, HEIC, or WebP.`;
    }

    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB.`;
    }

    return null;
  };

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
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
          return;
        }
        validFiles.push(file);
      }

      // If not multiple, only take the first file
      const filesToProcess = multiple ? validFiles : validFiles.slice(0, 1);

      // Create photo objects with local URLs for immediate preview
      const newPhotos = filesToProcess.map(file => ({
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        url: URL.createObjectURL(file),
        file
      }));

      // Update photos state
      if (multiple) {
        setPhotos(prev => [...prev, ...newPhotos]);
      } else {
        // If not multiple, revoke previous object URLs to prevent memory leaks
        photos.forEach(photo => {
          if (photo.file) {
            URL.revokeObjectURL(photo.url);
          }
        });
        setPhotos(newPhotos);
      }

      // Notify parent component
      if (onPhotosChange) {
        const allPhotos = multiple 
          ? [...photos.filter(p => !p.file).map(p => p.url), ...newPhotos.map(p => p.url)]
          : newPhotos.map(p => p.url);
        onPhotosChange(allPhotos);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePhoto = (photoId: string) => {
    setPhotos(prev => {
      const photoToRemove = prev.find(p => p.id === photoId);
      if (photoToRemove?.file) {
        // Clean up object URL to prevent memory leaks
        URL.revokeObjectURL(photoToRemove.url);
      }
      
      const updatedPhotos = prev.filter(p => p.id !== photoId);
      
      // Notify parent component
      if (onPhotosChange) {
        onPhotosChange(updatedPhotos.map(p => p.url));
      }
      
      return updatedPhotos;
    });
  };

  const triggerFileInput = (captureMode?: 'environment' | 'user') => {
    if (fileInputRef.current) {
      // Set capture attribute for mobile camera
      if (captureMode) {
        fileInputRef.current.setAttribute('capture', captureMode);
      } else {
        fileInputRef.current.removeAttribute('capture');
      }
      fileInputRef.current.click();
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-700">{title}</h4>
        {photos.length > 0 && (
          <span className="text-xs text-gray-500">
            {photos.length} photo{photos.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>
      
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />

      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 transition-colors hover:border-gray-400">
        {!disabled ? (
          <div className="p-6">
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-800">{error}</span>
                </div>
              </div>
            )}

            {/* Upload Interface */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                {isUploading ? (
                  <Loader2 className="h-12 w-12 text-primary-600 animate-spin" />
                ) : (
                  <Camera className="h-12 w-12 text-gray-400" />
                )}
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">
                  {isUploading ? 'Uploading...' : `Add ${multiple ? 'Photos' : 'Photo'}`}
                </h5>
                <p className="text-xs text-gray-500 mb-4">
                  {multiple ? 'Select multiple photos' : 'Select a photo'} for this section
                </p>
              </div>
              
              {!isUploading && (
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center"
                    onClick={() => triggerFileInput('environment')}
                    disabled={disabled}
                  >
                    <Smartphone className="mr-2 h-4 w-4" />
                    Take Photo
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center"
                    onClick={() => triggerFileInput()}
                    disabled={disabled}
                  >
                    <FolderOpen className="mr-2 h-4 w-4" />
                    Choose from Device
                  </Button>
                </div>
              )}
              
              <p className="text-xs text-gray-400">
                Supported: JPG, PNG, HEIC, WebP (max {maxSize}MB)
              </p>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center">
            <Camera className="mx-auto h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">Photo upload disabled</p>
          </div>
        )}
      </div>

      {/* Photo Grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {photos.map((photo) => (
            <div key={photo.id} className="relative group">
              <div className="aspect-square bg-gray-200 rounded-lg border overflow-hidden">
                <img 
                  src={photo.url} 
                  alt={`${title} photo`}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to camera icon if image fails to load
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-full h-full flex items-center justify-center">
                  <Camera className="h-8 w-8 text-gray-400" />
                </div>
              </div>
              
              {/* Photo Actions */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 rounded-full"
                    onClick={() => setPreviewPhoto(photo.url)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  
                  {!disabled && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-2 bg-red-100 bg-opacity-90 hover:bg-opacity-100 text-red-600 rounded-full"
                      onClick={() => handleRemovePhoto(photo.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Upload Status Indicator */}
              {photo.file && (
                <div className="absolute top-2 right-2">
                  <div className="bg-green-100 text-green-600 rounded-full p-1">
                    <CheckCircle className="h-3 w-3" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Photo Preview Modal */}
      {previewPhoto && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <img 
              src={previewPhoto} 
              alt="Photo preview"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 rounded-full p-2"
              onClick={() => setPreviewPhoto(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}