# Dipesh Shrestha portfolio

Next.js App Router, React and TypeScript source for https://dipeshshrestha69.com.np.

## Local development

Use Node.js 22 or newer. Run `npm ci`, then `npm run dev`.

## GitHub Pages release

The repository keeps editable source in `nextjs/` and the generated static website in the repository root. GitHub Pages publishes `main` from `/ (root)`. The `.nojekyll` file allows Next.js assets under `_next/` to be served. `public/CNAME` preserves the custom domain.

From `nextjs/`:

1. Run `npm ci` after dependency changes.
2. Run `npm run build` to generate `out/`.
3. Run `npm run verify` to check required pages and local links/assets.
4. Run `npm start` and inspect http://localhost:4174. This previews the static export; `next start` cannot serve an export.
5. Run `npm run publish:files` to copy the verified export to the repository root.
6. From the repository root, review `git diff` and `git status`, commit the release, and push `main`.
7. Wait for the Pages deployment in GitHub Actions, then check the homepage, resume and all three case studies on the live domain.

Canonical case-study routes are `/case-study/website/`, `/case-study/kyc/` and `/case-study/product/`. Both `/case-study?project=...` and `/case-study.html?project=...` preserve older links with a browser redirect.

The deployed fonts are bundled during the build. Building requires access to Google Fonts; visitors receive the bundled font files from this site.

## Rollback

Run `git revert <deployment-commit>`, then `git push origin main` to publish the previous version without rewriting history.
