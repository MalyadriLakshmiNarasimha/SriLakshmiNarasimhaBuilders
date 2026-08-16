# SLNB - Admin Posts & Comparison Changes

This version adds an admin-only blog post manager and makes property comparison safer.

## Admin blog posts

Open:

`/admin/posts`

Use the same JWT admin username/password as the existing `/admin/submissions` page.

Features:
- Create/publish a post
- Edit a post
- Delete a post
- Preview before publishing
- Title, excerpt, image, date, category, author, author bio, read time and paragraph content
- Public Blog and Blog Details pages load posts from `GET /api/posts` and fall back to the original local posts if the API is unavailable

The server stores posts in:

`server/data/posts.json`

### Deployment note

The JSON file is suitable for local development and a simple server deployment. On Render, the normal filesystem is not durable across every restart/redeploy unless a persistent disk is configured. For production, use a persistent disk or migrate the post store to a database/CMS.

Netlify does not automatically run this Express `server/` folder as a persistent backend. If the site is deployed to Netlify only, the post CRUD API must be moved to Netlify Functions or an external backend/CMS. Render is the simpler option for this current Express implementation.

## Comparison safety changes

The old project data generated unit sizes from only `category` and `totalUnits`. That means values such as `950-1100 sq.ft` were template-generated rather than verified per building.

This version:
- Removes the `defaultUnitAvailability(category, totalUnits)` generator.
- Stores unit records directly on each project record.
- Does not calculate/copy one building's area into another building.
- Adds `propertyGroupId` to the two Sri Lakshmi Arcade records because they currently have the same name/location and may represent the same physical property.
- Warns when selected records belong to the same property group.
- Shows exact stored area/status/price values.
- Marks the existing unit-area records as `verified: false` so the UI does not present the template values as independently verified measurements.
- Shows exact unit-type matches only when the same unit type exists in another selected property.

**Important:** the ZIP cannot invent the real measurements for your buildings. Replace the `unitAvailability` values with the actual brochure/plan/approved project measurements before treating them as official.
