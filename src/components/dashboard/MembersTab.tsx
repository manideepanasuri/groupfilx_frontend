import React, { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { userAuthStore } from '@/store/userAuthStore';
import { toast } from 'sonner'; 

interface Member {
  id: number;
  email: string;
  name: string;
}

interface Group {
  id: number;
  name: string;
  admin: {
    id: number;
    email: string;
    name: string;
  };
  members: Member[];
  created_at: string;
}

const MembersTab: React.FC<{ groupId: number }> = ({ groupId }) => {
  const [group, setGroup] = useState<Group | null>(null);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { tokens, email } = userAuthStore();
  const currentUser = email;

  // Fetch the group details
  const fetchGroup = async () => {
    try {
      const url = import.meta.env.VITE_BACKEND_HOST + 'groupchat/create/';
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      });

      if (!res.ok) throw new Error('Failed to fetch groups');

      const data: Group[] = await res.json();
      const matched = data.find((g) => g.id === groupId);
      if (!matched) throw new Error('Group not found');
      setGroup(matched);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch group';
      toast.error(msg);
    }
  };

  useEffect(() => {
    fetchGroup();
  }, [groupId]);

  const onAddMember = async () => {
    if (!newMemberEmail.trim()) {
      toast.error('Please enter a member email');
      return;
    }

    setLoading(true);

    try {
      const url = import.meta.env.VITE_BACKEND_HOST + 'groupchat/addmember/';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.access}`,
        },
        body: JSON.stringify({
          group_id: groupId,
          email: newMemberEmail,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to add member');
      }

      toast.success(`Member ${newMemberEmail} added successfully ✅`);
      setNewMemberEmail('');
      await fetchGroup(); // 🔄 Refresh members after adding
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to add member';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const onDeleteMember = async (email: string) => {
    setLoading(true);

    try {
      const url = import.meta.env.VITE_BACKEND_HOST + 'groupchat/remove/';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.access}`,
        },
        body: JSON.stringify({
          group_id: groupId,
          user_email: email,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to remove member');
      }

      toast.success(`Removed ${email} successfully 🗑️`);
      await fetchGroup(); // 🔄 Refresh members after removing
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to remove member';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!group) {
    return <div className="text-muted-foreground">Loading group details...</div>;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Add a Member</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Member email"
              value={newMemberEmail}
              onChange={(e) => setNewMemberEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !loading && onAddMember()}
              disabled={loading}
            />
            <Button onClick={onAddMember} disabled={loading || (currentUser != group.admin.email)}>
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
              key={member.email}
              className="bg-secondary p-4 rounded-lg flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-foreground">
                  {member.name} ({member.email})
                </p>
              </div>
              {currentUser === group.admin.email && member.email !== currentUser && (
                <Button
                  onClick={() => onDeleteMember(member.email)}
                  size="sm"
                  variant="destructive"
                  disabled={loading}
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
