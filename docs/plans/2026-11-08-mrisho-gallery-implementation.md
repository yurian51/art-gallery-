# Mrisho Art Gallery Production Implementation Plan

> **For agentic workers:** Use the host's available task-by-task implementation workflow. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing React/Vite gallery into a trustworthy, responsive public gallery and role-specific workspace without fabricated commerce, identity, exhibition, or provenance records.

**Architecture:** Preserve the current React 19, TypeScript, Vite, Tailwind 4, and context-based application. Make the existing client-only limitations explicit, remove simulated transactions and fake operational records, improve browser navigation and shared presentation, and add automated quality checks. Do not introduce a backend or payment provider that the repository does not already contain.

**Tech Stack:** React 19, TypeScript 7, Vite 8, Tailwind CSS 4, Node.js test runner, Vercel preview build gate.

## Global Constraints

- Keep work on `improve/mrisho-gallery-premium-2026-11`; do not modify `main`, merge the pull request, or promote production.
- Preserve the existing application architecture and current working routes.
- Use the gallery palette: charcoal `#171717`, ivory `#F7F5F0`, muted gold `#B89B62`, white, and stone `#817C73`.
- Use supplied brand/art assets only; do not generate fake gallery records, sales, artists, prices, provenance, event attendance, payment confirmations, or tracking numbers.
- No third-party brand names in source code, comments, UI, filenames, or project documentation.
- No action may claim persistence, payment, authentication, authorization, or submission unless the repository contains a real implementation that confirms it.
- Keep customer, artist, and admin views distinct, but clearly disclose that the current app has no server authentication or role enforcement.
- Preserve English and Kiswahili support and make route navigation work with browser history and direct URLs.
- Do not claim a build, test, deployment, or production change without fresh verification.

---

### Task 1: Remove fabricated business and transaction state

**Files:**
- Modify: `src/context/AppContext.tsx`
- Modify: `src/components/cart/CheckoutModal.tsx`
- Modify: `src/components/common/RoleSwitcherModal.tsx`
- Modify: `src/components/account/CustomerDashboard.tsx`
- Modify: `src/components/artist-portal/ArtistDashboard.tsx`
- Modify: `src/components/admin/AdminDashboard.tsx`
- Modify: `src/data/seedData.ts`

**Interfaces:**
- Preserve exported `AppProvider`, `useApp`, and the existing `AppContextType` consumer contract unless a field is removed from all call sites in this task.
- Keep `Order`, `CommissionRequest`, and `AuditLog` types for future API integration, but initialize records as empty until real data is connected.
- Checkout must not call `placeOrder` or mutate artwork ownership without a verified payment response.

- [ ] Replace seeded customer orders, commission requests, audit logs, and default favourites with empty state; safely parse persisted browser values and recover from malformed JSON without crashing.
- [ ] Remove prefilled personal customer details and payment credentials from checkout.
- [ ] Replace the simulated payment timeout, generated transaction references, automatic PAID status, fake courier tracking, and fabricated provenance transfer with an honest unavailable-payment state and a clear enquiry path.
- [x] Label role switching as a local interface preview, not authentication or access control.
- [ ] Ensure customer, artist, and admin dashboards show explicit empty/unconnected states instead of invented accounts, orders, balances, sales, audit events, or approvals.
- [ ] Keep demo catalogue content from being described as authenticated, verified, purchasable, or live inventory.

**Verification:** inspect all call sites of `placeOrder`, `submitCommission`, and `submitArtwork`; verify no checkout path creates a paid order; run TypeScript and production build.

### Task 2: Make browser navigation and persistence reliable

**Files:**
- Modify: `src/context/AppContext.tsx`
- Modify: `src/App.tsx`
- Modify: `src/components/common/Header.tsx`

**Interfaces:**
- Keep `navigateTo(route: string): void` as the navigation entry point.
- Keep `currentRoute: string` synchronized with `window.location.pathname`.
- Preserve current route component mapping in `MainContent`.

- [ ] Initialize route state from the browser pathname, normalize trailing slashes, and fall back to the home route for unknown paths.
- [x] Update the URL with `history.pushState` for in-app navigation and subscribe to `popstate` for Back/Forward.
- [ ] Ensure direct loads and page refreshes render the correct route.
- [x] Close the mobile navigation when Escape is pressed or the user taps outside the open menu.
- [x] Add active navigation semantics with `aria-current` and visible keyboard focus.

**Verification:** inspect every route in `App.tsx`; test route normalization, browser history behavior, and mobile menu close behavior; run lint and build.

### Task 3: Repair metadata, assets, and baseline accessibility

**Files:**
- Modify: `index.html`
- Modify: `src/index.css`
- Modify: image path usage in `src/data/seedData.ts` and consuming components where required.

**Interfaces:**
- Preserve the current Vite asset pipeline and imported image modules.
- Keep existing brand assets under `public/assets/aistudio/`.

- [ ] Remove invalid trailing commas from the JSON-LD script and remove unsupported claims about blockchain verification and international marketplace services.
- [ ] Add canonical-safe title/description, theme color, and social metadata grounded in the gallery's actual known identity and Arusha location.
- [x] Audit source files and remove all runtime `/src/assets/images/` string paths.
- [x] Add global focus-visible, reduced-motion, and responsive image defaults without overriding component-specific layout.
- [ ] Verify footer logo presentation on charcoal without a white rectangular backing, while retaining image contrast and transparency.

