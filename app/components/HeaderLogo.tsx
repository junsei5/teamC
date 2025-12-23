// components/HeaderLogo.tsx

"use client"; 
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import { useAuthStatus } from "../hooks/useAuthStatus"; 

export default function HeaderLogo() {
  const pathname = usePathname();
  const { isAuthenticated, isChecking } = useAuthStatus(); 

  const logoWrapperStyle = {
    width: '150px', 
    minWidth: '150px',
    height: '40px', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  };

  // 表示条件: 認証チェック中でない AND 未ログイン状態 AND パスがトップページ("/")
  const shouldShowLogo = !isChecking && !isAuthenticated && pathname === '/';

  if (!shouldShowLogo) {
    return <div style={logoWrapperStyle} />;
  }

  return (
    <div style={logoWrapperStyle}>
      <Link href="/"> 
        <h1>My App Logo</h1>
      </Link>
    </div>
  );
}