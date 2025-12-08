// app/signup/page.tsx (新規登録ページの内容)

"use client"; // ★ クライアントコンポーネント化のために追加
import { useState } from "react"; // 状態管理のために追加
import Link from "next/link"; // ログインページへのリンクのため追加

export default function SignupPage() {
  // ユーザーの入力値を保持するための状態を定義します
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // フォーム送信時の処理を定義します
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // ページの再読み込みを防ぐ
    
    // ここに新規登録APIを呼び出す処理を記述します
    console.log('新規登録試行:', { name, email, password });
    
    // 成功/失敗に応じた処理...
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>新規登録</h2>
      
      {/* 新規登録フォームのコンポーネントを配置 */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="signup-name" style={{ display: 'block', marginBottom: '5px' }}>
            お名前
          </label>
          <input
            id="signup-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="signup-email" style={{ display: 'block', marginBottom: '5px' }}>
            メールアドレス
          </label>
          <input
            id="signup-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="signup-password" style={{ display: 'block', marginBottom: '5px' }}>
            パスワード
          </label>
          <input
            id="signup-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8} // パスワードの最低文字数を設定
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
          />
        </div>
        
        <button 
          type="submit" 
          style={{ width: '100%', padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          アカウント作成
        </button>
      </form>

      {/* ログインページへの導線 */}
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        すでにアカウントをお持ちですか？ <Link href="/login">ログインはこちら</Link>
      </p>
    </div>
  );
}