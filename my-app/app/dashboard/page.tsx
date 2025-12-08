// app/dashboard/page.tsx

"use client"; 
import AuthButtons from "../components/AuthButtons"; 
import { useAuthStatus } from "../hooks/useAuthStatus"; 
import { useRouter } from "next/navigation"; 
import { useEffect } from "react"; 

export default function DashboardPage() {
  const { isAuthenticated, isChecking } = useAuthStatus();
  const router = useRouter(); 

  // クライアントサイドでの認証チェックとリダイレクト
  // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
  useEffect(() => {
    if (!isChecking && !isAuthenticated) {
        router.push('/login'); 
    }
  }, [isChecking, isAuthenticated, router]);

  if (isChecking || !isAuthenticated) {
    return (
        <div style={{ textAlign: 'center', paddingTop: '100px' }}>
            {isChecking ? <h1>認証状態を確認中...</h1> : <h1>ログインページへ移動中...</h1>}
        </div>
    );
  }

  // ログイン済みの場合のダッシュボードコンテンツ
  return (
    <div style={{ textAlign: 'center', paddingTop: '50px' }}>
      <h1>ダッシュボードへようこそ！</h1>
      <p>これがログイン後のメインコンテンツです。</p>
      <AuthButtons /> 
    </div>
  );
}