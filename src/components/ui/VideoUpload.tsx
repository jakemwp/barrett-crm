import React, { useRef, useState } from 'react';
import { 
  Video, 
  Smartphone, 
  FolderOpen, 
  X, 
  Eye, 
  Trash2,
  AlertCircle,
  CheckCircle,
  Loader2,
  Play
} from 'lucide-react';
import { Button } from './Button';
import { cn } from '../../lib/utils';

interface VideoUploadProps {
  title: string;
  description?: string;
  onVideoChange?: (url: string | null) => void;
  initialVideo?: string;
  disabled?: boolean;
  className?: string;
  maxSize?: number; // in MB
}

export function VideoUpload({
  title,
  description,
  onVideoChange,
  initialVideo,
  disabled = false,
  className,
  maxSize = 100 // 100MB default
}: VideoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [video, setVideo] = useState<{ url: string; file?: File } | null>(
    initialVideo ? { url: initialVideo } : null
  );
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    const acceptedTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/quicktime'];
    
    if (!acceptedTypes.includes(file.type)) {
      return `File type ${file.type} is not supported. Please use MP4, MOV, or AVI.`;
    }

    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB.`;
    }

    return null;
  };

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const validationError = validateFile(file);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // Create local URL for immediate preview
      const url = URL.createObjectURL(file);
      
      // Clean up previous video URL if it exists
      if (video?.url && video.file) {
        URL.revokeObjectURL(video.url);
      }

      const newVideo = { url, file };
      setVideo(newVideo);
      
      if (onVideoChange) {
        onVideoChange(url);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveVideo = () => {
    if (video?.url && video.file) {
      URL.revokeObjectURL(video.url);
    }
    setVideo(null);
    setError(null);
    
    if (onVideoChange) {
      onVideoChange(null);
    }
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
        {video && (
          <span className="text-xs text-gray-500">
            {video.file ? formatFileSize(video.file.size) : 'Video uploaded'}
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
        accept="video/*"
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />

      {/* Upload Area or Video Display */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 transition-colors hover:border-gray-400">
        {!video ? (
          !disabled ? (
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
                    <Video className="h-12 w-12 text-gray-400" />
                  )}
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">
                    {isUploading ? 'Uploading Video...' : 'Add Walk Around Video'}
                  </h5>
                  <p className="text-xs text-gray-500 mb-4">
                    Record or select a video showing the vehicle's exterior condition
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
                      <Video className="mr-2 h-4 w-4" />
                      Record Video
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
                  Supported: MP4, MOV, AVI (max {maxSize}MB)
                </p>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center">
              <Video className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Video upload disabled</p>
            </div>
          )
        ) : (
          /* Video Display */
          <div className="relative group">
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <video 
                src={video.url}
                className="w-full h-full object-cover"
                controls={false}
                muted
                poster="" // You could add a poster frame here
              />
              
              {/* Video Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-3 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 rounded-full"
                    onClick={() => setPreviewVideo(video.url)}
                  >
                    <Play className="h-5 w-5" />
                  </Button>
                  
                  {!disabled && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-3 bg-red-100 bg-opacity-90 hover:bg-opacity-100 text-red-600 rounded-full"
                      onClick={handleRemoveVideo}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Upload Status Indicator */}
            {video.file && (
              <div className="absolute top-3 right-3">
                <div className="bg-green-100 text-green-600 rounded-full p-1.5">
                  <CheckCircle className="h-4 w-4" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Video Preview Modal */}
      {previewVideo && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full w-full">
            <video 
              src={previewVideo} 
              className="w-full h-auto max-h-full object-contain rounded-lg"
              controls
              autoPlay
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 rounded-full p-2"
              onClick={() => setPreviewVideo(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}