// app/dashboard/page.tsx 
'use client'; 

import React, { useEffect } from 'react';
import { SpotCard } from '../components/SpotCard';
import { HotPepperShop } from '@/types/hotpepper'; 
import { Search, MapPin } from 'lucide-react';

const DEFAULT_LATITUDE = '35.681236';
const DEFAULT_LONGITUDE = '139.767125';

// API Routeからデータを取得する関数 (ロジックは以前と同じ)
const DashboardPage = () => {
  const [suggestions, setSuggestions] = React.useState<HotPepperShop[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchSuggestions = async (lat: string, lng: string) => {
    try {
      // ... (データ取得ロジックは省略 - 以前提供したコードと同じ)
      setIsLoading(true);
      setError(null);
      const response = await fetch(`/api/suggest_places?lat=${lat}&lng=${lng}`);
      
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `HTTP error! status: ${response.status}`);
      }
      const data: HotPepperShop[] = await response.json();
      setSuggestions(data);
      
    } catch (e) {
      console.error("API Fetch Error:", e);
      setError(e instanceof Error ? e.message : "候補地の取得に失敗しました。");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions(DEFAULT_LATITUDE, DEFAULT_LONGITUDE);
  }, []); 

  return (
    // ページ全体レイアウト: Tailwindで定義
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen"> 
      
      {/* 1. ヘッダー / 検索コントロールエリア */}
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
          WanderPass <span className="text-blue-500">探索</span>
        </h1>
        
        {/* 検索情報とフィルターカード */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-md border border-gray-200">
          
          {/* 現在地表示 */}
          <p className="text-md text-gray-700 font-medium flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-blue-500" />
            現在地: <span className="text-blue-600 font-bold ml-1">東京駅周辺</span>
          </p>
          
          {/* 仮のフィルターボタン */}
          <div className="flex space-x-2 overflow-x-auto pb-1">
            <button className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors whitespace-nowrap">
              <Search className="w-4 h-4 mr-1" />
              すべて ({(suggestions?.length || 0)})
            </button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors whitespace-nowrap">
              🍴 飲食店
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors whitespace-nowrap">
              🎡 レジャー
            </button>
          </div>
        </div>
      </header>

      {/* 2. 結果リストタイトル */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        <span className="text-blue-500">{(suggestions?.length || 0)}</span> 件の提案された候補地
      </h2>
      
      {/* 3. ステータス表示 */}
      {isLoading && (
        <div className="text-center text-blue-600 p-8 text-lg font-medium">提案場所を検索中です...</div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-md">
          エラー: {error}
        </div>
      )}

      {/* 4. スポットのリスト表示 */}
      {!isLoading && !error && suggestions.length > 0 ? (
        // レスポンシブグリッド: スマホ(1列) / タブレット(2列) / PC(3列)
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {suggestions.map((shop) => (
            <SpotCard key={shop.id} shop={shop} />
          ))}
        </div>
      ) : (
        // データがない場合の警告表示
        !isLoading && !error && (
          <div className="bg-yellow-50 border border-yellow-300 p-4 rounded-md text-yellow-800 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.503-1.678 1.732-3.042L12 4.414 4.194 17.958a2.91 2.91 0 001.732 3.042z"></path></svg>
            <p>提案できる場所が見つかりませんでした。APIキーや検索条件を確認してください。</p>
          </div>
        )
      )}
      
    </main>
  );
};

export default DashboardPage;