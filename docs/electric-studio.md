# Electric Studio — Phase 1A

Implements [issue #21](https://github.com/A-coderr/developer-portfolio/issues/21). Keep this change in review until the visual checks below are complete; do not merge or deploy to production before approval.

## Colour architecture

`src/app/globals.css` extends the existing Tailwind 4 `@theme inline` system. The five fixed `--brand-*` primitives are Midnight Ink `#171B2B`, Soft Ivory `#F6F2EA`, Electric Lavender `#8D9BFF`, Warm Coral `#FF987D`, and Pale Mint `#BEE5C0`. Supporting colours are sRGB mixtures of those primitives.

| Semantic role | Purpose |
| --- | --- |
| `background`, `surface` | Section canvas and raised panels |
| `foreground`, `muted` | Primary and supporting text |
| `border` | Decorative separators and card edges |
| `control-border` | Boundaries that identify controls; tested at 3:1 |
| `accent`, `accent-subtle` | Links, labels, and diagram emphasis |
| `positive` | Current experience and current-focus accents |
| `action`, `action-hover`, `on-action` | Primary buttons and their text |
| `focus` | Keyboard focus rings, distinct from decorative accents |
| `shadow` | Ink-based menu shadow |

The root is dark. `data-theme="light"` establishes an Ivory context; `data-theme="feature"` establishes a Lavender context with Ink text. `data-theme="dark"` resets all contextual roles for dark cards nested in light sections. Continue using semantic utilities such as `bg-background`, `text-muted`, and `focus-visible:ring-focus` inside these boundaries. Apply `bg-background text-foreground` to the boundary itself; the attribute defines tokens, not layout.

The homepage uses an Ink header/hero, Lavender headline emphasis, Coral primary CTA, an Ivory projects band with dark cards, Ink experience, dark About surfaces with Lavender/Mint details, a Lavender contact band, and an Ink footer. Each case study retains its layout and adds a selective Ivory panel. Inline diagrams use CSS variables, including a light architecture diagram in Neon Chaser.

`src/data/palette.ts` supplies literal colours to Next `ImageResponse`, which renders outside the page CSS cascade. A test checks its five values against the CSS primitives to prevent drift. This is the only intentional duplication of brand hex values. The favicon is generated from `/icon`, preserving the existing `AK.` artwork and replacing the starter Vercel favicon.

To regenerate the favicon after updating the icon or palette, start the current local build, then run:

```powershell
node scripts/generate-favicon.mjs http://localhost:3010
```

The helper uses the `sharp` dependency already installed by Next and emits 16, 32, 48, and 256px PNG entries in the ICO. Rebuild afterward to serve the new static favicon.

## Accessibility and performance

Text role/background combinations are tested at WCAG AA's 4.5:1 threshold; control borders and focus rings are tested at 3:1 against both canvas and surface. Primary buttons are checked in default and hover states. Decorative separators intentionally have lower contrast and do not convey control affordances or information by themselves.

| Core pairing | Contrast |
| --- | --- |
| Ivory / Ink | 15.31:1 |
| Lavender / Ink | 6.73:1 |
| Coral / Ink | 8.17:1 |
| Mint / Ink | 12.34:1 |

Light-context accents use darker derived colours. Official pastels are not used as small text on Ivory. Contact uses Ink foreground and focus rings on Lavender. Text selection also adapts to each context.

Navigation, email copying and its live feedback, résumé downloads, links, reduced-motion rules, the accessible skills list, and the 3D sphere implementation are preserved. There are no new dependencies, client components, runtime theme providers, or theme-switching JavaScript. Existing image dimensions and grid breakpoints are retained. The section wrappers change background coverage and vertical spacing; their responsive appearance still needs browser review.

## Validation and limits

- `npm test`: 110 tests pass across 12 files, including 55 palette/artwork/contrast checks.
- `npm run lint`: passes.
- `npm run build`: passes; homepage, all four case studies, icons and SEO routes are generated.
- Production HTTP checks: homepage and all four case studies return 200, include canonical metadata and light contexts, and load their CSS successfully. Contact's feature context is present. Résumé PDF, robots, sitemap, Open Graph image, icon and apple icon return 200. Unknown route returns 404.
- Generated PNG dimensions: Open Graph 1200×630, icon 512×512, apple icon 180×180. Open Graph and AK icon artwork visually inspected.
- Legacy palette audit in `src` and `public`: no textual occurrences of `#0B0D10`, `#12151A`, `#F4F2ED`, `#A6ABB3`, `#2A2F37`, `#FF6846`, or `#FF7A5D` remain.
- Intentional exceptions: project screenshots/concept artwork, the hero illustration, résumé PDF, and third-party technology logos retain their original colours. These are content/brand assets, not UI tokens. Project screenshot colours are not covered by the UI contrast assertions.
- Browser verification and before/after website screenshots are **pending**. Browser access reported that the browser host was unavailable; native Computer Use then stopped because it could not reliably determine Chrome's current URL. No browser visual, overflow, hover, focus-clipping, or viewport pass is claimed.
- Checks ran with the user's existing working-tree dependency upgrade (Next 16.4.3). `package.json` and `package-lock.json` edits predated this task and are excluded from the palette commit. CI should also validate the branch's committed dependency lockfile.
- Next regenerated the heading level in `AGENTS.md` during startup. That generated change is retained as instructed by the repository rules.

## Before/after visual review

Baseline: `f791b18` (before this palette implementation). Use an isolated checkout to avoid disturbing current changes:

```powershell
git worktree add ../portfolio-v2-before f791b18
cd ../portfolio-v2-before
npm ci
npm run dev -- -p 3001
```

In the updated checkout, run `npm run dev -- -p 3000`. Compare localhost ports 3001 and 3000 with the same browser, 100% zoom, fonts loaded, and reduced motion enabled for deterministic sphere placement. Scroll through the page to load lazy images before capture. Local Open Graph URLs use the existing site URL configuration; use the production environment value when reviewing production metadata.

Capture full-page screenshots through Chrome DevTools' **Capture full size screenshot** command at:

| Viewport | Routes |
| --- | --- |
| Desktop 1440×900 | `/`, `/work/neon-chaser`, `/work/asset-platform`, `/work/skif-karate-canada`, `/work/portfolio-v1` |
| Tablet 768×1024 | Same five routes |
| Mobile 390×844 | Same five routes |
| Narrow mobile 320×740 | Spot-check long titles, email wrapping, cards, and navigation |

Name captures `before-home-desktop.png`, `after-home-desktop.png`, etc. Attach matched pairs to the PR. Also capture homepage projects/contact and the Neon Chaser diagram at a readable scale. Verify:

- No horizontal overflow or clipped text; project cards expand appropriately on mobile/tablet.
- Full-width Ivory and Lavender sections meet their neighbours cleanly; dark cards reset text and focus roles.
- Tab/Shift+Tab focus is visible on every link/button, including mobile navigation and controls inside cards; focus rings are not clipped.
- Open mobile navigation, download the résumé, follow each case-study link and Back to projects, copy email, and activate the trailer.
- Hover and press primary/secondary actions; verify feedback in dark and light contexts.
- Toggle reduced motion and check smooth scrolling, image hover motion, and sphere rotation retain existing behaviour.
- Inspect `/opengraph-image`, `/icon`, `/apple-icon`, and `/favicon.ico` after clearing the favicon cache.

## Changed files

New:

- `src/data/palette.ts`
- `src/data/palette.test.ts`
- `scripts/generate-favicon.mjs`
- `docs/electric-studio.md`

Modified:

- `AGENTS.md` (Next-generated heading only)
- `src/app/globals.css`
- `src/app/apple-icon.tsx`
- `src/app/icon.tsx`
- `src/app/favicon.ico`
- `src/app/opengraph-image.tsx`
- `src/app/not-found.tsx`
- `src/components/about/About.tsx`
- `src/components/contact/Contact.tsx`
- `src/components/contact/ContactEmailCta.tsx`
- `src/components/experience/Experience.tsx`
- `src/components/hero/Hero.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/Header.tsx`
- `src/components/projects/AssetPlatformCaseStudy.tsx`
- `src/components/projects/CaseStudyShell.tsx`
- `src/components/projects/LightweightYouTubeEmbed.tsx`
- `src/components/projects/NeonChaserCaseStudy.tsx`
- `src/components/projects/PortfolioV1CaseStudy.tsx`
- `src/components/projects/ProjectMedia.tsx`
- `src/components/projects/ProjectTeaserCard.tsx`
- `src/components/projects/SelectedWork.tsx`
- `src/components/projects/SkifKarateCaseStudy.tsx`
- `src/components/projects/case-study/CaseStudyPrimitives.tsx`

Content data, root layout/SEO configuration, sphere logic, third-party logos, and project/hero images are unchanged.
