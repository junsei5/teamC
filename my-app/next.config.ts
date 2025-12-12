// next.config.ts

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ... 既存の設定があればそのまま残す
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // Hot Pepper API の画像ドメイン
        hostname: 'imgfp.hotp.jp', 
        // パスも制限したい場合は pathname: '/...' を追加できますが、今回は全体を許可します
      },
      // もし他の外部ドメイン(例: Google Mapsの画像など)を使う場合はここに追加
    ],
  },
  
  // ... 既存の設定があればそのまま残す
};

export default nextConfig;