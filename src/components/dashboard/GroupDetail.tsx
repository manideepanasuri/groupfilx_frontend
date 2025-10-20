import React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Group } from '@/app_types';
import ChatTab from './ChatTab';
import VotingTab from './VotingTab';
import MembersTab from './MembersTab';

interface GroupDetailProps {
  group: Group;
  currentUser: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  chatMessage: string;
  setChatMessage: (message: string) => void;
  movieTitle: string;
  setMovieTitle: (title: string) => void;
  newMemberName: string;
  setNewMemberName: (name: string) => void;
  onBackToDashboard: () => void;
  onLeaveGroup: () => void;
  onSendMessage: () => void;
  onAddMovie: () => void;
  onVoteMovie: (movieId: number) => void;
  onDeleteMovie: (movieId: number) => void;
  onAddMember: () => void;
  onDeleteMember: (member: string) => void;
}

const GroupDetail: React.FC<GroupDetailProps> = ({
  group,
  currentUser,
  activeTab,
  setActiveTab,
  chatMessage,
  setChatMessage,
  movieTitle,
  setMovieTitle,
  newMemberName,
  setNewMemberName,
  onBackToDashboard,
  onLeaveGroup,
  onSendMessage,
  onAddMovie,
  onVoteMovie,
  onDeleteMovie,
  onAddMember,
  onDeleteMember,
}) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <Button
              variant="ghost"
              onClick={onBackToDashboard}
              className="mb-4"
            >
              ← Back to Dashboard
            </Button>
            <h1 className="text-4xl font-bold text-foreground mb-2">{group.name}</h1>
            <p className="text-muted-foreground">{group.members.join(', ')}</p>
          </div>
          <Button variant="destructive" onClick={onLeaveGroup}>
            <LogOut className="mr-2" size={16} /> Leave Group
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="voting">Movie Voting</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>

          {/* Chat Tab */}
          <TabsContent value="chat">
            <ChatTab
              group={group}
              currentUser={currentUser}
              chatMessage={chatMessage}
              setChatMessage={setChatMessage}
              onSendMessage={onSendMessage}
            />
          </TabsContent>

          {/* Voting Tab */}
          <TabsContent value="voting">
            <VotingTab
              group={group}
              currentUser={currentUser}
              movieTitle={movieTitle}
              setMovieTitle={setMovieTitle}
              onAddMovie={onAddMovie}
              onVoteMovie={onVoteMovie}
              onDeleteMovie={onDeleteMovie}
            />
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members">
            <MembersTab
              group={group}
              currentUser={currentUser}
              newMemberName={newMemberName}
              setNewMemberName={setNewMemberName}
              onAddMember={onAddMember}
              onDeleteMember={onDeleteMember}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GroupDetail;