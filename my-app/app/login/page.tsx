// app/login/page.tsx

"use client"
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStatus } from "../hooks/useAuthStatus"; 

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const router = useRouter(); 
  const { login } = useAuthStatus(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setIsLoading(true);

    try {
      // 🚀 認証成功のシミュレーション 
      await new Promise(resolve => setTimeout(resolve, 500)); 

      login(); 
      
      alert(`「${email}」としてログインに成功しました！`);
      
      // ★ ログイン成功後、/dashboard へ自動遷移します ★
      router.push('/dashboard'); 
      
    } catch (error) {
      console.error('エラー:', error);
      alert('処理中にエラーが発生しました。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // ... (JSX省略) ...
    <div 
        style={{
            height: '100%', 
            width: '100%',
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
        }}
    >
      
      <div style={{ maxWidth: '400px', width: '100%', padding: '30px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h2>ログイン</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Email and Password inputs */}
          <div style={{ marginBottom: '15px' }}><label htmlFor="login-email" style={{ display: 'block', marginBottom: '5px' }}>メールアドレス</label><input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}/></div>
          <div style={{ marginBottom: '20px' }}><label htmlFor="login-password" style={{ display: 'block', marginBottom: '5px' }}>パスワード</label><input id="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading} style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}/></div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            style={{ width: '100%', padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? 'ログイン中...' : 'ログイン'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          アカウントをお持ちでないですか？ 
          <Link 
          href="/signup"
          className= "glow-link"
          >
            新規登録はこちら
          </Link>
        </p>
      </div>
    </div>
  );
}