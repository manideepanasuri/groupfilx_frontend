import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ThumbsUp, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Group } from '@/app_types';
import { userAuthStore } from '@/store/userAuthStore';
import { useGroupSocket } from '@/store/groupSocketStore';
import { useInitGroupSocket } from '@/store/useGroupSocket';

interface Movie { id: number; title: string; poster_path: string; backdrop_path: string; }
interface Vote { id: number, email: string, name: string }
interface PollOption { id: number; movie: Movie; votes_count: number; votes: Vote[] }
interface Poll { id: number; title: string; created_by: number; created_by_name: string; created_at: string; is_active: boolean; options: PollOption[]; total_votes: number; }


interface VotingTabProps {
  group: Group;
}

const VotingTab: React.FC<VotingTabProps> = ({ group }) => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userVotes, setUserVotes] = useState<{ [pollId: number]: number }>({});
  const [pollTitle, setPollTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const { tokens, email } = userAuthStore();
  const ws = useGroupSocket((state) => state.sockets[group.id]);
  useInitGroupSocket(group.id, tokens.access);

  useEffect(() => {
    if (!ws) return;
    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    ws.onerror = () => setError('Failed to connect to polls');

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === 'init') {
          setPolls(data.active_polls);

          const votesMap: { [pollId: number]: number } = {};
          data.active_polls.forEach((poll: Poll) => {
            poll.options.forEach((opt) => {
              if (opt.votes.some((v: any) => v.email === email)) {
                votesMap[poll.id] = opt.id;
              }
            });
          });
          setUserVotes(votesMap);
        } else if (data.type === 'poll_create') {
          setPolls((prev) => [...prev, data.poll]);
          const votesMap: { [pollId: number]: number } = { ...userVotes };
          data.poll.options.forEach((opt: any) => {
            if (opt.votes.some((v: any) => v.email === email)) {
              votesMap[data.poll.id] = opt.id;
            }
          });
          setUserVotes(votesMap);
        } else if (data.type === 'poll_closed') {
          setPolls((prev) =>
            prev.map((poll) =>
              poll.id === data.poll_id ? { ...poll, is_active: false } : poll
            )
          );
        } else if (data.type === 'poll_update') {
          setPolls((prev) =>
            prev.map((poll) =>
              poll.id === data.poll.id ? { ...poll, options: data.poll.options, total_votes: data.poll.total_votes } : poll
            )
          );
          const votesMap: { [pollId: number]: number } = { ...userVotes };
          data.poll.options.forEach((opt: any) => {
            if (opt.votes.some((v: any) => v.email === email)) {
              votesMap[data.poll.id] = opt.id;
            }
          });
          setUserVotes(votesMap);
        }
      } catch (err) {
        console.error('Error parsing message:', err);
      }
    };
  }, [ws]);

  const handleCreatePoll = async () => {
    if (!pollTitle.trim() || !ws || !connected) return;
    setError(null);
    setLoading(true);

    try {
      const url = import.meta.env.VITE_BACKEND_HOST + 'movies/grouprecomendations/';
      const config = {
        url: url,
        method: 'post',
        data: {
          group_id: group.id,
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens.access}`,
        },
      }

      const res = await axios(config);

      const data = res.data;
      console.log(data);
      if (!Array.isArray(data) || data.length === 0) {
        setError('No recommendations found for this group.');
        setLoading(false);
        return;
      }
      console.log(data);
      const movieIds = data.map((m) => m.id).filter((id) => typeof id === 'number');
      if (movieIds.length === 0) {
        setError('No valid movie IDs found in recommendations.');
        setLoading(false);
        return;
      }

      console.log(movieIds);
      ws.send(JSON.stringify({ type: 'poll_create', poll_title: pollTitle, movie_ids: movieIds }));
      setPollTitle('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch group recommendations.');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = (pollId: number, movieId: number) => {
    if (!ws || !connected) return;
    ws.send(JSON.stringify({ type: 'poll_vote', poll_id: pollId, movie_id: movieId }));
  };

  const handleClosePoll = (pollId: number) => {
    if (!ws || !connected) return;
    ws.send(JSON.stringify({ type: 'poll_close', poll_id: pollId }));
  };

  const activePollsOnly = polls.filter((poll) => poll.is_active);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-foreground flex items-center justify-between">
            Create a Poll
            <span className={`h-3 w-3 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {error && (
            <Alert className="bg-red-100 border-red-300">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}
          <Input
            placeholder="Poll Title"
            value={pollTitle}
            onChange={(e) => setPollTitle(e.target.value)}
            disabled={!connected || loading}
          />
          <Button
            onClick={handleCreatePoll}
            disabled={!connected || !pollTitle.trim() || loading}
            className="w-full"
          >
            {loading ? 'Creating...' : (<><Plus size={16} className="mr-2" /> Create Poll</>)}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-foreground">Active Polls</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {activePollsOnly.length === 0 ? (
            <Alert>
              <AlertDescription className="text-muted-foreground">No active polls yet.</AlertDescription>
            </Alert>
          ) : (
            activePollsOnly.map((poll) => (
              <div key={poll.id} className="bg-secondary p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-foreground">{poll.title}</p>
                    <p className="text-xs text-muted-foreground">Created by {poll.created_by_name}</p>
                  </div>
                  <Button onClick={() => handleClosePoll(poll.id)} size="sm" variant="outline" disabled={!connected}>
                    Close
                  </Button>
                </div>
                <div className="space-y-3">
                  {poll.options.map((option) => (
                    <div key={option.id} className="bg-background p-3 rounded border border-border">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{option.movie.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {option.votes_count} vote{option.votes_count !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      <div className="bg-secondary rounded h-2 mb-2">
                        <div
                          className="bg-primary h-2 rounded transition-all"
                          style={{
                            width: `${poll.total_votes > 0 ? (option.votes_count / poll.total_votes) * 100 : 0}%`
                          }}
                        />
                      </div>
                      <Button
                        onClick={() => handleVote(poll.id, option.movie.id)}
                        size="sm"
                        variant={userVotes[poll.id] === option.id ? 'default' : 'outline'}
                        disabled={!connected}
                        className="w-full"
                      >
                        <ThumbsUp size={14} className="mr-1" />{' '}
                        {userVotes[poll.id] === option.id ? 'Voted' : 'Vote'}
                      </Button>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Total votes: {poll.total_votes}
                </p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VotingTab;
