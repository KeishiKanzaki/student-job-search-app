# 九工大就活 MVP

Next.js + React + Tailwind の MVP。企業検索・ダッシュボード等の基本 UI を含みます。

## ローカル起動

```bash
pnpm install
pnpm dev
```

## ビルド

```bash
pnpm build
pnpm start
```

## デプロイ (GitHub → Vercel)

1. Git 初期化 & 初回コミット
   ```bash
   git init
   git add -A
   git commit -m "chore: initial commit (MVP)"
   ```
2. GitHub に新規リポジトリを作成（例: `student-job-search-app`）
3. リモート追加 & push
   ```bash
   git remote add origin https://github.com/<your-username>/student-job-search-app.git
   git branch -M main
   git push -u origin main
   ```
4. Vercel にログインし "Add New... → Project" で上記 GitHub リポジトリを選択
   - Framework: 自動検出 (Next.js)
   - Install Command: 自動 (pnpm)
   - Build Command: `next build`
   - Output: 自動
5. デプロイ完了後、プレビュー URL と本番 URL が発行されます。

## 注意点
- Node.js 18 以上推奨（Vercel は 18/20 対応）
- 環境変数は現在不要（Supabase 連携等を有効化する場合のみ設定）
