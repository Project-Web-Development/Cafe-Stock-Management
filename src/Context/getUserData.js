// useUserData.js
import { useEffect, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { getUserDataByEmail } from './firebaseController';

export function useUserData() {
  const { isAuthenticated, user } = useAuth();
  const [userData, setUserData] = useState(null);

  const getUserData = useCallback(async () => {
    try {
      if (isAuthenticated && user && user.email) {
        const fetchedUserData = await getUserDataByEmail(user.email);
        setUserData(fetchedUserData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);
console.log(userData)
  return userData;
}
