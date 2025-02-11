
import { Textarea } from "@/components/ui/textarea";

interface ProfileAboutProps {
  bio: string;
  isEditing: boolean;
  onProfileUpdate: (field: string, value: string) => void;
}

const ProfileAbout = ({ bio, isEditing, onProfileUpdate }: ProfileAboutProps) => {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-2">About</h2>
      {isEditing ? (
        <Textarea
          value={bio || ""}
          onChange={(e) => onProfileUpdate("bio", e.target.value)}
          placeholder="Write something about yourself..."
          className="min-h-[100px] w-full"
        />
      ) : (
        <p className="text-gray-600">{bio || "No bio added yet."}</p>
      )}
    </section>
  );
};

export default ProfileAbout;
