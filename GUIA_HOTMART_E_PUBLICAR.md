# Publishing and Hotmart Integration Guide

This guide explains how to put the **My Glowfit** website online and connect the Hotmart payment button.

## 1. Connecting to Hotmart

### Step 1: Create the Product
1. Create an account on [Hotmart](https://hotmart.com).
2. Go to **Products > Register Product**.
3. Choose **"Online Course"** or **"Subscription"** (depending on your strategy).
4. Fill in the details:
   - **Name:** My Glowfit Premium
   - **Description:** Lifetime access to the wellness application...
   - **Price:** Set the value (e.g., €24.99).

### Step 2: Get the Checkout Link (HotLink)
1. After creating the product, go to **Products > I am a Creator**.
2. Click on the **My Glowfit** product.
3. Go to **Disclosure Links (HotLinks)**.
4. Copy the link for the **"Hotmart Payment Page"** (e.g., `https://pay.hotmart.com/G104412194U`).

### Step 3: Update the Website
1. Your HotLink should already be updated in the `sales.html` and `app_sales.html` files if you provided it during the session. If not, open the files and search for:
   ```html
   <a href="https://pay.hotmart.com/..." target="_blank" ...
   ```
2. Replace it with **YOUR HotLink** that you copied from the Hotmart dashboard.

---

## 2. Publishing the Website on the Internet (Free Hosting)

The easiest and most professional way is to use **Netlify**.

### Step 1: Prepare the files
1. Make sure all your files (`index.html`, `style.css`, images, etc.) are in the `quiz emagrecimento` folder.

### Step 2: Upload to Netlify
1. Go to [netlify.com](https://www.netlify.com) and create a free account.
2. After logging in, you will see an area called **"Sites"**.
3. Simply **drag and drop your site folder** (the entire `quiz emagrecimento` folder) into the dotted area in the browser.
4. Netlify will upload the site and give you a link (e.g., `my-glowfit-test.netlify.app`).

### Step 3: Configure Domain (Optional)
1. In Netlify, go to **Site settings > Domain management**.
2. You can buy a domain (e.g., `myglowfit.com`) or connect one you already own.

---

## 3. Delivering Access to the Customer

Since your "App" (`dashboard.html`) is actually a protected web page, you have a few options to deliver access after the purchase on Hotmart:

### Simple Option (Hotmart Club):
1. Host the content (videos, PDFs with diets) within the Hotmart member area.
2. The customer buys and receives automatic access via email.

### "Web App" Option (Advanced):
1. Configure an automatic **welcome email** on Hotmart ("Content Delivery via email").
2. In that email, put the link to your Dashboard (the Netlify link/dashboard.html) and a generic access password.
   * *Note:* The current login system in `login.html` is visual (simulated). Any email/password will work. To truly protect it, you would need a backend developer to create a database.
   * **To start fast:** Simply deliver the Dashboard link as if it were an "Exclusive Portal".

---

**Summary:**
1. Create product on Hotmart -> Get the Link.
2. Place the Link in the HTML purchase buttons.
3. Drag the folder to Netlify to put the site live.
4. Promote your site link!
