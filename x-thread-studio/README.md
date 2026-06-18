# 𝕏 Thread Studio

AI-powered X (Twitter) content generator. Create threads, hot takes, how-tos, stories and lists in seconds — for any niche.

Built with React + Vite + Vercel Serverless Functions + Claude AI.

---

## 🚀 Deploy to Vercel (5 minutes)

### Step 1 — Get an Anthropic API Key
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up / log in → **API Keys** → **Create Key**
3. Copy the key (starts with `sk-ant-...`)

### Step 2 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: X Thread Studio"
```
Then create a new repo on [github.com](https://github.com/new) and push:
```bash
git remote add origin https://github.com/YOUR_USERNAME/x-thread-studio.git
git branch -M main
git push -u origin main
```

### Step 3 — Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your `x-thread-studio` GitHub repo
3. Framework: **Vite** (auto-detected)
4. Before clicking Deploy → go to **Environment Variables** and add:
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** your `sk-ant-...` key
5. Click **Deploy**

That's it. Vercel gives you a live URL instantly.

---

## 🛠 Local Development

```bash
npm install
```

Create a `.env.local` file:
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

Run locally:
```bash
npm run dev
```

> Note: Vercel serverless functions run via `vercel dev` locally. For plain `npm run dev`, the `/api/generate` route won't work — use `npx vercel dev` instead after installing the Vercel CLI.

---

## 📁 Project Structure

```
x-thread-studio/
├── api/
│   └── generate.js       # Vercel serverless function (secure API calls)
├── src/
│   ├── App.jsx            # Main React app
│   └── main.jsx           # Entry point
├── index.html
├── vite.config.js
├── vercel.json            # Vercel routing config
└── package.json
```

---

## Built by
[@Santandave961](https://x.com/Santandave961) — Data Scientist & ML Engineer