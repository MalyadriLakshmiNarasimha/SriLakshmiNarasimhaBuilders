# SLNB Headless CMS Migration

The frontend now has a CMS adapter (`src/content/contentClient.js`) and a migration manifest. Local content remains the safe fallback until a CMS is provisioned.

## Recommended migration

1. Create a Sanity, Strapi, or Contentful project.
2. Model `Project` with: name, slug/id, description, location, category, status, completionDate, units, amenities, gallery, brochure/floor-plan files, mapEmbedUrl, unitAvailability.
3. Model `BlogPost` with: title, slug/id, excerpt, image, content, author, authorBio, publishedAt.
4. Import the existing `src/data/projectsData.js` records using the field mapping above.
5. Configure `VITE_CMS_API_URL` to an API endpoint returning `{ projects, posts }` from `/site-content`.
6. Keep the local dataset as a fallback during the cutover.

This avoids hard-coding a vendor before the company has selected a CMS and supplied credentials.
