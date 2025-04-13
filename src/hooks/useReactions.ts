import { useState, useEffect } from 'react';
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
} from 'firebase/firestore';
import { db, auth } from '../firebase/config';

export const useReactions = (postId: string) => {
  const addReaction = async (emoji: string) => {
    if (!auth.currentUser) throw new Error('Must be logged in to react');

    try {
      const postRef = doc(db, 'posts', postId);
      const userId = auth.currentUser.uid;
      const reactionPath = `reactions.${emoji}`;

      await updateDoc(postRef, {
        [`${reactionPath}.count`]: increment(1),
        [`${reactionPath}.users`]: arrayUnion(userId),
      });
    } catch (err) {
      console.error('Error adding reaction:', err);
      throw err;
    }
  };

  const removeReaction = async (emoji: string) => {
    if (!auth.currentUser) throw new Error('Must be logged in to remove reaction');

    try {
      const postRef = doc(db, 'posts', postId);
      const userId = auth.currentUser.uid;
      const reactionPath = `reactions.${emoji}`;

      await updateDoc(postRef, {
        [`${reactionPath}.count`]: increment(-1),
        [`${reactionPath}.users`]: arrayRemove(userId),
      });
    } catch (err) {
      console.error('Error removing reaction:', err);
      throw err;
    }
  };

  return {
    addReaction,
    removeReaction,
  };
};

export default useReactions; 