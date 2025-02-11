
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import ProfileAvatar from "./ProfileAvatar";

interface ProfileHeaderProps {
  fullName: string;
  avatarUrl: string;
  isEditing: boolean;
  onProfileUpdate: (field: string, value: string) => void;
}

const ProfileHeader = ({ fullName, avatarUrl, isEditing, onProfileUpdate }: ProfileHeaderProps) => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col md:flex-row items-center md:space-x-6 space-y-4 md:space-y-0">
      <ProfileAvatar 
        avatarUrl={avatarUrl}
        isEditing={isEditing}
        onAvatarUpdate={(url) => onProfileUpdate("avatar_url", url)}
      />
      <div>
        {isEditing ? (
          <Input
            value={fullName}
            onChange={(e) => onProfileUpdate("full_name", e.target.value)}
            placeholder="Full Name"
            className="mb-2 max-w-[300px]"
          />
        ) : (
          <h1 className="text-xl md:text-2xl font-bold text-center md:text-left">
            {fullName || user?.email?.split("@")[0]}
          </h1>
        )}
        <p className="text-gray-500 text-center md:text-left">Digital Business Card</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
