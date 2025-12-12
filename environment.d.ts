// environment.d.ts
// このファイルは、Node.jsのプロセス環境変数 (process.env) の型を拡張します。

declare namespace NodeJS {
  /**
   * process.env に存在する環境変数の型定義を拡張
   */
  interface ProcessEnv {
    // NODE_ENV はNext.jsによって自動的に提供されます
    readonly NODE_ENV: 'development' | 'production' | 'test';

    // 💡 バックエンドでのみ使用するAPIキーの定義
    // Next.jsは.envファイルから自動的に読み込むため、string型として定義します。
    // 必ず設定が必要な変数として、string | undefined ではなく string と定義します。
    readonly GOOGLE_PLACES_API_KEY: string;

    // もしSupabaseを使用する場合、以下のような定義も追加できます
    // readonly NEXT_PUBLIC_SUPABASE_URL: string;
    // readonly NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
  }
}

// NOTE: このファイルでは 'export {}' やその他のトップレベルのインポート/エクスポートは
// 使用しないでください。使用すると、グローバルスコープではなくモジュールスコープになってしまいます。