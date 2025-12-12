// app/api/suggest_places/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { HotPepperShop } from '@/types/hotpepper';

// Hot Pepper APIのベースURL
const HOTPEPPER_API_BASE_URL = 'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/';

/**
 * Hot Pepper API から候補地を取得する API Route
 * URL例: /api/suggest_places?lat=35.681236&lng=139.767125
 */
export async function GET(request: NextRequest) {
  
  // 1. 環境変数からAPIキーを取得
  const apiKey = process.env.HOTPEPPER_API_KEY;

  if (!apiKey) {
    console.error("HOTPEPPER_API_KEY is not set in environment variables.");
    return NextResponse.json(
      { error: "Server configuration error: API key missing." }, 
      { status: 500 }
    );
  }

  // 2. クエリパラメータから緯度(lat)と経度(lng)を取得
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  if (!lat || !lng) {
    return NextResponse.json(
      { error: "Missing required parameters: lat and lng." }, 
      { status: 400 }
    );
  }

  // 3. Hot Pepper APIへのリクエストURLを構築
  const hotpepperUrl = `${HOTPEPPER_API_BASE_URL}?key=${apiKey}&lat=${lat}&lng=${lng}&range=3&count=10&format=json`;
  // range=3: 1000m以内を検索、count=10: 10件取得

  try {
    const response = await fetch(hotpepperUrl, {
      // サーバーサイドでのキャッシュを無効化（常に最新のデータを取得するため）
      cache: 'no-store', 
    });

    // 4. Hot Pepper APIからの応答をチェック
    if (!response.ok) {
      // API側のエラーメッセージをログに出力
      const errorText = await response.text();
      console.error(`Hot Pepper API Error (Status ${response.status}): ${errorText}`);
      throw new Error("Failed to fetch data from Hot Pepper API.");
    }

    const data = await response.json();

    // Hot Pepper APIのレスポンス構造をチェック
    if (!data.results || !data.results.shop) {
      return NextResponse.json([]); // ショップデータがない場合は空の配列を返す
    }

    // 5. データをフロントエンドの型 (HotPepperShop) に整形
    const shops: HotPepperShop[] = data.results.shop.map((shop: any) => ({
      id: shop.id,
      name: shop.name,
      genre: {
        name: shop.genre.name,
      },
      budget: {
        name: shop.budget.name,
        average: shop.budget.average,
      },
      access: shop.access,
      open: shop.open,
      photo: {
        pc: {
          l: shop.photo.pc.l,
        },
      },
    }));
    
    // 6. 整形されたデータをフロントエンドに返す
    return NextResponse.json(shops);

  } catch (error) {
    console.error("API Route execution error:", error);
    return NextResponse.json(
      { error: "Internal server error during API call." }, 
      { status: 500 }
    );
  }
}