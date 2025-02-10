
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <Card className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 rounded-full bg-social-primary text-white flex items-center justify-center text-3xl">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user?.email?.split("@")[0]}</h1>
                <p className="text-gray-500">Digital Business Card</p>
              </div>
            </div>
            <div className="space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-semibold mb-2">About</h2>
              <p className="text-gray-600">No bio added yet.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
              <div className="text-gray-600">
                <p>Email: {user?.email}</p>
              </div>
            </section>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;
