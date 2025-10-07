# Domain Configuration Guide for veteranvalorlifeinsurance.com

## 🌐 Domain Setup Overview

This guide will help you configure veteranvalorlifeinsurance.com to point to your Veteran Valor Life Insurance quiz funnel.

## 🚀 Recommended Hosting Options

### Option 1: Netlify (Recommended - Free)

**Step 1: Deploy to Netlify**
1. Go to [netlify.com](https://netlify.com) and create an account
2. Drag and drop your project folder to Netlify
3. Your site will be live with a random URL like `https://amazing-site-123456.netlify.app`

**Step 2: Configure Custom Domain**
1. In your Netlify dashboard, go to Site settings > Domain management
2. Click "Add custom domain"
3. Enter: `veteranvalorlifeinsurance.com`
4. Netlify will provide DNS records to configure

**Step 3: Configure DNS Records**
In your domain registrar (where you bought veteranvalorlifeinsurance.com), add these DNS records:

```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site-name.netlify.app
```

### Option 2: Vercel (Free)

**Step 1: Deploy to Vercel**
1. Go to [vercel.com](https://vercel.com) and create an account
2. Install Vercel CLI: `npm i -g vercel`
3. Run `vercel` in your project directory
4. Follow the prompts

**Step 2: Configure Custom Domain**
1. In Vercel dashboard, go to your project
2. Click "Settings" > "Domains"
3. Add `veteranvalorlifeinsurance.com`
4. Configure DNS records as provided by Vercel

### Option 3: GitHub Pages (Free)

**Step 1: Push to GitHub**
```bash
git add .
git commit -m "Deploy Veteran Valor Life Insurance quiz"
git push origin main
```

**Step 2: Enable GitHub Pages**
1. Go to your repository Settings > Pages
2. Select source branch (main)
3. Save

**Step 3: Configure Custom Domain**
1. In Pages settings, enter `veteranvalorlifeinsurance.com`
2. Create a file called `CNAME` in your repository root with:
   ```
   veteranvalorlifeinsurance.com
   ```

## 🔧 DNS Configuration

### Required DNS Records

**For Netlify:**
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site-name.netlify.app
```

**For Vercel:**
```
Type: A
Name: @
Value: 76.76.19.76

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**For GitHub Pages:**
```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153

Type: CNAME
Name: www
Value: yourusername.github.io
```

## 📧 Email Configuration

### Professional Email Setup

**Option 1: Google Workspace**
1. Go to [workspace.google.com](https://workspace.google.com)
2. Sign up for Google Workspace
3. Add your domain: `veteranvalorlifeinsurance.com`
4. Configure MX records as provided by Google

**Option 2: Microsoft 365**
1. Go to [microsoft365.com](https://microsoft365.com)
2. Sign up for Microsoft 365 Business
3. Add your domain
4. Configure DNS records as provided

### Email DNS Records (Google Workspace Example)
```
Type: MX
Name: @
Value: 1 aspmx.l.google.com
Value: 5 alt1.aspmx.l.google.com
Value: 5 alt2.aspmx.l.google.com
Value: 10 alt3.aspmx.l.google.com
Value: 10 alt4.aspmx.l.google.com

Type: TXT
Name: @
Value: v=spf1 include:_spf.google.com ~all
```

## 🔒 SSL Certificate

All recommended hosting providers (Netlify, Vercel, GitHub Pages) provide free SSL certificates automatically. Your site will be accessible at:
- `https://veteranvalorlifeinsurance.com`
- `https://www.veteranvalorlifeinsurance.com`

## 📱 Testing Your Domain

After configuration:
1. Wait 24-48 hours for DNS propagation
2. Test your domain: `https://veteranvalorlifeinsurance.com`
3. Test www version: `https://www.veteranvalorlifeinsurance.com`
4. Test form submissions work correctly
5. Verify email notifications are received

## 🎯 SEO Optimization

### Update Meta Tags
Add these to your `index.html` head section:
```html
<meta name="description" content="Veteran Valor Life Insurance - Get personalized life insurance quotes for veterans. Coverage up to $2M, no medical exam required.">
<meta name="keywords" content="veteran life insurance, military life insurance, veteran insurance quotes, life insurance for veterans">
<meta property="og:title" content="Veteran Valor Life Insurance">
<meta property="og:description" content="Get personalized life insurance quotes for veterans. Coverage up to $2M, no medical exam required.">
<meta property="og:url" content="https://veteranvalorlifeinsurance.com">
```

### Google Analytics Setup
Add your Google Analytics tracking code to track conversions and leads.

## 🚨 Important Notes

1. **DNS Propagation**: Changes can take 24-48 hours to fully propagate
2. **SSL Certificate**: Will be automatically provisioned by your hosting provider
3. **Email Setup**: Configure professional email before going live
4. **Testing**: Test thoroughly before sharing the domain publicly
5. **Backup**: Keep a backup of your current working version

## 📞 Support

If you need help with domain configuration:
- **Netlify Support**: [docs.netlify.com](https://docs.netlify.com)
- **Vercel Support**: [vercel.com/docs](https://vercel.com/docs)
- **GitHub Pages**: [pages.github.com](https://pages.github.com)

Your Veteran Valor Life Insurance quiz funnel will be live at `https://veteranvalorlifeinsurance.com` once configured! 