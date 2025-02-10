
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Messages = () => {
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
            <h1 className="text-2xl font-bold">Messages</h1>
            <p className="text-gray-600">Connect with your network</p>
          </div>
          <Button>
            <MessageSquare className="w-4 h-4 mr-2" />
            New Message
          </Button>
        </div>

        <Card className="mb-6 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              className="pl-10"
              type="search"
              placeholder="Search messages..."
            />
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-center py-8">
            <MessageSquare className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-lg font-semibold mb-2">No messages yet</h2>
            <p className="text-gray-500">Start a conversation with someone in your network</p>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Messages;
