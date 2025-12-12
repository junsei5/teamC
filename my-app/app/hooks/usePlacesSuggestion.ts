// hooks/usePlacesSuggestion.ts

import { useState, useEffect } from 'react';
import axios from 'axios';

// APIが返す場所のデータ構造を定義
interface PlaceSuggestion {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  rating?: number;
}

interface SuggestionHook {
  suggestions: PlaceSuggestion[];
  isLoading: boolean;
  error: string | null;
  fetchSuggestions: (lat: number, lng: number) => void;
}

/**
 * /api/suggest_places APIから場所の提案リストを取得するためのカスタムフック
 * @returns 提案リスト、ローディング状態、エラー、データ取得関数
 */
export const usePlacesSuggestion = (): SuggestionHook => {
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 提案データを取得する非同期関数
  const fetchSuggestions = async (lat: number, lng: number) => {
    setIsLoading(true); // ローディング状態を開始
    setError(null);    // エラーをリセット

    try {
      // バックエンドのAPI RouteにGETリクエストを送信
      const response = await axios.get('/api/suggest_places', {
        params: {
          lat: lat.toString(), // 緯度をクエリパラメータとして渡す
          lng: lng.toString(), // 経度をクエリパラメータとして渡す
        },
      });
      
      // 取得したデータを状態にセット
      setSuggestions(response.data);
    } catch (err) {
      console.error('場所の提案取得中にエラーが発生しました:', err);
      // ユーザーに表示するためのエラーメッセージを設定
      setError('候補地の取得に失敗しました。時間をおいて再度お試しください。');
      setSuggestions([]); // 失敗時はデータを空にする
    } finally {
      setIsLoading(false); // ローディング状態を終了
    }
  };

  return { suggestions, isLoading, error, fetchSuggestions };
};