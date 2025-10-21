import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Group } from '@/app_types';
import Dashboard from '@/components/dashboard/Dashboard';
import GroupDetail from '@/components/dashboard/GroupDetail';
import { userAuthStore } from '@/store/userAuthStore';
import Loader from '@/components/Loader';
import { motion, AnimatePresence } from 'framer-motion';

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
  const { tokens } = userAuthStore();
  const [signal, setSignal] = useState<boolean>(false);

  // Fetch all groups
  useEffect(() => {
    setCurrentGroup(null);
    fetchGroups();
  }, [signal]);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      setError(null);
      const url = import.meta.env.VITE_BACKEND_HOST + 'groupchat/create/';
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
      const url = import.meta.env.VITE_BACKEND_HOST + 'groupchat/create/';
      const config = {
        url: url,
        method: 'post',
        data: { name },
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

  const convertToGroupType = (apiGroup: APIGroup): Group => ({
    id: apiGroup.id,
    name: apiGroup.name,
    members: apiGroup.members.map((m) => m.name),
    messages: [],
    movies: [],
  });

  // Framer Motion variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnimatePresence>
        {loading && groups.length === 0 && (
          <motion.div
            key="loader"
            className="flex items-center justify-center h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.div
            key="error"
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 mx-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!currentGroup && !loading && (
          <motion.div
            key="dashboard"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Dashboard
              groups={groups.map(convertToGroupType)}
              onCreateGroup={handleCreateGroup}
              onOpenGroup={handleOpenGroup}
            />
          </motion.div>
        )}

        {currentGroup && group && !loading && (
          <motion.div
            key="groupDetail"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <GroupDetail
              group={convertToGroupType(group)}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onBackToDashboard={() => setCurrentGroup(null)}
              setSignal={setSignal}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Groups;
