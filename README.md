# Wedding-Template

Static, minimal, and ready for export to S3.

## What's included
- Next.js pages-based app (compatible with `next export`)
- Tailwind CSS configured
- Simple pages: Home, Our Story, Details, RSVP, Registry
- RSVP form wired to post to an external form endpoint (replace `FORM_ENDPOINT` in `pages/rsvp.js`)

## Quick start
1. Install dependencies:
```bash
npm install
```

2. Run dev server:
```bash
npm run dev
# open http://localhost:3000
```

3. Build and export static files to `out/`:
```bash
npm run export
```

4. Deploy to S3 (one-off). Example using AWS CLI (replace `your-bucket`):
```bash
aws s3 sync out/ s3://your-bucket --acl public-read
```

5. Configure the S3 bucket for static website hosting (index document `index.html`, error `404.html`).
   Optionally put the bucket behind CloudFront for HTTPS.

## Notes
- The RSVP form posts to Formspree (placeholder URL). Sign up for Formspree or Getform and replace the endpoint in `pages/rsvp.js`.
- Images in `/public` are placeholders; replace with your photos.
- This project uses `next export` which generates a fully static site in `out/`.

Enjoy — and congrats 🎉
