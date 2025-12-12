// components/SpotCard.tsx

import Image from 'next/image';
import { HotPepperShop } from '@/types/hotpepper';

interface SpotCardProps {
  shop: HotPepperShop;
}

// 現在時刻に基づき、営業時間情報から営業中かどうかを簡易的に判定する関数 (簡易版)
const isCurrentlyOpen = (openTime: string) => {
  // 実際には複雑なパースが必要ですが、ここでは常に「営業中」として仮定
  // 例外処理は省略し、APIデータをそのまま表示することを優先します
  if (openTime.includes('休')) return false;
  return true;
};

export const SpotCard: React.FC<SpotCardProps> = ({ shop }) => {
  const isOpen = isCurrentlyOpen(shop.open);
  const imageUrl = shop.photo.pc.l || '/placeholder.png'; // 画像がない場合の代替画像を用意

  return (
    // カードのベースデザイン: 白背景、角丸、影、ホバー時の強調
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-200 hover:shadow-xl hover:scale-[1.02] border border-gray-100">
      
      {/* 1. 写真エリア */}
      <div className="relative w-full h-40 bg-gray-200">
        <Image 
          src={imageUrl} 
          alt={shop.name} 
          fill 
          sizes="(max-width: 640px) 100vw, 33vw" // レスポンシブ設定
          style={{ objectFit: 'cover' }} 
        />
        {/* 営業状況バッジ (Primary/Accent カラーを使用) */}
        <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full text-white ${isOpen ? 'bg-green-500' : 'bg-red-500'}`}>
          {isOpen ? '営業中' : '閉店'}
        </span>
      </div>
      
      {/* 2. 情報エリア */}
      <div className="p-4">
        {/* 店名 (太字、濃いテキスト) */}
        <h3 className="text-xl font-bold text-gray-800 truncate mb-1" title={shop.name}>
          {shop.name}
        </h3>
        
        <div className="flex flex-wrap items-center text-sm text-gray-600 mb-2">
          {/* ジャンルタグ (柔らかい色) */}
          <span className="bg-blue-100 text-blue-800 font-medium px-2 py-0.5 rounded-full mr-2">
            {shop.genre.name}
          </span>
          
          {/* 予算 */}
          <span className="text-sm font-semibold text-gray-700">
            {shop.budget.average}
          </span>
        </div>
        
        {/* アクセス情報 (サブテキスト) */}
        <p className="text-xs text-gray-500 truncate mt-2">
          {shop.access}
        </p>

        {/* 営業時間（詳細） */}
        <p className="text-xs text-gray-400 mt-1">
          {shop.open}
        </p>

      </div>
    </div>
  );
};