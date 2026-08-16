# SLNB Phase 3 & 4 Implementation Notes

## Phase 3
- JWT-based admin login and protected lead endpoints.
- Session token stored in sessionStorage and expires after 8 hours.
- Admin username/password are environment variables; use a strong password and JWT secret in production.
- Headless CMS adapter added with a safe local-content fallback.
- `CMS_MIGRATION.md` documents the Sanity/Strapi/Contentful migration contract.

## Phase 4
- English/Telugu language switcher with persisted preference.
- Google Analytics 4 and Plausible analytics hooks are enabled when environment variables are configured.
- Floating WhatsApp click-to-chat button.
- JSON-LD RealEstateAgent structured data.
- `robots.txt` and `sitemap.xml` added.
- Canonical, Open Graph and Twitter metadata remain handled by the SEO component.

## Configuration still required
- Production `VITE_SITE_URL` / `SITE_URL`.
- GA4 measurement ID or Plausible domain.
- WhatsApp business number if different from the configured default.
- A real CMS and its API endpoint/token if the company wants external content editing.
- Strong `ADMIN_PASSWORD` and `JWT_SECRET` on the backend.
