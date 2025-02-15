import { Plus, QrCode, MessageSquare, Users } from "lucide-react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";

const QuickActionCard = ({
  icon: Icon,
  title,
  description,
  href,
}: {
  icon: any;
  title: string;
  description: string;
  href: string;
}) => (
  <Card className="p-6 hover:shadow-lg transition-shadow animate-fade-in">
    <a href={href} className="flex flex-col space-y-4">
      <div className="w-12 h-12 rounded-lg bg-social-primary/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-social-primary" />
      </div>
      <div>
        <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
    </a>
  </Card>
);

const Section = ({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: { label: string; href: string };
}) => (
  <section className="mb-8">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      {action && (
        <a href={action.href} className="text-social-primary hover:underline text-sm">
          {action.label}
        </a>
      )}
    </div>
    {children}
  </section>
);

const Index = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold metallic-title mb-2">Welcome back!</h1>
          <p className="text-gray-600">Here's what's happening in your network</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <QuickActionCard
            icon={Plus}
            title="Create Event"
            description="Schedule a new event"
            href="/events/new"
          />
          <QuickActionCard
            icon={QrCode}
            title="View Profile"
            description="Check your digital card"
            href="/profile"
          />
          <QuickActionCard
            icon={MessageSquare}
            title="Messages"
            description="View your conversations"
            href="/messages"
          />
          <QuickActionCard
            icon={Users}
            title="Network"
            description="Grow your connections"
            href="/network"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Section title="Upcoming Events" action={{ label: "View all", href: "/events" }}>
              <Card className="p-6">
                <p className="text-gray-500">No upcoming events</p>
              </Card>
            </Section>
          </div>

          <div className="space-y-8">
            <Section title="Pending Requests">
              <Card className="p-6">
                <p className="text-gray-500">No pending requests</p>
              </Card>
            </Section>

            <Section title="Recent Messages" action={{ label: "View all", href: "/messages" }}>
              <Card className="p-6">
                <p className="text-gray-500">No recent messages</p>
              </Card>
            </Section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
