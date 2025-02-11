
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ProfileAvatar from "@/components/profile/ProfileAvatar";
import ProfileSocialLinks from "@/components/profile/ProfileSocialLinks";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    full_name: "",
    bio: "",
    twitter_username: "",
    instagram_username: "",
    whatsapp_number: "",
    telegram_username: "",
    snapchat_username: "",
    phone_number: "",
    avatar_url: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchProfile();
  }, [user, navigate]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) {
        // If no profile exists, create one
        if (error.code === 'PGRST116') {
          const { error: insertError } = await supabase
            .from("profiles")
            .insert({ id: user?.id })
            .single();

          if (insertError) throw insertError;
          
          // Fetch the newly created profile
          const { data: newProfile, error: fetchError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user?.id)
            .single();

          if (fetchError) throw fetchError;
          if (newProfile) setProfileData(newProfile);
        } else {
          throw error;
        }
      }
      if (data) {
        setProfileData(data);
      }
    } catch (error: any) {
      console.error("Error fetching profile:", error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load profile data",
      });
    }
  };

  const handleProfileUpdate = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user?.id,
          ...profileData,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      setIsEditing(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4">
        <Card className="p-4 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-6">
            <div className="flex flex-col md:flex-row items-center md:space-x-6 space-y-4 md:space-y-0">
              <ProfileAvatar 
                avatarUrl={profileData.avatar_url}
                isEditing={isEditing}
                onAvatarUpdate={(url) => handleProfileUpdate("avatar_url", url)}
              />
              <div>
                {isEditing ? (
                  <Input
                    value={profileData.full_name}
                    onChange={(e) => handleProfileUpdate("full_name", e.target.value)}
                    placeholder="Full Name"
                    className="mb-2 max-w-[300px]"
                  />
                ) : (
                  <h1 className="text-xl md:text-2xl font-bold text-center md:text-left">
                    {profileData.full_name || user?.email?.split("@")[0]}
                  </h1>
                )}
                <p className="text-gray-500 text-center md:text-left">Digital Business Card</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button 
                size="sm" 
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                disabled={loading}
                className="w-full sm:w-auto"
              >
                <Edit className="w-4 h-4 mr-2" />
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-semibold mb-2">About</h2>
              {isEditing ? (
                <Textarea
                  value={profileData.bio || ""}
                  onChange={(e) => handleProfileUpdate("bio", e.target.value)}
                  placeholder="Write something about yourself..."
                  className="min-h-[100px] w-full"
                />
              ) : (
                <p className="text-gray-600">{profileData.bio || "No bio added yet."}</p>
              )}
            </section>

            <section className="grid grid-cols-1 gap-6">
              <h2 className="text-lg font-semibold mb-2">Contact & Social Media</h2>
              <ProfileSocialLinks
                profileData={profileData}
                isEditing={isEditing}
                onProfileUpdate={handleProfileUpdate}
              />
            </section>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;