**Verification:** parse JSON-LD as JSON, audit all referenced assets against repository paths, inspect mobile overflow and keyboard focus, run lint and build.

### Task 4: Rebuild the home experience with editorial hierarchy

**Files:**
- Modify: `src/components/home/HeroSection.tsx`
- Modify: `src/components/home/CuratedFeatures.tsx`
- Modify: `src/components/common/Header.tsx`
- Modify: `src/components/common/Footer.tsx`

**Interfaces:**
- Consume current `useApp()` values and `translations`; do not add new backend dependencies.
- Keep existing navigation routes and artwork inspection actions.

- [ ] Refine the hero into a premium, responsive editorial composition with a clear gallery proposition and working Gallery/About calls to action.
- [ ] Remove unverified “masterwork”, acquisition, curator selection, provenance, shipping, visitor-hours, and exhibition claims.
- [ ] Build sections that gracefully render when artwork, artists, exhibitions, and journal collections are empty.
- [ ] Use consistent spacing, typography, image ratios, and restrained gold accents.
- [ ] Ensure header and footer are visually coherent at mobile, tablet, and desktop widths.

**Verification:** inspect every conditional empty state; test all home CTAs and header/footer navigation; run lint and build.

### Task 5: Make public catalogue and editorial pages truthful

**Files:**
- Modify: `src/components/gallery/GalleryView.tsx`
- Modify: `src/components/gallery/ArtworkCard.tsx`
- Modify: `src/components/gallery/ArtworkDetailModal.tsx`
- Modify: `src/components/artists/ArtistsView.tsx`
- Modify: `src/components/exhibitions/ExhibitionsView.tsx`
- Modify: `src/components/journal/JournalView.tsx`
- Modify: `src/components/commissions/CommissionPortal.tsx`
- Modify: `src/components/about/AboutView.tsx`

**Interfaces:**
- Preserve current `Artwork`, `Artist`, `Exhibition`, and `JournalArticle` view contracts.
- Keep the supplied CEO profile and Arusha location as the only specifically confirmed leadership/location facts.

- [x] Add designed empty states for unavailable catalogue, artist, exhibition, and journal records.
- [ ] Remove unverified badges, authenticity language, venue claims, curator claims, and hard-coded fake counts from public pages.
- [x] Ensure commission, contact, and RSVP forms do not claim a message was delivered when there is no server endpoint.
- [ ] Retain the circular CEO portrait and accurate gallery identity/location.
- [ ] Fix share and image behavior when browser APIs or image sources are unavailable.

**Verification:** check all pages with empty collections and with sample records; test form failure/success semantics; run lint and build.

### Task 6: Make the three workspaces honest and role-aware

**Files:**
- Modify: `src/components/account/CustomerDashboard.tsx`
- Modify: `src/components/artist-portal/ArtistDashboard.tsx`
- Modify: `src/components/admin/AdminDashboard.tsx`
- Modify: `src/components/common/RoleSwitcherModal.tsx`
- Modify: `src/context/AppContext.tsx`

**Interfaces:**
- Keep the three existing dashboard route components.
- Use current client-side role state only as a presentation preview; do not treat it as authorization.

- [ ] Add consistent dashboard shell, page title, navigation, status messaging, and empty states.
- [ ] Remove fabricated financial, customer, artist, approval, and audit metrics.
- [x] Show a clear notice that secure sign-in and server-side role permissions are not configured.
- [ ] Prevent dashboard actions from claiming records were persisted or approved when the only state is browser memory/local storage.
- [ ] Ensure the UI remains useful and responsive with zero records.

**Verification:** render each dashboard for each relevant local role preview; assert zero-record states; run lint and build.

### Task 7: Add automated repository quality gates

**Files:**
- Modify: `package.json`
- Create: `scripts/quality-check.test.mjs`
- Modify: Vercel build command in `package.json`

**Interfaces:**
- Add `npm run test` backed by Node's built-in test runner or a deterministic quality script that needs no new runtime dependency.
- The Vercel preview build runs install, test, TypeScript checks, and production bundling for each branch commit.

- [x] Add automated checks for prohibited brand text, JSON-LD validity, broken runtime asset paths, simulated payment success, role preview claims, local-only forms, provenance placeholders, and route fallback.
- [x] Run the quality gate through the Vercel build because GitHub Actions jobs were created without an assigned runner in this repository environment.
- [x] Make `npm run build` execute `npm test`, `npm run lint`, and `vite build` in sequence.
- [x] The Vercel build exits non-zero when tests, TypeScript, or the production bundle fails.

**Verification:** latest Vercel preview build passed 13 automated tests, `tsc --noEmit`, and `vite build` for commit `7630372fa797a0cceb3ee2adfbe5f85b6e2753ca`.

### Task 8: Verify preview deployment and review the complete diff

**Files:**
- Review all changed files in this plan.
- No production deployment configuration changes unless required to make the preview build pass.

**Interfaces:**
- Use the existing pull request and Vercel preview deployment.
- Do not merge or promote production.

- [ ] Inspect the final diff for accidental unrelated edits, fabricated facts, insecure role claims, and prohibited text.
- [ ] Verify GitHub Actions and the Vercel preview deployment from their latest run records.
- [ ] Verify direct URLs for all public and dashboard routes and mobile layout.
- [ ] Record exact commit, CI result, preview deployment state, and any remaining blockers.

**Verification:** all configured CI checks pass and Vercel reports a ready preview for the exact feature-branch commit; otherwise report the exact failure and stop.
