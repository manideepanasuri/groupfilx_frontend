import React from 'react';
import { ThumbsUp, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Group } from '@/app_types';

interface VotingTabProps {
  group: Group;
  currentUser: string;
  movieTitle: string;
  setMovieTitle: (title: string) => void;
  onAddMovie: () => void;
  onVoteMovie: (movieId: number) => void;
  onDeleteMovie: (movieId: number) => void;
}

const VotingTab: React.FC<VotingTabProps> = ({
  group,
  currentUser,
  movieTitle,
  setMovieTitle,
  onAddMovie,
  onVoteMovie,
  onDeleteMovie,
}) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Add a Movie</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Movie title"
              value={movieTitle}
              onChange={(e) => setMovieTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onAddMovie()}
            />
            <Button
              onClick={onAddMovie}
              variant="default"
            >
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Vote for Tonight's Movie</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {group.movies.length === 0 ? (
            <Alert>
              <AlertDescription className="text-muted-foreground">
                No movies added yet. Add one to get started!
              </AlertDescription>
            </Alert>
          ) : (
            group.movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-secondary p-4 rounded-lg flex items-center justify-between"
              >
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{movie.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {movie.votes.length} vote{movie.votes.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => onVoteMovie(movie.id)}
                    size="sm"
                    variant={
                      movie.votes.includes(currentUser)
                        ? 'default'
                        : 'outline'
                    }
                  >
                    <ThumbsUp size={16} className="mr-1" />
                    Vote
                  </Button>
                  <Button
                    onClick={() => onDeleteMovie(movie.id)}
                    size="sm"
                    variant="destructive"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VotingTab;