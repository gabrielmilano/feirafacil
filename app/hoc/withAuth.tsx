"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getToken } from '../hooks/authService'; 
import { jwtDecode, JwtPayload } from 'jwt-decode'; 

const withAuth = (WrappedComponent: React.FC) => {
  const ComponentWithAuth = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const token = getToken();
      if (!token || !isTokenValid(token)) {
        router.push('/pages/public/login'); 
      }
    }, [router]);

    const isTokenValid = (token: string): boolean => {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp ? decoded.exp > currentTime : false;
      } catch (error) {
        return false;
      }
    };

    return <WrappedComponent {...props} />;
  };
  return ComponentWithAuth;
};

export default withAuth;
