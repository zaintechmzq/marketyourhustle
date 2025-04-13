import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  increment,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import { Comment } from '../types/community';

export const useComments = (postId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) return;

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
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
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

  const addComment = async (content: string, parentId?: string) => {
    if (!auth.currentUser) throw new Error('Must be logged in to comment');

    try {
      const timestamp = serverTimestamp();
      const commentData = {
        content,
        authorId: auth.currentUser.uid,
        postId,
        parentId: parentId || null,
        createdAt: timestamp,
        updatedAt: timestamp,
        likes: 0,
        likedBy: [],
        replies: []
      };

      const docRef = await addDoc(collection(db, 'comments'), commentData);
      // Add local timestamp for immediate display
      const localComment = {
        ...commentData,
        id: docRef.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setComments(prev => [...prev, localComment]);
    } catch (err) {
      console.error('Error adding comment:', err);
      throw err;
    }
  };

  const deleteComment = async (commentId: string) => {
    if (!auth.currentUser) throw new Error('Must be logged in to delete comment');

    try {
      const commentRef = doc(db, 'comments', commentId);
      await deleteDoc(commentRef);
    } catch (err) {
      console.error('Error deleting comment:', err);
      throw err;
    }
  };

  const editComment = async (commentId: string, newContent: string) => {
    if (!auth.currentUser) throw new Error('Must be logged in to edit comment');

    try {
      const commentRef = doc(db, 'comments', commentId);
      await updateDoc(commentRef, {
        content: newContent,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error('Error editing comment:', err);
      throw err;
    }
  };

  const likeComment = async (commentId: string) => {
    if (!auth.currentUser) throw new Error('Must be logged in to like comment');

    try {
      const commentRef = doc(db, 'comments', commentId);
      const userId = auth.currentUser.uid;
      const comment = comments.find(c => c.id === commentId);

      if (!comment) throw new Error('Comment not found');

      if (comment.likedBy.includes(userId)) {
        // Unlike
        await updateDoc(commentRef, {
          likes: increment(-1),
          likedBy: arrayRemove(userId),
        });
      } else {
        // Like
        await updateDoc(commentRef, {
          likes: increment(1),
          likedBy: arrayUnion(userId),
        });
      }
    } catch (err) {
      console.error('Error liking comment:', err);
      throw err;
    }
  };

  return {
    comments,
    loading,
    error,
    addComment,
    deleteComment,
    editComment,
    likeComment,
  };
};

export default useComments; 