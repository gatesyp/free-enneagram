# free-enneagram

A free, privacy-first Enneagram personality test. Answer 45 questions, discover your type and wing, and share your results via screenshot.

**Nothing is stored.** All answers and scoring happen entirely in your browser.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push this repo to GitHub
2. Import the project in the [Vercel dashboard](https://vercel.com/new)
3. Deploy — no environment variables required

## How it works

- 45 statements across 9 pages (5 per page)
- 5-point agreement scale per statement
- Scores are tallied per type; highest score = primary type
- Wing = higher-scoring adjacent type on the Enneagram circle
- Results include a screenshot-friendly summary card plus scrollable details

## License

GPL-3.0 — see [LICENSE](LICENSE).