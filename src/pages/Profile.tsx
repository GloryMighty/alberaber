
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Share2, Twitter, Instagram, Phone, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

      if (error) throw error;
      if (data) {
        setProfileData(data);
      }
    } catch (error: any) {
      console.error("Error fetching profile:", error.message);
    }
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setLoading(true);
      const fileExt = file.name.split(".").pop();
      const filePath = `${user?.id}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("profile-photos")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("profile-photos")
        .getPublicUrl(filePath);

      await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", user?.id);

      setProfileData(prev => ({ ...prev, avatar_url: publicUrl }));
      toast({
        title: "Success",
        description: "Profile photo updated successfully",
      });
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

  const handleSave = async () => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("profiles")
        .update(profileData)
        .eq("id", user?.id);

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
              <div className="relative group">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-social-primary text-white flex items-center justify-center text-4xl">
                  {profileData.avatar_url ? (
                    <img
                      src={profileData.avatar_url}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    user?.email?.charAt(0).toUpperCase()
                  )}
                </div>
                {isEditing && (
                  <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <span className="text-white text-sm">Change Photo</span>
                  </label>
                )}
              </div>
              <div>
                {isEditing ? (
                  <Input
                    value={profileData.full_name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, full_name: e.target.value }))}
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
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Write something about yourself..."
                  className="min-h-[100px] w-full"
                />
              ) : (
                <p className="text-gray-600">{profileData.bio || "No bio added yet."}</p>
              )}
            </section>

            <section className="grid grid-cols-1 gap-6">
              <h2 className="text-lg font-semibold mb-2">Contact & Social Media</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Twitter className="w-5 h-5 text-social-primary flex-shrink-0" />
                    {isEditing ? (
                      <Input
                        value={profileData.twitter_username || ""}
                        onChange={(e) => setProfileData(prev => ({ ...prev, twitter_username: e.target.value }))}
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
                        onChange={(e) => setProfileData(prev => ({ ...prev, instagram_username: e.target.value }))}
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
                        onChange={(e) => setProfileData(prev => ({ ...prev, telegram_username: e.target.value }))}
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
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone_number: e.target.value }))}
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
                        onChange={(e) => setProfileData(prev => ({ ...prev, whatsapp_number: e.target.value }))}
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
                        onChange={(e) => setProfileData(prev => ({ ...prev, snapchat_username: e.target.value }))}
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
            </section>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;
