import React from 'react';
import { ChevronRight, MessageSquare, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Group } from '@/app_types';

interface GroupCardProps {
  group: Group;
  onOpen: () => void;
}

const GroupCard: React.FC<GroupCardProps> = ({ group, onOpen }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-foreground">
          {group.name}
        </CardTitle>
        <CardDescription>
          {group.members.length} member{group.members.length !== 1 ? 's' : ''}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Members:</p>
          <p className="text-sm text-foreground/80 truncate">
            {group.members.join(', ')}
          </p>
        </div>

        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <MessageSquare size={16} />
            {group.messages.length} messages
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users size={16} />
            {group.movies.length} movies
          </div>
        </div>

        <Button onClick={onOpen} className="w-full">
          Open Group
          <ChevronRight className="ml-2" size={16} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default GroupCard;