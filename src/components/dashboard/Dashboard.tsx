import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Group } from '@/app_types';
import GroupCard from './GroupCard';

interface DashboardProps {
  groups: Group[];
  onCreateGroup: (name: string) => void;
  onOpenGroup: (groupId: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  groups,
  onCreateGroup,
  onOpenGroup,
}) => {
  const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false);
  const [newGroupName, setNewGroupName] = useState<string>('');

  const handleCreate = (): void => {
    if (newGroupName.trim()) {
      onCreateGroup(newGroupName);
      setNewGroupName('');
      setCreateDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-2">Group Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Create and manage groups for movie nights
          </p>
        </div>

        {/* Create Group Button */}
        <div className="mb-10">
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg">
                <Plus className="mr-2" size={20} /> Create New Group
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a New Group</DialogTitle>
                <DialogDescription>
                  Give your group a name to get started.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Group name"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
                />
                <Button
                  onClick={handleCreate}
                  className="w-full"
                >
                  Create Group
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Groups Grid */}
        {groups.length === 0 ? (
          <Card>
            <CardContent className="pt-12 text-center pb-12">
              <p className="text-muted-foreground text-lg">
                No groups yet. Create one to get started!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((g) => (
              <GroupCard
                key={g.id}
                group={g}
                onOpen={() => onOpenGroup(g.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;