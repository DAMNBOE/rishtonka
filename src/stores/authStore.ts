import { create } from 'zustand';
import { auth, db } from '../lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  signUp: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', user.uid), {
        email,
        createdAt: new Date().toISOString(),
        profileComplete: false
      });
      set({ user, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  signIn: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      set({ user, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  signOut: async () => {
    try {
      await firebaseSignOut(auth);
      set({ user: null });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  }
}));