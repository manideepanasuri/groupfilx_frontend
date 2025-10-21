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
import { motion } from 'framer-motion';

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

  // Framer Motion variants
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.01 } }, // cards appear one by one
  };

  const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
};

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-2">
            Group Dashboard
          </h1>
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
                <Button onClick={handleCreate} className="w-full">
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
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {groups.map((g, idx) => (
              <motion.div
                key={g.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                custom={idx}
                viewport={{ once: true }}
              >
                <GroupCard group={g} onOpen={() => onOpenGroup(g.id)} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
