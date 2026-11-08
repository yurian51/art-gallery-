# Mrisho Art Gallery — Product and Experience Design

Date: 2026-11-08
Status: Approved direction
Repository: yurian51/art-gallery-
Implementation branch: improve/mrisho-gallery-premium-2026-11

## Product intent

Build a distinctive, premium African art institution experience for Mrisho Art Gallery. The public site should make discovering, understanding, collecting, and commissioning art feel clear and trustworthy. The private workspaces should support customers, artists, and gallery administrators without pretending that unverified operations or records exist.

## Brand system

- Palette: charcoal #171717, ivory #F7F5F0, muted gold #B89B62, white #FFFFFF, stone #817C73.
- Typography: Cormorant Garamond for expressive editorial headings; Plus Jakarta Sans for interface and body copy; JetBrains Mono only for compact technical metadata where useful.
- Visual language: editorial art direction, generous whitespace, asymmetrical but disciplined grids, large artwork imagery, restrained gold accents, fine rules, quiet transitions, and clear hierarchy.
- Avoid generic SaaS cards, glass effects, neon, gratuitous gradients, decorative AI imagery, and ornamental clutter.
- Use supplied brand and artwork assets. Preserve transparency where assets are intended to sit on varied surfaces. The CEO portrait remains circular.

## Information architecture

### Public experience
- Home: strong gallery identity, featured collection, selected artists, exhibitions, commission invitation, gallery story, and clear contact/visit action.
- Gallery: searchable and filterable artwork catalogue with artwork details and availability states.
- Artists: artist directory and profile pages.
- Exhibitions: current, upcoming, and archived exhibition listings with dates and venue details only when verified.
- Commissions: explain the enquiry process and capture a real enquiry without fabricating prices or availability.
- Journal: editorial articles and gallery updates.
- About: gallery story, leadership, values, and Arusha location.
- Shared navigation, language control (English/Kiswahili), footer, search, favourites, and cart state.

### Private workspaces
- Customer dashboard: profile, saved works, enquiry/order history, and account settings. Show only records actually available to the signed-in customer.
- Artist portal: artist profile, submitted works, submission status, and communications. Restrict all data to the authenticated artist.
- Admin dashboard: overview, artwork catalogue, artist records, exhibitions, enquiries, content, and user/role management. Use real persisted records and enforce role permissions.

## Functional principles

- Inspect and preserve existing React, TypeScript, Vite, routing, and working functionality before changing architecture.
- Reuse shared components, tokens, data contracts, and validation.
- Do not invent artist biographies, artwork provenance, prices, sales, visitor counts, awards, exhibition venues, customer records, payment states, or operational metrics.
- Clearly label seeded demonstration content where it must remain for layout/testing; never present it as verified live gallery information.
- If a backend or integration is absent, show a truthful unavailable/empty state rather than simulated success.
- Forms need validation, accessible labels, useful errors, and clear submission states. Do not claim an enquiry was sent unless persistence confirms it.
- Protect private routes and enforce authorization server-side where a backend exists; hiding a link is not authorization.
- Language switching must change actual interface copy, not just the selected label.

## Quality requirements

- Responsive from narrow mobile through large desktop; no horizontal overflow.
- Semantic landmarks, keyboard navigation, visible focus, accessible contrast, meaningful image alt text, reduced-motion support.
- Optimized images, lazy loading below the fold, stable layout dimensions, and sensible metadata/SEO.
- No broken asset paths, dead links, placeholder actions, console errors, or misleading demo metrics.
- Keep the public gallery usable when private services are unavailable.

## Delivery phases

1. Baseline audit: routes, components, assets, seed data, auth, persistence, build, lint, and current deployment behavior.
2. Foundation and public experience: design tokens, shared shell, responsive navigation, home, and core public pages.
3. Private workspaces: customer, artist, and admin dashboards, with verified authorization and data boundaries.
4. Hardening: accessibility, responsive checks, asset validation, tests, production build, and preview deployment verification.

## Acceptance criteria

- All listed public routes and three private workspaces render coherently on mobile and desktop.
- Brand assets, colors, and typography are consistent throughout.
- Every visible action has a working behavior or an honest disabled/unavailable state.
- No unverified facts are represented as real gallery data.
- No broken images or internal navigation links.
- TypeScript/lint and production build pass; existing tests pass or any pre-existing failures are documented.
- Preview deployment is checked before proposing production promotion.
- Production branch and deployment are not changed without explicit release approval.
