import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { User } from '../types/community';

export const createUserProfile = async (user: {
  uid: string;
  email: string;
  displayName?: string | null;
  photoURL?: string | null;
}) => {
  try {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const newUser: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email.split('@')[0],
        photoURL: user.photoURL || undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
        reputation: 0,
        badges: [],
        role: 'user',
        isVerified: false,
        bio: '',
        businessType: '',
        website: '',
        social: {
          linkedin: '',
          twitter: '',
          instagram: ''
        }
      };

      await setDoc(userRef, newUser);
      return newUser;
    }

    return userSnap.data() as User;
  } catch (err) {
    console.error('Error creating user profile:', err);
    throw err;
  }
};

export const updateUserProfile = async (
  userId: string,
  updates: Partial<Omit<User, 'uid' | 'email' | 'createdAt'>>
) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, updates);
  } catch (err) {
    console.error('Error updating user profile:', err);
    throw err;
  }
};

export const getUserProfile = async (userId: string): Promise<User | null> => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data() as User;
    }

    return null;
  } catch (err) {
    console.error('Error fetching user profile:', err);
    throw err;
  }
}; 