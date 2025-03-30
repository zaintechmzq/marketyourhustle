import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  increment,
  arrayUnion,
  arrayRemove,
  Timestamp,
  onSnapshot,
  setDoc,
  getDoc,
} from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import { Post, Comment, User, Notification, Bookmark, Reaction } from '../types/community';

export const usePosts = (category?: string) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let q = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc'),
      limit(20)
    );

    if (category) {
      q = query(
        collection(db, 'posts'),
        where('category', '==', category),
        orderBy('createdAt', 'desc'),
        limit(20)
      );
    }

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const postsData = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          updatedAt: doc.data().updatedAt.toDate(),
        })) as Post[];
        setPosts(postsData);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching posts:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [category]);

  const createPost = async (newPost: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'reactions' | 'commentCount' | 'bookmarkedBy' | 'views' | 'score'>) => {
    try {
      const now = Timestamp.now();
      await addDoc(collection(db, 'posts'), {
        ...newPost,
        createdAt: now,
        updatedAt: now,
        reactions: {},
        commentCount: 0,
        bookmarkedBy: [],
        views: 0,
        score: 0,
      });
    } catch (err) {
      console.error('Error creating post:', err);
      throw err;
    }
  };

  const likePost = async (postId: string) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');

      const postRef = doc(db, 'posts', postId);
      const postDoc = await getDoc(postRef);
      const post = postDoc.data() as Post;

      const reactions = post.reactions || {};
      const thumbsUp = reactions['👍'] || { emoji: '👍', count: 0, users: [] };

      if (thumbsUp.users.includes(user.uid)) {
        await updateDoc(postRef, {
          'reactions.👍.count': increment(-1),
          'reactions.👍.users': arrayRemove(user.uid),
        });
      } else {
        await updateDoc(postRef, {
          'reactions.👍.count': increment(1),
          'reactions.👍.users': arrayUnion(user.uid),
          'reactions.👍.emoji': '👍',
        });
      }
    } catch (err) {
      console.error('Error liking post:', err);
      throw err;
    }
  };

  const unlikePost = async (postId: string) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');

      const postRef = doc(db, 'posts', postId);
      const postDoc = await getDoc(postRef);
      const post = postDoc.data() as Post;

      const reactions = post.reactions || {};
      const thumbsUp = reactions['👍'];

      if (thumbsUp && thumbsUp.users.includes(user.uid)) {
        await updateDoc(postRef, {
          'reactions.👍.count': increment(-1),
          'reactions.👍.users': arrayRemove(user.uid),
        });
      }
    } catch (err) {
      console.error('Error unliking post:', err);
      throw err;
    }
  };

  return { posts, loading, error, createPost, likePost, unlikePost };
};

export const useComments = (postId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, 'comments'),
      where('postId', '==', postId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q,
      (snapshot) => {
        const commentsData = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          updatedAt: doc.data().updatedAt.toDate(),
        })) as Comment[];
        setComments(commentsData);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching comments:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [postId]);

  const addComment = async (content: string, parentCommentId?: string) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');

      const now = Timestamp.now();
      const newComment = {
        postId,
        authorId: user.uid,
        content,
        createdAt: now,
        updatedAt: now,
        reactions: {},
        ...(parentCommentId && { parentCommentId })
      };

      await addDoc(collection(db, 'comments'), newComment);

      // Update post comment count
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        commentCount: increment(1)
      });
    } catch (err) {
      console.error('Error adding comment:', err);
      throw err;
    }
  };

  return { comments, loading, error, addComment };
};

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q,
      (snapshot) => {
        const notificationsData = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
        })) as Notification[];
        setNotifications(notificationsData);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching notifications:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const markAsRead = async (notificationId: string) => {
    try {
      const notificationRef = doc(db, 'notifications', notificationId);
      await updateDoc(notificationRef, {
        read: true
      });
    } catch (err) {
      console.error('Error marking notification as read:', err);
      throw err;
    }
  };

  return { notifications, loading, error, markAsRead };
};

export const useReactions = (postId: string) => {
  const addReaction = async (emoji: string) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');

      const postRef = doc(db, 'posts', postId);
      const postDoc = await getDoc(postRef);
      if (!postDoc.exists()) throw new Error('Post not found');
      
      const post = postDoc.data() as Post;
      const reactions = post.reactions || {};
      const reaction = reactions[emoji] || { emoji, count: 0, users: [] };

      if (reaction.users.includes(user.uid)) {
        // Remove reaction
        await updateDoc(postRef, {
          [`reactions.${emoji}.count`]: increment(-1),
          [`reactions.${emoji}.users`]: arrayRemove(user.uid),
        });
      } else {
        // Add reaction
        await updateDoc(postRef, {
          [`reactions.${emoji}.count`]: increment(1),
          [`reactions.${emoji}.users`]: arrayUnion(user.uid),
          [`reactions.${emoji}.emoji`]: emoji,
        });

        // Create notification
        const notification = {
          userId: post.authorId,
          type: 'reaction' as const,
          sourceUserId: user.uid,
          postId,
          createdAt: Timestamp.now(),
          read: false,
          data: {
            reaction: emoji,
            preview: post.title,
          },
        };
        await addDoc(collection(db, 'notifications'), notification);
      }
    } catch (err) {
      console.error('Error handling reaction:', err);
      throw err;
    }
  };

  return { addReaction };
};

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'bookmarks'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q,
      (snapshot) => {
        const bookmarksData = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
        })) as unknown as Bookmark[];
        setBookmarks(bookmarksData);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching bookmarks:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const addBookmark = async (postId: string, tags?: string[], notes?: string) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');

      const bookmark: Omit<Bookmark, 'id'> = {
        userId: user.uid,
        postId,
        createdAt: new Date(),
        ...(tags && { tags }),
        ...(notes && { notes }),
      };

      await addDoc(collection(db, 'bookmarks'), bookmark);

      // Update post's bookmarkedBy array
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        bookmarkedBy: arrayUnion(user.uid),
      });
    } catch (err) {
      console.error('Error adding bookmark:', err);
      throw err;
    }
  };

  const removeBookmark = async (postId: string) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');

      const q = query(
        collection(db, 'bookmarks'),
        where('userId', '==', user.uid),
        where('postId', '==', postId)
      );

      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        await deleteDoc(doc(db, 'bookmarks', snapshot.docs[0].id));
      }

      // Update post's bookmarkedBy array
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        bookmarkedBy: arrayRemove(user.uid),
      });
    } catch (err) {
      console.error('Error removing bookmark:', err);
      throw err;
    }
  };

  return { bookmarks, loading, error, addBookmark, removeBookmark };
}; 