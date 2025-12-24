
export interface DiscussionTopic {
  id: number;
  author: string;
  avatar: string;
  title: string;
  content: string;
  replies: Reply[];
  timestamp: string;
}

export interface Reply {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
}

export type AppView = 'home' | 'forum' | 'research' | 'integrity';
