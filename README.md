# 🎨 ScriptLyze Frontend

Modern web interface for ScriptLyze - AI-powered YouTube script analyzer.

## 🚀 Features

- ✅ **Modern UI** - Clean, dark theme design
- ✅ **Real-time Analysis** - Instant script feedback
- ✅ **Dashboard** - Track your analytics
- ✅ **History** - View past analyses
- ✅ **Responsive** - Mobile, tablet, desktop
- ✅ **Fast** - Next.js 14 with App Router
- ✅ **Type-safe** - Full TypeScript support

## 📋 Tech Stack

- Next.js 14
- React 18
- TypeScript 5
- Tailwind CSS 3.4
- Zustand (State)
- TanStack Query (Data Fetching)
- Axios (HTTP Client)
- Framer Motion (Animations)

## 🏃 Quick Start

### Local Development
```bash
# Install dependencies
npm install

# Setup environment
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Run dev server
npm run dev
```

Visit: http://localhost:3000

### Production Build
```bash
npm run build
npm start
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or via Dashboard:
1. Go to vercel.com
2. Import from GitHub
3. Set `NEXT_PUBLIC_API_URL` environment variable
4. Deploy!

## 📁 Project Structure
```
app/
├── (auth)/
│   ├── login/          # Login page
│   └── signup/         # Signup page
├── (dashboard)/
│   ├── dashboard/      # Main dashboard
│   ├── analyze/        # Script analyzer
│   ├── history/        # Analysis history
│   └── analysis/[id]/  # Single analysis view
├── page.tsx            # Landing page
├── layout.tsx          # Root layout
└── globals.css         # Global styles

lib/
├── api.ts              # API client
└── store.ts            # Zustand store
```

## 🎨 Customization

### Colors

Edit `tailwind.config.js`:
```js
colors: {
  primary: {
    500: '#ef4444',  // Your color
  }
}
```

## 📝 License

MIT License

## 🔗 Related

- Backend: [scriptlyze-backend](https://github.com/yourusername/scriptlyze-backend)

---

**Built with Next.js 14 and Tailwind CSS**
