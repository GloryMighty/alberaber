
import { Twitter, Instagram, MessageSquare, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ProfileSocialLinksProps {
  profileData: {
    twitter_username?: string;
    instagram_username?: string;
    telegram_username?: string;
    phone_number?: string;
    whatsapp_number?: string;
    snapchat_username?: string;
  };
  isEditing: boolean;
  onProfileUpdate: (field: string, value: string) => void;
}

const ProfileSocialLinks = ({ profileData, isEditing, onProfileUpdate }: ProfileSocialLinksProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Twitter className="w-5 h-5 text-social-primary flex-shrink-0" />
          {isEditing ? (
            <Input
              value={profileData.twitter_username || ""}
              onChange={(e) => onProfileUpdate("twitter_username", e.target.value)}
              placeholder="Twitter Username"
            />
          ) : (
            <span className="text-gray-600">
              {profileData.twitter_username || "Not added"}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Instagram className="w-5 h-5 text-social-primary flex-shrink-0" />
          {isEditing ? (
            <Input
              value={profileData.instagram_username || ""}
              onChange={(e) => onProfileUpdate("instagram_username", e.target.value)}
              placeholder="Instagram Username"
            />
          ) : (
            <span className="text-gray-600">
              {profileData.instagram_username || "Not added"}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-social-primary flex-shrink-0" />
          {isEditing ? (
            <Input
              value={profileData.telegram_username || ""}
              onChange={(e) => onProfileUpdate("telegram_username", e.target.value)}
              placeholder="Telegram Username"
            />
          ) : (
            <span className="text-gray-600">
              {profileData.telegram_username || "Not added"}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Phone className="w-5 h-5 text-social-primary flex-shrink-0" />
          {isEditing ? (
            <Input
              value={profileData.phone_number || ""}
              onChange={(e) => onProfileUpdate("phone_number", e.target.value)}
              placeholder="Phone Number"
            />
          ) : (
            <span className="text-gray-600">
              {profileData.phone_number || "Not added"}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-social-primary flex-shrink-0" />
          {isEditing ? (
            <Input
              value={profileData.whatsapp_number || ""}
              onChange={(e) => onProfileUpdate("whatsapp_number", e.target.value)}
              placeholder="WhatsApp Number"
            />
          ) : (
            <span className="text-gray-600">
              {profileData.whatsapp_number || "Not added"}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-social-primary flex-shrink-0" />
          {isEditing ? (
            <Input
              value={profileData.snapchat_username || ""}
              onChange={(e) => onProfileUpdate("snapchat_username", e.target.value)}
              placeholder="Snapchat Username"
            />
          ) : (
            <span className="text-gray-600">
              {profileData.snapchat_username || "Not added"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSocialLinks;
