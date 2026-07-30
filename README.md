# Apex GeoConsulting Corporate Website (Next.js + Tailwind CSS)

Welcome to the corporate portal of **Apex GeoConsulting & Engineering S.r.l.**, a premier environmental consulting and geological survey engineering firm.

This is a professional-services / engineering consultancy multi-page website built using **Next.js (App Router) + TypeScript + Tailwind CSS**. The site is completely content-driven, structured so that all copywriting, SEO metadata, team profiles, capabilities, client endorsements, and case studies flow through a clean, typed abstraction layer.

---

## 🚀 Getting Started

### 1. Installation
Install the project dependencies using `pnpm`:
```bash
pnpm install
```

### 2. Development Server
Launch the Next.js development server locally:
```bash
pnpm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) in your web browser.

### 3. Running Unit Tests
We use **Vitest** for unit testing our data fetching and API abstraction layer. Execute the test suite with:
```bash
pnpm run test
```

### 4. Production Build
Compile a highly optimized production build:
```bash
pnpm run build
```

---

## 📁 Project Structure

```
├── app/
│   ├── api/contact/route.ts      # Validated route handler for Contact Form
│   ├── about/page.tsx            # Founder values, story and team grid
│   ├── services/                 # Services directory
│   │   ├── page.tsx              # Capabilities list
│   │   └── [slug]/page.tsx       # Dynamic individual service details page
│   ├── projects/                 # Portfolio directory
│   │   ├── page.tsx              # Filterable case studies
│   │   └── [slug]/page.tsx       # Dynamic individual case study page
│   ├── community/page.tsx        # CSR and outreach actions
│   ├── contact/page.tsx          # Map location, office addresses, and form
│   ├── privacy-policy/page.tsx   # Legal consent policies
│   ├── layout.tsx                # Site-wide wrapper with Header and Footer
│   ├── sitemap.ts                # Automatically generated SEO sitemap
│   ├── robots.ts                 # Dynamic robots.txt exclusions
│   └── manifest.ts               # Progressive Web App (PWA) manifest configuration
├── data/                         # Local JSON resources (Mock Content Repository)
│   ├── company.json              # Central legal details, addresses, socials
│   ├── stats.json                # Count-up key numbers
│   ├── services.json             # 7+ professional capabilities
│   ├── team.json                 # 8+ technical partners & surveyors
│   ├── projects.json             # 6+ historic infrastructure case studies
│   ├── testimonials.json         # Client quotes & branding labels
│   ├── community.json            # CSR initiatives
│   └── pages.json                # COMPLETE copywriting for every page key
├── lib/
│   ├── api/                      # Abstracted API endpoints querying local JSON
│   ├── seo/
│   │   └── jsonld.ts             # Rich schema generators (Organization, LocalBusiness, Breadcrumbs, Articles)
│   └── types/
│       └── index.ts              # Global TypeScript strict interfaces
└── public/
    └── brand/                    # High-res master logo/branding assets
```

---

## 🔄 Swapping Mock JSON with a Headless CMS / API

Every component and route across this application pulls text, SEO parameters, arrays, and details from the functions defined inside `lib/api/`. This design guarantees that **zero component or template JSX changes** are required when transitioning from local JSON to a headless CMS (such as Sanity, Strapi, Contentful) or a backend server.

To perform the switch, simply update the return statements inside the files under `lib/api/` to use real `fetch()` calls.

### Example: Swapping Services API
**Before (`lib/api/services.ts`):**
```typescript
import type { Service } from '@/lib/types';
import servicesData from '@/data/services.json';

export async function getServices(): Promise<Service[]> {
  return servicesData as Service[];
}
```

**After (Swapped with dynamic CMS fetch):**
```typescript
import type { Service } from '@/lib/types';

export async function getServices(): Promise<Service[]> {
  const response = await fetch('https://api.yourcms.com/v1/services', {
    headers: {
      'Authorization': `Bearer ${process.env.CMS_API_TOKEN}`
    },
    next: { revalidate: 3600 } // Cache and revalidate hourly
  });
  const data = await response.json();
  return data.items as Service[];
}
```

---

## 🛡️ Strict Compliance & Standards

- **TypeScript (Strict)**: Full type-safety guarantees across layouts, data layers, forms, and page rendering.
- **Form Validation**: Contact form integrated with React Hook Form + Zod, performing comprehensive client-side and server-side validation.
- **Accessibility**: Semantic HTML structures, logical heading flows (`h1` -> `h2` -> `h3`), strict color contrast, and proper descriptive `aria` parameters.
- **JSON-LD & Search Engines**: Custom breadcrumbs lists, article indices, organization data, and map location tags are fully crawlable.
- **Dynamic Site Maps**: All newly authored dynamic slugs in services or projects are immediately injected into `/sitemap.xml` automatically.
