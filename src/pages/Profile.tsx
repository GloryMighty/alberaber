
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ProfileSocialLinks from "@/components/profile/ProfileSocialLinks";
import ProfileAbout from "@/components/profile/ProfileAbout";
import ProfileActions from "@/components/profile/ProfileActions";
import ProfileHeader from "@/components/profile/ProfileHeader";

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
        if (error.code === 'PGRST116') {
          const { error: insertError } = await supabase
            .from("profiles")
            .insert({ id: user?.id })
            .single();

          if (insertError) throw insertError;
          
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
            <ProfileHeader
              fullName={profileData.full_name}
              avatarUrl={profileData.avatar_url}
              isEditing={isEditing}
              onProfileUpdate={handleProfileUpdate}
            />
            <ProfileActions
              isEditing={isEditing}
              onEditClick={() => isEditing ? handleSave() : setIsEditing(true)}
              loading={loading}
            />
          </div>

          <div className="space-y-6">
            <ProfileAbout
              bio={profileData.bio}
              isEditing={isEditing}
              onProfileUpdate={handleProfileUpdate}
            />

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
