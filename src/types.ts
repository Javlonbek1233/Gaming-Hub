export interface Game {
  id: string;
  title: string;
  genre: string;
  rating: number;
  price: number;
  releaseDate: string;
  coverUrl: string;
  description: string;
  tags: string[];
  specs: {
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
  };
  trailerUrl: string;
  popularity: number;
}

export interface StoreItem {
  id: string;
  title: string;
  category: 'hardware' | 'apparel' | 'membership' | 'games';
  price: number;
  originalPrice?: number;
  imageUrl: string;
  rating: number;
  isHot?: boolean;
  description: string;
}

export interface CartItem {
  item: StoreItem;
  quantity: number;
}

export interface Streamer {
  id: string;
  name: string;
  game: string;
  viewers: number;
  avatarUrl: string;
  isLive: boolean;
  streamTitle: string;
}

export interface ForumThread {
  id: string;
  title: string;
  author: string;
  replies: number;
  likes: number;
  category: string;
  timeAgo: string;
}

export interface Tournament {
  id: string;
  title: string;
  game: string;
  prizePool: string;
  date: string;
  teamsCount: number;
  maxTeams: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  status: 'open' | 'pending' | 'resolved';
  date: string;
  message: string;
}
