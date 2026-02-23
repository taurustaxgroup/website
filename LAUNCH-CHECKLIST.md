# 🚀 Taurus Tax Group Website - Launch Checklist

## Pre-Launch Tasks

### 1. Contact Information ⚠️ REQUIRED
- [ ] Update email address in all 8 HTML files
- [ ] Update phone number in all 8 HTML files
- [ ] Add physical address in all 8 HTML files
- [ ] Confirm business hours are correct
- [ ] Update JSON-LD structured data in `index.html` with real address

**Where to update:**
- Footer section in all HTML pages
- Contact page info section (`contact.html`)
- JSON-LD schema in `index.html` (line ~48)

---

### 2. Client Portal ⚠️ REQUIRED
- [ ] Replace placeholder `#` link with actual SafeSend portal URL
- [ ] Test portal link works correctly
- [ ] Update portal access instructions if needed

**File:** `contact.html` (line ~137)

---

### 3. Assets
- [ ] Replace `assets/favicon.png` with actual 32x32 or 64x64 favicon
- [ ] Verify `Logo-removebg-preview.png` displays correctly
- [ ] Optional: Add team headshot photos to replace initials

---

### 4. Domain & Hosting
- [ ] Register domain name (if not already done)
- [ ] Set up web hosting account
- [ ] Update all instances of `https://taurustaxgroup.com` with your actual domain
- [ ] Upload all files maintaining folder structure
- [ ] Set `index.html` as the default homepage

**Files with domain references:**
- All HTML files (Open Graph meta tags)
- `index.html` (JSON-LD structured data)

---

### 5. Forms & Backend
- [ ] Decide on form handling solution:
  - [ ] Use Netlify Forms (free, easy)
  - [ ] Use Formspree or similar service
  - [ ] Set up custom backend
- [ ] Update form `action` attribute if using backend
- [ ] Test form submission and email delivery
- [ ] Set up email notifications for new inquiries

---

### 6. Analytics & Tracking (Optional)
- [ ] Set up Google Analytics 4
- [ ] Add tracking code to all HTML files (before `</head>`)
- [ ] Set up Google Search Console
- [ ] Create and submit XML sitemap
- [ ] Set up Google Business Profile

---

### 7. Testing

#### Functionality Testing
- [ ] Click all navigation links on all pages
- [ ] Test mobile hamburger menu
- [ ] Submit contact form with valid/invalid data
- [ ] Test all email/phone links (tel: and mailto:)
- [ ] Verify all anchor links work (#schedule, #client-portal, etc.)

#### Cross-Browser Testing
- [ ] Test in Chrome/Edge
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test on mobile devices (iOS/Android)

#### Responsive Testing
- [ ] Test at 375px (mobile)
- [ ] Test at 768px (tablet)
- [ ] Test at 1440px (desktop)
- [ ] Check that all text is readable
- [ ] Verify images scale properly

#### Content Review
- [ ] Proofread all pages for typos
- [ ] Verify all service descriptions are accurate
- [ ] Check team member names and titles
- [ ] Review legal pages (privacy, terms)
- [ ] Ensure all CTAs point to correct pages

---

### 8. SEO & Performance

#### SEO
- [ ] Verify all page titles are unique and descriptive
- [ ] Check meta descriptions on all pages
- [ ] Ensure Open Graph tags are correct
- [ ] Add real business address to structured data
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Business Profile

#### Performance
- [ ] Run Google PageSpeed Insights
- [ ] Compress images if needed
- [ ] Test page load time
- [ ] Verify HTTPS is enabled (SSL certificate)

---

### 9. Legal & Compliance
- [ ] Review privacy policy for accuracy
- [ ] Review terms of service
- [ ] Ensure GDPR compliance (if applicable)
- [ ] Add cookie notice if using cookies/analytics
- [ ] Verify all disclaimers are appropriate

---

### 10. Final Checks Before Going Live

- [ ] Backup all files locally
- [ ] Remove any test/placeholder content
- [ ] Check that no "Lorem ipsum" text remains
- [ ] Verify copyright year is correct (2026)
- [ ] Test all external links
- [ ] Set up automatic backups on hosting
- [ ] Set up domain email (contact@taurustaxgroup.com)
- [ ] Create email signature with website link

---

## Post-Launch Tasks

### Week 1
- [ ] Monitor form submissions
- [ ] Check analytics for traffic
- [ ] Fix any reported issues
- [ ] Share website on social media
- [ ] Update email signatures with website URL
- [ ] Add website to all business materials

### Month 1
- [ ] Review analytics data
- [ ] Gather client feedback
- [ ] Make minor content updates as needed
- [ ] Start planning blog/resources section (optional)

---

## Quick Links

- **Test Locally:** Open `index.html` in browser
- **CSS:** `css/styles.css`
- **JavaScript:** `js/main.js` and `js/forms.js`
- **README:** See `README.md` for full documentation

---

## Need Help?

1. Review code comments (marked with `<!-- UPDATE:`)
2. Check `README.md` for detailed information
3. Test one page at a time
4. Use browser DevTools to debug issues

---

**Status:** 🟡 Ready for customization → 🟢 Ready to launch

Once all checkboxes are complete, you're ready to go live! 🎉
