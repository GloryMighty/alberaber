
import { Button } from "@/components/ui/button";
import { Edit, Share2 } from "lucide-react";

interface ProfileActionsProps {
  isEditing: boolean;
  onEditClick: () => void;
  loading: boolean;
}

const ProfileActions = ({ isEditing, onEditClick, loading }: ProfileActionsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
      <Button variant="outline" size="sm" className="w-full sm:w-auto">
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>
      <Button 
        size="sm" 
        onClick={onEditClick}
        disabled={loading}
        className="w-full sm:w-auto"
      >
        <Edit className="w-4 h-4 mr-2" />
        {isEditing ? "Save Changes" : "Edit Profile"}
      </Button>
    </div>
  );
};

export default ProfileActions;
