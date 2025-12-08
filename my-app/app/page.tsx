// app/page.tsx

import Link from 'next/link';

export default function RootPage() {
  return (
    <div style={{ textAlign: 'center', paddingTop: '100px' }}>
      <h1>✨ ようこそ！</h1>
      <p>このアプリケーションを利用するにはログインが必要です。</p>
      <div style={{ marginTop: '30px' }}>
        <Link href="/login" style={{ marginRight: '20px', fontSize: '18px', color: '#0070f3', textDecoration: 'underline' }}>
            ➡️ ログインはこちら
        </Link>
        <Link href="/signup" style={{ fontSize: '18px', color: '#28a745', textDecoration: 'underline' }}>
            ➡️ 新規登録はこちら
        </Link>
      </div>
    </div>
  );
}