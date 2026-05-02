
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

export type UserRole = 'admin' | 'user' | 'guest';

interface AuthUser {
  uid: string;
  email: string | null;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => Promise<void>;
  loginAsGuest: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const savedGuest = localStorage.getItem('kerala-guide-guest');
    return savedGuest ? JSON.parse(savedGuest) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('kerala-guide-guest'));
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem('kerala-guide-guest');
    setUser(null);
    setIsAuthenticated(false);
  };

  const loginAsGuest = () => {
    const guestUser: AuthUser = { uid: 'guest-' + Date.now(), email: null, role: 'guest' };
    localStorage.setItem('kerala-guide-guest', JSON.stringify(guestUser));
    setUser(guestUser);
    setIsAuthenticated(true);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const role: UserRole =
          firebaseUser.email === 'admin@test.com' ? 'admin' : 'user';
        const u: AuthUser = { uid: firebaseUser.uid, email: firebaseUser.email, role };
        localStorage.removeItem('kerala-guide-guest');
        setUser(u);
        setIsAuthenticated(true);
      } else {
        // If not a guest in localStorage, then clear user
        if (!localStorage.getItem('kerala-guide-guest')) {
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, logout, loginAsGuest }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};
