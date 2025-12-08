import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google"; // 必要に応じてインポート
import "./globals.css"; 
import HeaderLogo from "./components/HeaderLogo"; 

// フォントやメタデータの設定は省略

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{ 
            display: 'flex', 
            flexDirection: 'column',
            minHeight: '100vh',
            margin: 0 
        }}
      >
        <header style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '20px', 
          borderBottom: '1px solid #eaeaea',
          backgroundColor: '#ffffff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          {/* ロゴの表示制御 */}
          <HeaderLogo /> 
          
          {/* レイアウト維持のための空のdiv (HeaderLogoと対になる) */}
          <div style={{ width: '150px', minWidth: '150px', height: '40px' }} />
        </header>
        
        {/* mainが残りのスペースを全て占有する設定 (中央配置に必須) */}
        <main style={{ 
            padding: '20px', 
            flexGrow: 1 
        }}>
          {children}
        </main>
        
      </body>
    </html>
  );
}