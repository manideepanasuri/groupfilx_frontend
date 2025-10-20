export interface Message {
  id: number;
  author: string;
  text: string;
}

export interface Movie {
  id: number;
  title: string;
  votes: string[];
}

export interface Group {
  id: number;
  name: string;
  members: string[];
  messages: Message[];
  movies: Movie[];
}
