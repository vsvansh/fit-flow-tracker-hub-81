
import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Camera, X } from "lucide-react";
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
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    if (initialImage !== image && initialImage) {
      setImage(initialImage);
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
        setImage(imageUrl);
        onImageChange?.(imageUrl);
        toast({
          title: "Profile photo updated",
          description: "Your profile photo has been updated successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage("");
    onImageChange?.("");
    toast({
      title: "Profile photo removed",
      description: "Your profile photo has been removed.",
    });
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
            src={image || "/placeholder.svg"} 
            alt="Profile" 
            className="object-cover"
          />
          <AvatarFallback className="text-2xl font-medium bg-brand-100 dark:bg-brand-900 text-brand-800 dark:text-brand-200">
            {/* Use first letter of user name - hardcoded for now */}
            U
          </AvatarFallback>
        </Avatar>
        
        {isHovering && image && (
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
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => document.getElementById("profile-photo")?.click()}
            className="flex items-center gap-2"
          >
            <Camera className="h-4 w-4" />
            {image ? "Change Photo" : "Upload Photo"}
          </Button>
          
          {image && (
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
