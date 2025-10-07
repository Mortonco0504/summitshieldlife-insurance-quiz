# Deployment Guide

This guide will help you deploy your First Responder Life Insurance Quiz Funnel to various hosting platforms.

## 🚀 Quick Deployment Options

### Option 1: Netlify (Recommended - Free)

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub, GitLab, or email

2. **Deploy from Files**
   - Drag and drop your project folder to Netlify
   - Or use the "Deploy manually" option
   - Your site will be live instantly

3. **Custom Domain (Optional)**
   - Go to Site settings > Domain management
   - Add your custom domain
   - Netlify provides free SSL certificates

### Option 2: Vercel (Free)

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub, GitLab, or Bitbucket

2. **Deploy**
   - Install Vercel CLI: `npm i -g vercel`
   - Run `vercel` in your project directory
   - Follow the prompts

3. **Automatic Deployments**
   - Connect your GitHub repository
   - Every push will trigger a new deployment

### Option 3: GitHub Pages (Free)

1. **Create Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/quiz-funnel.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings > Pages
   - Select source branch (main)
   - Your site will be available at `https://yourusername.github.io/quiz-funnel`

## 🔧 Production Setup

### 1. Update Configuration

Edit `config.js` with your information:
```javascript
contact: {
    phone: 'YOUR-PHONE-NUMBER',
    email: 'your-email@domain.com',
    website: 'your-website.com'
}
```

### 2. Add Analytics

#### Google Analytics
Add to `<head>` in `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

#### Facebook Pixel
Add to `<head>` in `index.html`:
```html
<!-- Facebook Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'FB_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

### 3. Form Integration

Update `script.js` to send data to your server:

```javascript
// Replace the setTimeout in submitForm() with:
fetch('/api/leads', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(quizData)
})
.then(response => response.json())
.then(data => {
    // Handle success
    console.log('Success:', data);
    // Move to thank you page
    hidePage(currentPage);
    currentPage++;
    showPage(currentPage);
    updateProgressBar();
    trackConversion();
})
.catch(error => {
    console.error('Error:', error);
    // Handle error
});
```

## 📧 Email Integration

### Mailchimp
```javascript
function submitToMailchimp(data) {
    const mailchimpUrl = 'https://your-domain.list-manage.com/subscribe/post-json?u=YOUR_USER_ID&id=YOUR_LIST_ID';
    const formData = new FormData();
    formData.append('EMAIL', data.email);
    formData.append('FNAME', data.firstName);
    formData.append('LNAME', data.lastName);
    formData.append('ROLE', data.role);
    formData.append('DEPENDENTS', data.dependents);
    formData.append('INCOME', data.income);
    formData.append('HEALTH', data.health);
    
    return fetch(mailchimpUrl, {
        method: 'POST',
        body: formData
    });
}
```

### ConvertKit
```javascript
function submitToConvertKit(data) {
    const convertkitUrl = 'https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscriptions';
    return fetch(convertkitUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            api_key: 'YOUR_API_KEY',
            email: data.email,
            first_name: data.firstName,
            fields: {
                role: data.role,
                dependents: data.dependents,
                income: data.income,
                health: data.health
            }
        })
    });
}
```

## 🔒 Security Considerations

### HTTPS
- Always use HTTPS in production
- Most hosting platforms provide free SSL certificates
- Update all external links to use HTTPS

### Data Protection
- Don't store sensitive data in localStorage
- Implement proper server-side validation
- Use environment variables for API keys
- Consider GDPR compliance for EU users

### Privacy Policy
Add a privacy policy link to your form:
```html
<p class="privacy-note">
    <i class="fas fa-lock"></i>
    Your information is secure and will only be used to provide you with life insurance quotes.
    <a href="/privacy-policy" target="_blank">Privacy Policy</a>
</p>
```

## 📊 Performance Optimization

### Image Optimization
- Use WebP format for images
- Compress images before uploading
- Consider lazy loading for images

### Code Optimization
- Minify CSS and JavaScript for production
- Enable gzip compression
- Use a CDN for external resources

### Caching
- Set appropriate cache headers
- Use browser caching for static assets
- Consider using a CDN

## 🧪 Testing Checklist

Before going live:

- [ ] Test on multiple devices (desktop, tablet, mobile)
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Verify form submission works
- [ ] Check analytics tracking
- [ ] Test email notifications
- [ ] Verify all links work
- [ ] Check loading speed
- [ ] Test accessibility features
- [ ] Verify SSL certificate
- [ ] Test on slow internet connections

## 🚨 Common Issues

### Form Not Submitting
- Check browser console for errors
- Verify API endpoint is correct
- Ensure CORS is properly configured
- Check network connectivity

### Analytics Not Tracking
- Verify tracking codes are correct
- Check if ad blockers are interfering
- Ensure gtag/fbq functions are available
- Test in incognito mode

### Mobile Issues
- Check viewport meta tag
- Verify touch events work
- Test on actual mobile devices
- Check font sizes are readable

## 📞 Support

If you encounter issues:

1. Check browser console for errors
2. Verify all files are uploaded correctly
3. Test on different browsers/devices
4. Check hosting platform status
5. Review hosting platform documentation

## 🔄 Updates

To update your deployed site:

### Netlify/Vercel
- Push changes to your connected repository
- Automatic deployment will trigger

### Manual Upload
- Upload new files to your hosting platform
- Clear cache if necessary

### GitHub Pages
```bash
git add .
git commit -m "Update quiz funnel"
git push origin main
```

---

**Your quiz funnel is now ready to generate leads! 🎉** 