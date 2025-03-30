import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import { User } from '../types/community';
import { updateUserProfile } from '../utils/userProfile';

export const useProfile = (userId?: string) => {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const targetUserId = userId || auth.currentUser?.uid;
    if (!targetUserId) {
      setLoading(false);
      return;
    }

    const userRef = doc(db, 'users', targetUserId);
    const unsubscribe = onSnapshot(
      userRef,
      (doc) => {
        if (doc.exists()) {
          setProfile(doc.data() as User);
        } else {
          setProfile(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching profile:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  const updateProfile = async (updates: Partial<Omit<User, 'uid' | 'email' | 'createdAt'>>) => {
    try {
      const targetUserId = userId || auth.currentUser?.uid;
      if (!targetUserId) throw new Error('No user ID available');

      await updateUserProfile(targetUserId, updates);
    } catch (err) {
      console.error('Error updating profile:', err);
      throw err;
    }
  };

  return { profile, loading, error, updateProfile };
}; 