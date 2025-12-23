// components/AuthButtons.tsx

"use client"; 
import Link from "next/link";
import { useAuthStatus } from "../hooks/useAuthStatus"; 
import { usePathname } from "next/navigation"; 

export default function AuthButtons() {
  const { isAuthenticated, isChecking, logout } = useAuthStatus();
  const pathname = usePathname();

  if (isChecking) {
    return null;
  }

  const wrapperStyle = {
    display: 'flex', 
    gap: '15px',
  };

  // ログイン済みの場合は、ログアウトボタンのみを表示
  if (isAuthenticated) {
    return (
      <nav style={wrapperStyle}> 
        <button 
          onClick={logout} 
          style={{ 
            padding: '8px 15px', 
            backgroundColor: '#dc3545',
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ログアウト
        </button>
      </nav>
    );
  }

  // 未ログインの場合、かつトップページにいる場合にのみ認証ボタンを表示
  if (pathname === '/') {
    return (
      <nav style={wrapperStyle}> 
        {/* 新規登録ボタン */}
        <Link href="/signup">
          <button 
            style={{ 
              padding: '8px 15px', 
              backgroundColor: '#0070f3',
              color: 'white', 
              border: 'none', 
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            新規登録
          </button>
        </Link>
        
        {/* ログインボタン */}
        <Link href="/login">
          <button 
            style={{ 
              padding: '8px 15px', 
              backgroundColor: 'transparent',
              color: '#0070f3',
              border: '1px solid #0070f3', 
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            ログイン
          </button>
        </Link>
      </nav>
    );
  }
  
  // 未ログインでトップページ以外の場合 (例: /login, /signup) は何も表示しない
  return null;
}