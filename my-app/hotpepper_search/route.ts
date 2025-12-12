// /api/hotpepper_search/route.ts

import { NextResponse } from 'next/server';

// GETリクエストを処理する関数
export async function GET(request: Request) {
  
  // 1. 環境変数からキーを読み込む (サーバーサイドでのみ実行されるため安全)
  const apiKey = process.env.HOTPEPPER_API_KEY;
  if (!apiKey) {
    // CRITICALエラーをログに出力し、エラーレスポンスを返す
    console.error("CRITICAL: HOTPEPPER_API_KEY is NOT loaded from environment variables!");
    return NextResponse.json({ error: "API Key is missing or server not restarted." }, { status: 500 });
  }

  // 2. 緯度と経度をクエリパラメータから取得
  const { searchParams } = new URL(request.url);
  // URLに lat/lng が指定されていない場合は、東京駅付近のデフォルト値を使用
  const lat = searchParams.get('lat') || '35.681236'; 
  const lng = searchParams.get('lng') || '139.767125'; 

  // 3. Hot Pepper APIのエンドポイントURLを構築
  // key: APIキー
  // lat/lng: 検索の中心座標
  // range=3: 半径1000m圏内
  // format=json: レスポンス形式をJSONに指定
  const url = `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${apiKey}&lat=${lat}&lng=${lng}&range=3&format=json`;

  try {
    // 4. Hot Pepper APIにリクエストを送信
    const response = await fetch(url);
    const data = await response.json();

    // 5. APIからの応答をチェック
    // ホットペッパーAPIからの結果は data.results に格納される
    if (data.results.error) {
      // API側で発生したエラー (例: キーが無効、リクエストが不正など) をログに出力
      console.error('Hot Pepper API Error:', data.results.error);
      return NextResponse.json({ error: '外部APIリクエストエラー: ' + data.results.error[0].message }, { status: 500 });
    }

    // 6. 結果をフロントエンドに返す
    // 取得したお店の情報は data.results.shop 配列に入っています
    return NextResponse.json(data.results.shop || []);
    
  } catch (error) {
    // ネットワークやfetch自体で発生したエラー
    console.error('ネットワーク通信エラー:', error);
    return NextResponse.json({ error: 'サーバーから外部APIへの通信に失敗しました' }, { status: 500 });
  }
}