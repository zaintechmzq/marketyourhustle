import { useState, useEffect } from 'react';
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { db, auth } from '../firebase/config';

export const useBookmarks = () => {
  const addBookmark = async (postId: string) => {
    if (!auth.currentUser) throw new Error('Must be logged in to bookmark');

    try {
      const postRef = doc(db, 'posts', postId);
      const userId = auth.currentUser.uid;

      await updateDoc(postRef, {
        bookmarkedBy: arrayUnion(userId),
      });
    } catch (err) {
      console.error('Error adding bookmark:', err);
      throw err;
    }
  };

  const removeBookmark = async (postId: string) => {
    if (!auth.currentUser) throw new Error('Must be logged in to remove bookmark');

    try {
      const postRef = doc(db, 'posts', postId);
      const userId = auth.currentUser.uid;

      await updateDoc(postRef, {
        bookmarkedBy: arrayRemove(userId),
      });
    } catch (err) {
      console.error('Error removing bookmark:', err);
      throw err;
    }
  };

  return {
    addBookmark,
    removeBookmark,
  };
};

export default useBookmarks; 