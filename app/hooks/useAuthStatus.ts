// hooks/useAuthStatus.ts

"use client";

import { useState, useEffect } from 'react';

// 【簡易的なCookie操作関数】
const setCookie = (name: string, value: string) => {
    document.cookie = `${name}=${value}; path=/; max-age=${60 * 60 * 24}`; 
};
const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
};
const removeCookie = (name: string) => {
    document.cookie = name + '=; Max-Age=-99999999; path=/';
};


export function useAuthStatus() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true); 
  const AUTH_TOKEN_KEY = 'auth_token'; 

  // ESLint警告を抑制するコメントを付けています
  // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
  useEffect(() => {
    const token = getCookie(AUTH_TOKEN_KEY); 
    
    setIsAuthenticated(!!token); 
    setIsChecking(false); 
  }, []); 

  const login = () => {
    setCookie(AUTH_TOKEN_KEY, 'user-logged-in-token'); 
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeCookie(AUTH_TOKEN_KEY); 
    setIsAuthenticated(false);
  };

  return { isAuthenticated, isChecking, login, logout };
}