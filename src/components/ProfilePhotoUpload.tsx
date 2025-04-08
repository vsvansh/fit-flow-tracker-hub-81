
import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Camera, X, Save } from "lucide-react";
import { toast } from "./ui/use-toast";

interface ProfilePhotoUploadProps {
  initialImage?: string;
  onImageChange?: (imageUrl: string) => void;
  size?: "sm" | "md" | "lg" | "xl";
  showUploadButton?: boolean;
}

const ProfilePhotoUpload = ({
  initialImage = "",
  onImageChange,
  size = "lg",
  showUploadButton = true,
}: ProfilePhotoUploadProps) => {
  const [image, setImage] = useState<string>(initialImage);
  const [tempImage, setTempImage] = useState<string>(initialImage);
  const [isHovering, setIsHovering] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  
  useEffect(() => {
    if (initialImage !== image && initialImage) {
      setImage(initialImage);
      setTempImage(initialImage);
    }
  }, [initialImage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Image too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setTempImage(imageUrl);
        setHasChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveImage = () => {
    setImage(tempImage);
    onImageChange?.(tempImage);
    setHasChanges(false);
    toast({
      title: "Profile photo updated",
      description: "Your profile photo has been saved successfully.",
    });
  };

  const cancelChanges = () => {
    setTempImage(image);
    setHasChanges(false);
    toast({
      title: "Changes discarded",
      description: "Your profile photo changes have been discarded.",
    });
  };

  const removeImage = () => {
    setTempImage("");
    setHasChanges(true);
  };

  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-24 w-24",
    lg: "h-32 w-32", 
    xl: "h-40 w-40",
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div 
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Avatar className={`${sizeClasses[size]} border-2 border-gray-200 dark:border-gray-700`}>
          <AvatarImage 
            src={tempImage || "/placeholder.svg"} 
            alt="Profile" 
            className="object-cover"
          />
          <AvatarFallback className="text-2xl font-medium bg-brand-100 dark:bg-brand-900 text-brand-800 dark:text-brand-200">
            {/* Use first letter of user name - hardcoded for now */}
            U
          </AvatarFallback>
        </Avatar>
        
        {isHovering && tempImage && (
          <button
            onClick={removeImage}
            className="absolute top-0 right-0 bg-destructive text-destructive-foreground p-1 rounded-full shadow-md hover:bg-destructive/90 transition-colors"
            aria-label="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {showUploadButton && (
        <div className="flex items-center gap-2">
          <input
            type="file"
            id="profile-photo"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          
          {hasChanges ? (
            <>
              <Button 
                variant="default" 
                size="sm"
                onClick={saveImage}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                <Save className="h-4 w-4" />
                Save Photo
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={cancelChanges}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => document.getElementById("profile-photo")?.click()}
              className="flex items-center gap-2"
            >
              <Camera className="h-4 w-4" />
              {image ? "Change Photo" : "Upload Photo"}
            </Button>
          )}
          
          {image && !hasChanges && (
            <Button
              variant="ghost"
              size="sm"
              onClick={removeImage}
              className="text-destructive hover:text-destructive"
            >
              Remove
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoUpload;
