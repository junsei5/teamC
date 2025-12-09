"use client"
import React from 'react';
import { useRouter } from 'next/navigation'; // ルーター機能のインポート

export default function NavigationPage() {
  const router = useRouter(); // ルーターオブジェクトの取得

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>ページ遷移テスト</h1>
      
      {/* Page 1への遷移 */}
      <button 
        onClick={() => router.push("/page1")}
        style={{ margin: '10px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Page 1へ移動
      </button>

      {/* Page 2への遷移 */}
      <button 
        onClick={() => router.push("/page2")}
        style={{ margin: '10px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Page 2へ移動
      </button>

      {/* Page 3への遷移 */}
      <button 
        onClick={() => router.push("/page3")}
        style={{ margin: '10px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Page 3へ移動
      </button>
    </div>
  );
}