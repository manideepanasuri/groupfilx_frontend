import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Group } from '@/app_types';

interface MembersTabProps {
  group: Group;
  currentUser: string;
  newMemberName: string;
  setNewMemberName: (name: string) => void;
  onAddMember: () => void;
  onDeleteMember: (member: string) => void;
}

const MembersTab: React.FC<MembersTabProps> = ({
  group,
  currentUser,
  newMemberName,
  setNewMemberName,
  onAddMember,
  onDeleteMember,
}) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Add a Member</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Member name"
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onAddMember()}
            />
            <Button
              onClick={onAddMember}
            >
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Group Members</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {group.members.map((member) => (
            <div
              key={member}
              className="bg-secondary p-4 rounded-lg flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-foreground">
                  {member}
                  {member === currentUser && (
                    <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                      You
                    </span>
                  )}
                </p>
              </div>
              {member !== currentUser && (
                <Button
                  onClick={() => onDeleteMember(member)}
                  size="sm"
                  variant="destructive"
                >
                  <Trash2 size={16} />
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default MembersTab;