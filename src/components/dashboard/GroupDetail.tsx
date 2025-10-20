import React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Group } from '@/app_types';
import ChatTab from './ChatTab';
import VotingTab from './VotingTab';
import MembersTab from './MembersTab';
import { userAuthStore } from '@/store/userAuthStore';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface GroupDetailProps {
  group: Group;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onBackToDashboard: () => void;
  setSignal: React.Dispatch<React.SetStateAction<boolean>>;
}

const GroupDetail: React.FC<GroupDetailProps> = ({
  group,
  activeTab,
  setActiveTab,
  onBackToDashboard,
  setSignal,
}) => {
  const { tokens } = userAuthStore();
  const navigate = useNavigate();

  const onLeaveGroup = async () => {
    try {
      const url = import.meta.env.VITE_BACKEND_HOST + 'groupchat/leave/';
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.access}`,
        },
        body: JSON.stringify({ group_id: group.id }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to leave group');
      }

      toast.success('Successfully left the group');
      setSignal((prev) => !prev);
      navigate('/groups');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to leave group');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto p-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <Button variant="ghost" onClick={onBackToDashboard} className="mb-4">
              ← Back to Dashboard
            </Button>
            <h1 className="text-4xl font-bold text-foreground mb-2">{group.name}</h1>
            <p className="text-muted-foreground">{group.members.join(', ')}</p>
          </div>
          <Button variant="destructive" onClick={onLeaveGroup}>
            <LogOut className="mr-2" size={16} /> Leave Group
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="voting">Movie Voting</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>

          <TabsContent value="chat">
            <ChatTab group={group} />
          </TabsContent>

          <TabsContent value="voting">
            <VotingTab group={group} />
          </TabsContent>

          <TabsContent value="members">
            <MembersTab groupId={group.id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GroupDetail;
