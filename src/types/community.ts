export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
  bio?: string;
  businessType?: string;
  website?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  reputation?: number;
  badges?: string[];
  role?: 'user' | 'moderator' | 'admin';
  isVerified?: boolean;
}

export interface Reaction {
  emoji: string;
  count: number;
  users: string[];
}

export interface Post {
  id: string;
  authorId: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt?: Date;
  reactions: { [key: string]: Reaction };
  commentCount: number;
  isHtml?: boolean;
  bookmarkedBy: string[];
  views: number;
  score?: number; // For trending calculation
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt?: Date;
  parentId: string | null;
  postId: string;
  likes: number;
  likedBy: string[];
  replies?: Comment[];
}

export interface Notification {
  id: string;
  userId: string;
  type: 'comment' | 'reaction' | 'mention' | 'follow';
  read: boolean;
  createdAt: Date;
  data: {
    postId?: string;
    commentId?: string;
    fromUserId: string;
  };
}

export interface Bookmark {
  userId: string;
  postId: string;
  createdAt: Date;
  tags?: string[];
  notes?: string;
} 