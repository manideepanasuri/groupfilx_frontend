import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Group } from '@/app_types';
import Dashboard from '@/components/dashboard/Dashboard';
import GroupDetail from '@/components/dashboard/GroupDetail';
import { userAuthStore } from '@/store/userAuthStore';

interface GroupMember {
  id: number;
  email: string;
  name: string;
}

interface APIGroup {
  id: number;
  name: string;
  admin: GroupMember;
  members: GroupMember[];
  created_at: string;
}

const Groups: React.FC = () => {
  const [groups, setGroups] = useState<APIGroup[]>([]);
  const [currentGroup, setCurrentGroup] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('chat');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {tokens} = userAuthStore();
  const [signal, setSignal] = useState<boolean>(false);
  
  const backendUrl = import.meta.env.VITE_BACKEND_HOST || 'http://127.0.0.1:8000/';
  

  // Fetch all groups
  useEffect(() => {
    console.log("hello fetching..........");
    setCurrentGroup(null);
    fetchGroups();
  }, [signal]);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      setError(null);
      const url = backendUrl + 'groupchat/create/';
      const config = {
        method: 'get',
        url: url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens.access}`,
        },
      };
      const res = await axios(config);
      setGroups(res.data);
    } catch (err) {
      setError('Failed to fetch groups');
      console.error('Error fetching groups:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGroup = async (name: string): Promise<void> => {
    try {
      setError(null);
      const url = backendUrl + 'groupchat/create/';
      const config = {
        url: url,
        method: 'post',
        data: {
          name: name,
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens.access}`,
        },
      };
      const res = await axios(config);
      const newGroup: APIGroup = res.data;
      setGroups([...groups, newGroup]);
      setCurrentGroup(newGroup.id);
    } catch (err) {
      setError('Failed to create group');
      console.error('Error creating group:', err);
    }
  };

  const handleOpenGroup = (groupId: number): void => {
    setCurrentGroup(groupId);
    setActiveTab('chat');
  };


  const group = groups.find((g) => g.id === currentGroup);

  // Convert APIGroup to Group type for compatibility
  const convertToGroupType = (apiGroup: APIGroup): Group => {
    return {
      id: apiGroup.id,
      name: apiGroup.name,
      members: apiGroup.members.map(m => m.name),
      messages: [],
      movies: [],
    };
  };

  if (loading && groups.length === 0) {
    return <div className="p-8 text-center">Loading groups...</div>;
  }

  return (
    <>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {!currentGroup ? (
        <Dashboard
          groups={groups.map(convertToGroupType)}
          onCreateGroup={handleCreateGroup}
          onOpenGroup={handleOpenGroup}
        />
      ) : group ? (
        <GroupDetail
          group={convertToGroupType(group)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onBackToDashboard={() => setCurrentGroup(null)}
          setSignal={setSignal}
        />
      ) : null}
    </>
  );
};

export default Groups;