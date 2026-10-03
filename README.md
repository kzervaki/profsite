# Profsite

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./docs/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run deploy`          | Build and push to the `deployment` branch        |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Project structure

```
public/
  images/                 Static images
  styles/
    global.css            Stylesheet entry point; import order = cascade order
    base/                 tokens (custom properties), reset, motion, typography, layout
    themes/               contract (default variables), floral, sage, apply (wires variables to [data-theme])
    components/<group>/   One stylesheet per component, mirroring src/components
    pages/                Page-specific styles
scripts/
  deploy.sh               Deployment script (`npm run deploy`)
src/
  config/site.ts          Site-wide constants (name, contact details, ...)
  data/                   Services and approaches lists
  layouts/                BaseLayout (shell), ArticleLayout (text pages)
  components/
    layout/               SiteHeader, SiteNav, SiteFooter, SitePage
    content/              TextWithImage, IntroText, QuoteBlock, Image
    services/             ServiceCard, ServiceGrid
    grids/                GridHorizontal, GridVertical, GridStacked, CellContent
    contact/              ContactSection, ContactDetails, ContactForm, GoogleMap
    links/                LinkActive, LinkIntra
    icons/                SVG icon components
  scripts/                Client-side scripts (navigation)
  utils/                  Path and style helpers
  pages/                  File-based routes
```

Import from `src/` via the `@/` alias, e.g. `import SitePage from "@/components/layout/SitePage.astro"`.
