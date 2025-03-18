import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { verifyAdminCredentials, changeAdminPassword } from '../lib/db';

interface AuthContextType {
  isAdmin: boolean;
  isLoading: boolean;
  currentUser: any; // You might want to define a proper User type
  adminLogin: (username: string, password: string) => Promise<boolean>;
  changePassword: (username: string, currentPassword: string, newPassword: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  createTemporaryUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is admin
    const storedIsAdmin = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(storedIsAdmin);
    setIsLoading(false);
  }, []);

  const adminLogin = async (username: string, password: string) => {
    try {
      const isValid = await verifyAdminCredentials(username, password);
      if (isValid) {
        setIsAdmin(true);
        localStorage.setItem('isAdmin', 'true');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Admin login error:', error);
      return false;
    }
  };

  const changePassword = async (username: string, currentPassword: string, newPassword: string) => {
    try {
      return await changeAdminPassword(username, currentPassword, newPassword);
    } catch (error) {
      console.error('Change password error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      setIsAdmin(false);
      setCurrentUser(null);
      localStorage.removeItem('isAdmin');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    // Implement Google login logic
    try {
      // Add your Google authentication logic here
      // setCurrentUser(googleUser);
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  };

  const loginWithFacebook = async () => {
    // Implement Facebook login logic
    try {
      // Add your Facebook authentication logic here
      // setCurrentUser(facebookUser);
    } catch (error) {
      console.error('Facebook login error:', error);
      throw error;
    }
  };

  const loginWithGithub = async () => {
    // Implement GitHub login logic
    try {
      // Add your GitHub authentication logic here
      // setCurrentUser(githubUser);
    } catch (error) {
      console.error('GitHub login error:', error);
      throw error;
    }
  };

  const createTemporaryUser = async () => {
    try {
      const tempUser = {
        id: `temp-${Date.now()}`,
        isTemporary: true,
      };
      setCurrentUser(tempUser);
    } catch (error) {
      console.error('Temporary user creation error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAdmin,
        isLoading,
        currentUser,
        adminLogin,
        changePassword,
        logout,
        loginWithGoogle,
        loginWithFacebook,
        loginWithGithub,
        createTemporaryUser
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 