
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Network = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">My Network</h1>
            <p className="text-gray-600">Manage your professional connections</p>
          </div>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Add Connection
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Connections</h2>
              <Users className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-gray-500">No connections yet</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Pending Requests</h2>
              <UserPlus className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-gray-500">No pending requests</p>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Network;
