import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { favoritesAtom, searchHistoryAtom } from '../store';
import { getFavorites, getHistory } from '../lib/auth';

const PUBLIC_PATHS = ['/login', '/register'];

const RouteGuard = ({ children }) => {
  const router = useRouter();


  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token && !PUBLIC_PATHS.includes(router.pathname)) {
        router.push('/login');
      } else {
        await updateAtoms();
      }
    };

    const updateAtoms = async () => {
  
    };

    checkAuth();
  }, [router]);

  return children;
};

export default RouteGuard;
