# My Glowfit - Transformation Quiz

This is the quiz website for the weight loss offer, developed with pure HTML, CSS, and JavaScript for maximum performance and ease of editing.

## How to Use

1. **Host the files**: Upload all files in this folder to your server (via FTP or via Netlify/Vercel).
2. **Configure your links**:
   - In `script.js`, customize the logic or the calculation timer if necessary.
   - In `sales.html`, make sure the purchase button link points to your Hotmart checkout.
3. **Capture Leads**: The email capture is set up to log in the console. To integrate with Mailchimp or another platform, you'll need a backend or a simple integration via webhook.

## File Structure

- `index.html`: Main entrance and quiz container.
- `style.css`: Base styles and design system (colors, fonts, spacing).
- `script.js`: Interactive quiz logic, questions, and personalized result generation.
- `sales.html`: Final sales page with personalized diagnosis.
- `app_sales.html`: General app sales page.
- `dashboard.html`: Simulated user dashboard.
- `login.html`: Branded login page.

## Customization

### Colors
You can change the primary colors in `:root` of `style.css`:
- `--primary`: Main brand color (Green).
- `--primary-dark`: Darker variations for hover.

### Email Integration (Mailchimp/ActiveCampaign)
To save captured emails, you can use a service like **Zapier** or **Make** to receive the webhook from the form, or integrate a direct API in the `submitEmail()` function in `script.js`.

### Hotmart Checkout
At the end (`sales.html` and `app_sales.html`), the purchase button points to your Hotmart link. Ensure it is updated with your specific HotLink.

---
Developed by My Glowfit.
