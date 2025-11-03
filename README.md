# new-ccc

This repository now houses the Next.js experience under `triple-c-react/`.

## Getting started

```bash
cd triple-c-react
npm install
npm run dev
```

The development server runs on `http://localhost:3000`.

## Deploying to GitHub Pages

The project is set up for static export so it can live at `https://redavi19-asu.github.io/new-ccc/`.

1. Build the site from the project directory:
	```bash
	cd triple-c-react
	npm run build
	```
	This creates an `out/` folder with a `.nojekyll` file so GitHub Pages serves the `_next` assets correctly.
2. Publish the `out/` folder however you prefer:
	- Commit the contents of `out/` to a `gh-pages` branch, or
	- Copy it into a root-level `docs/` folder and have GitHub Pages serve from `/docs`.
3. If you deploy to a custom domain or the repository root, set `NEXT_PUBLIC_BASE_PATH=""` before building to disable the default `/new-ccc` base path.