import React, { useState } from 'react';
import { Group } from '@/app_types';
import Dashboard from '@/components/dashboard/Dashboard';
import GroupDetail from '@/components/dashboard/GroupDetail';

const Groups: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [currentGroup, setCurrentGroup] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('chat');
  const [chatMessage, setChatMessage] = useState<string>('');
  const [movieTitle, setMovieTitle] = useState<string>('');
  const [newMemberName, setNewMemberName] = useState<string>('');
  const currentUser: string = 'You';

  const handleCreateGroup = (name: string): void => {
    const group: Group = {
      id: Date.now(),
      name,
      members: [currentUser],
      messages: [],
      movies: [],
    };
    setGroups([...groups, group]);
    setCurrentGroup(group.id);
  };

  const handleOpenGroup = (groupId: number): void => {
    setCurrentGroup(groupId);
    setActiveTab('chat');
  };

  const handleSendMessage = (): void => {
    if (chatMessage.trim() && currentGroup) {
      setGroups(
        groups.map((g) =>
          g.id === currentGroup
            ? {
                ...g,
                messages: [
                  ...g.messages,
                  {
                    author: currentUser,
                    text: chatMessage,
                    id: Date.now(),
                  },
                ],
              }
            : g
        )
      );
      setChatMessage('');
    }
  };

  const handleAddMovie = (): void => {
    if (movieTitle.trim() && currentGroup) {
      setGroups(
        groups.map((g) =>
          g.id === currentGroup
            ? {
                ...g,
                movies: [
                  ...g.movies,
                  { id: Date.now(), title: movieTitle, votes: [] },
                ],
              }
            : g
        )
      );
      setMovieTitle('');
    }
  };

  const handleVoteMovie = (movieId: number): void => {
    if (currentGroup) {
      setGroups(
        groups.map((g) =>
          g.id === currentGroup
            ? {
                ...g,
                movies: g.movies.map((m) =>
                  m.id === movieId
                    ? {
                        ...m,
                        votes: m.votes.includes(currentUser)
                          ? m.votes.filter((v) => v !== currentUser)
                          : [...m.votes, currentUser],
                      }
                    : m
                ),
              }
            : g
        )
      );
    }
  };

  const handleDeleteMovie = (movieId: number): void => {
    if (currentGroup) {
      setGroups(
        groups.map((g) =>
          g.id === currentGroup
            ? { ...g, movies: g.movies.filter((m) => m.id !== movieId) }
            : g
        )
      );
    }
  };

  const handleAddMember = (): void => {
    if (newMemberName.trim() && currentGroup) {
      setGroups(
        groups.map((g) =>
          g.id === currentGroup && !g.members.includes(newMemberName)
            ? { ...g, members: [...g.members, newMemberName] }
            : g
        )
      );
      setNewMemberName('');
    }
  };

  const handleDeleteMember = (member: string): void => {
    if (currentGroup && member !== currentUser) {
      setGroups(
        groups.map((g) =>
          g.id === currentGroup
            ? { ...g, members: g.members.filter((m) => m !== member) }
            : g
        )
      );
    }
  };

  const handleLeaveGroup = (): void => {
    if (currentGroup) {
      setGroups(
        groups.map((g) =>
          g.id === currentGroup
            ? { ...g, members: g.members.filter((m) => m !== currentUser) }
            : g
        )
      );
      setCurrentGroup(null);
    }
  };

  const group = groups.find((g) => g.id === currentGroup);

  return (
    <>
      {!currentGroup ? (
        <Dashboard
          groups={groups}
          onCreateGroup={handleCreateGroup}
          onOpenGroup={handleOpenGroup}
        />
      ) : group ? (
        <GroupDetail
          group={group}
          currentUser={currentUser}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          chatMessage={chatMessage}
          setChatMessage={setChatMessage}
          movieTitle={movieTitle}
          setMovieTitle={setMovieTitle}
          newMemberName={newMemberName}
          setNewMemberName={setNewMemberName}
          onBackToDashboard={() => setCurrentGroup(null)}
          onLeaveGroup={handleLeaveGroup}
          onSendMessage={handleSendMessage}
          onAddMovie={handleAddMovie}
          onVoteMovie={handleVoteMovie}
          onDeleteMovie={handleDeleteMovie}
          onAddMember={handleAddMember}
          onDeleteMember={handleDeleteMember}
        />
      ) : null}
    </>
  );
};

export default Groups;