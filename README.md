# Wedding Website Template

A static, minimal, and customisable template for a wedding website built with Next.js. This template is designed to be easily hosted on static hosting platforms like AWS S3, Vercel, or Netlify. It includes password protection, RSVP functionality, and is fully responsive with Tailwind CSS.

## What's Included
- **Next.js Pages-Based App**: Compatible with `next export` for static site generation.
- **Tailwind CSS**: Configured for styling with custom colors and fonts.
- **Pages**: Home, Details, RSVP, and a password-protected entry page.
- **RSVP Form**: Submits to Google Forms and sends confirmation emails via EmailJS.
- **Authentication**: Password-protected site using session storage.
- **Responsive Design**: Designed for mobile with animations from Framer Motion.
- **Static Export**: Ready for deployment to S3 or similar static hosts.

## Quick Start
1. **Clone or Download the Repository**:
   - Ensure you have Node.js installed (version 14 or higher).

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env.local` file in the root directory.
   - Add the following variables (replace placeholders with your actual values):
     ```
     NEXT_PUBLIC_SITE_PASSWORD=your_password_here
     ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   - Open [http://localhost:3000](http://localhost:3000) to view the site.

5. **Build and Export Static Files**:
   ```bash
   npm run export
   ```
   - Static files will be generated in the [`out`](out ) directory.

## Customisation
To personalise the template for your wedding:

1. **Update Wedding Details**:
   - Edit [`constants.js`](constants.js "constants.js") to change names, date, location, etc.:
     ```js
     export const WEDDING_DETAILS = {
       partner1: "Your Name",
       partner2: "Partner's Name",
       initials: "Y & P",
       date: "Your Wedding Date",
       location: "Your Venue Location",
     };
     ```

2. **Customise Venue and Details**:
   - Update the [`CONFIG`](pages/details.js ) object in [`pages/details.js`](pages/details.js "pages/details.js") with your venue information, maps, accommodation links, etc.

3. **Styling**:
   - Modify colors and fonts in [`tailwind.config.cjs`](tailwind.config.cjs "tailwind.config.cjs").
   - Update styles in [`styles/globals.css`](styles/globals.css ) or component files.

4. **RSVP Configuration**:
   - **Setting up Google Forms**:
     1. Go to [Google Forms](https://forms.google.com) and create a new form.
     2. Following my example, add the following fields to match the form (use Short answer, or Multiple choice as appropriate):
        - Name (Short answer)
        - Email (Short answer)
        - Attending (Multiple choice: "Yes", "Sorry, can't make it")
        - Total Guests (Short answer)
        - Additional Guests (Short answer)
        - Dietary Requirements (Short answer)
        - Hotel (Multiple choice: "Yes", "No")
        - Song Request (Short answer)
        - Other (Short answer)
        If you have any extra questions (or want to remove some) please do so, just make sure you follow usages through the code and update as appropriate
     3. Click "Send" and copy the form link. The form ID is the long string in the URL between `/d/e/` and `/viewform` (e.g., `https://docs.google.com/forms/d/e/FORM_ID/viewform`).
     4. Replace `<FORM_ID>` in the `FORM_ENDPOINT` in [`pages/rsvp.js`](pages/rsvp.js "pages/rsvp.js") with your actual form ID.
     5. To find the entry IDs: Right-click on the form page and select "Inspect" (or press F12). In the developer tools, go to the Network tab, submit a test response, and look for the POST request to `formResponse`. The entry IDs are the parameter names like `entry.123456789`.
     6. Update the `ENTRY_ID_MAP` object in [`pages/rsvp.js`](pages/rsvp.js "pages/rsvp.js") to match your form's entry IDs. The keys should remain the same (name, email, etc.), but update the values to your actual entry IDs.
   
   - **Setting up EmailJS for Confirmation Emails**:
     1. Create a new email address that you want your emails to come from (e.g. Partner1Partner2Wedding@gmail.com)
     2. Sign up for a free account at [EmailJS](https://www.emailjs.com).
     3. Go to your dashboard and create a new email service (e.g., connect your Gmail or another email provider).
     4. Create an email template for RSVP confirmations. Use variables like `{{name}}`, `{{email}}`, `{{attending}}`, etc., to personalize the email. Example template:
        ```
        Subject: RSVP Confirmation for [Your Wedding]

        Dear {{name}},

        Thank you for your RSVP! Here are the details you submitted:

        Attending: {{attending}}
        Total Guests: {{total_guests}}
        Additional Guests: {{additional_guests}}
        Dietary Requirements: {{dietary_requirements}}
        Hotel: {{hotel}}
        Song Request: {{song_request}}
        Other: {{other}}

        If you need to make changes, please contact us.

        Best regards,
        [Your Names]
        ```
     5. Note your Service ID, Template ID, and Public Key from the dashboard.
     6. Update the `EMAIL_JS_CONFIG` object in [`pages/rsvp.js`](pages/rsvp.js "pages/rsvp.js") with your actual IDs and key.

5. **Authentication**:
   - Change the password in [`.env.local`](.env.local ) as mentioned above.

## Deployment
1. **Build the Static Site**:
   ```bash
   npm run export
   ```

2. **Host on S3 (Example)**:
   - Upload the contents of the [`out`](out ) directory to an S3 bucket.
   - Enable static website hosting on the bucket (index document: `index.html`, error: `404.html`).
   - Use AWS CLI for upload:
     ```bash
     aws s3 sync out/ s3://your-bucket-name --acl public-read
     ```
   - You will also need to set up the password environment variable where you host. Since this is a static site, the password is embedded at build time. For Vercel or Netlify, set `NEXT_PUBLIC_SITE_PASSWORD` in your project's environment variables in their dashboard. For S3 or manual builds, ensure the `.env.local` file is present during the build process.
   - Optionally, set up CloudFront for HTTPS.
   - You can also set up GitHub actions to do this process automatically (many tutorials available for this online).

3. **Alternative Hosting**:
   - **Vercel**: Connect your GitHub repo and deploy directly.
   - **Netlify**: Drag and drop the [`out`](out ) folder or link your repo.
   - Ensure the hosting platform supports static sites.

## Notes
- The site is password-protected via [`context/AuthContext.js`](context/AuthContext.js "context/AuthContext.js") but if you are hosting it publicly (e.g. via S3) then all information published will still be accessible by those who know what they are doing. The password will stop anyone who happens upon your website from easily reading the details, but for full protection of sensitive information, consider keeping the site private or using server-side authentication (not possible with static hosting). For a wedding website, the client-side password provides reasonable privacy for most use cases.
- RSVP submissions are rate-limited to prevent spam.
- For production, ensure all external links (e.g., maps, accommodation) are updated.
- This template uses `next export`, which generates a fully static site. If you need server-side features, consider deploying to Vercel without export.

Enjoy customising your wedding website! 🎉
