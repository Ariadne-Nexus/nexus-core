# Custom Domain Setup: ariadnenexus.com

## Current Status
- **Domain**: ariadnenexus.com
- **Registrar**: Vercel
- **Nameservers**: Vercel (managed)
- **Edge Network**: Active ✓
- **DNS Records**: Pending configuration
- **SSL Certificates**: Pending verification
- **Current Deployment**: https://avidelta.vercel.app

---

## Setup Instructions

### Step 1: Add SSL Certificate TXT Records (Required First)

Go to the Vercel DNS dashboard:
https://vercel.com/dotlink-ops/domains/ariadnenexus.com

Click "Add Record" and create TWO TXT records:

**Record 1:**
```
Type:  TXT
Name:  _acme-challenge
Value: Y0qf9I_ESbgw4glqJXCGDxTdQU2bQGs5uXHdvkgLdEM
TTL:   Auto
```

**Record 2:**
```
Type:  TXT
Name:  _acme-challenge
Value: ft61UemhcP3snCv-JrQm-kCXyTtWmYQm13YEw8SrW-Q
TTL:   Auto
```

⏱️ **Wait 5-10 minutes for DNS propagation**

Verify with:
```bash
dig _acme-challenge.ariadnenexus.com TXT +short
```

---

### Step 2: Verify SSL Certificates

Go to the Vercel Domains settings:
https://vercel.com/dotlink-ops/nextjs/settings/domains

1. Find "ariadnenexus.com" in the list
2. Click the "Verify" button
3. Status should change to "Valid" ✓

---

### Step 3: Add Domain Records (After SSL Verified)

Return to the DNS dashboard:
https://vercel.com/dotlink-ops/domains/ariadnenexus.com

Add these records:

**A Record (Root Domain):**
```
Type:  A
Name:  @ (or leave blank for root)
Value: 76.76.21.21
TTL:   Auto
```

**CNAME Record (WWW Subdomain):**
```
Type:  CNAME
Name:  www
Value: cname.vercel-dns.com
TTL:   Auto
```

⏱️ **Wait 5-30 minutes for DNS propagation**

---

### Step 4: Verify DNS Propagation

Run these commands to check:

```bash
# Check A record (should return 76.76.21.21)
dig ariadnenexus.com A +short

# Check CNAME (should return cname.vercel-dns.com)
dig www.ariadnenexus.com CNAME +short

# Test HTTPS
curl -I https://ariadnenexus.com

# Test API endpoint
curl https://ariadnenexus.com/api/health
```

---

### Step 5: Update Application Configuration

Once DNS is verified and working, update these files:

**Files to update:**

1. **app/layout.tsx** (line 24)
   - Change: `https://avidelta.vercel.app`
   - To: `https://ariadnenexus.com`

2. **app/sitemap.ts** (line 4)
   - Change: `https://avidelta.vercel.app`
   - To: `https://ariadnenexus.com`

3. **app/robots.ts** (line 12)
   - Change: `https://avidelta.vercel.app/sitemap.xml`
   - To: `https://ariadnenexus.com/sitemap.xml`

4. **README.md**
   - Update all references to avidelta.vercel.app

5. **project.config**
   - Update homepage and API URLs

---

## Expected Final DNS Configuration

```
ariadnenexus.com.                     A      76.76.21.21
www.ariadnenexus.com.                 CNAME  cname.vercel-dns.com
_acme-challenge.ariadnenexus.com.     TXT    Y0qf9I_ESbgw4glqJXCGDxTdQU2bQGs5uXHdvkgLdEM
_acme-challenge.ariadnenexus.com.     TXT    ft61UemhcP3snCv-JrQm-kCXyTtWmYQm13YEw8SrW-Q
```

---

## Quick Reference

### Vercel Dashboard URLs
- **Project**: https://vercel.com/dotlink-ops/nextjs
- **Domains**: https://vercel.com/dotlink-ops/nextjs/settings/domains
- **DNS**: https://vercel.com/dotlink-ops/domains/ariadnenexus.com

### DNS Records Summary
| Type | Name | Value |
|------|------|-------|
| TXT | _acme-challenge | Y0qf9I_ESbgw4glqJXCGDxTdQU2bQGs5uXHdvkgLdEM |
| TXT | _acme-challenge | ft61UemhcP3snCv-JrQm-kCXyTtWmYQm13YEw8SrW-Q |
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

---

## Troubleshooting

### Issue: DNS Not Propagating
**Solution**: Wait 5-30 minutes, check with `dig` commands above

### Issue: SSL Certificate Error
**Solution**: Verify both TXT records are present, click "Verify" in Vercel

### Issue: 404 Not Found
**Solution**: Ensure A/CNAME records point to correct Vercel IPs

### Issue: Redirect Loop
**Solution**: Check Vercel domain settings, ensure only one domain is primary

---

## Setup Checklist

- [ ] Add TXT record 1 in Vercel Dashboard
- [ ] Add TXT record 2 in Vercel Dashboard
- [ ] Wait 5-10 minutes for propagation
- [ ] Click "Verify" in Vercel Domains settings
- [ ] Verify SSL certificate status shows "Valid"
- [ ] Add A record for root domain (@)
- [ ] Add CNAME record for www subdomain
- [ ] Wait 5-30 minutes for DNS propagation
- [ ] Test: `dig ariadnenexus.com A +short`
- [ ] Test: `curl -I https://ariadnenexus.com`
- [ ] Update app/layout.tsx with new domain
- [ ] Update app/sitemap.ts with new domain
- [ ] Update app/robots.ts with new domain
- [ ] Update README.md documentation
- [ ] Update project.config URLs
- [ ] Commit and push changes
- [ ] Verify production deployment
- [ ] Test all API endpoints on new domain

---

## Post-Setup Verification

After DNS propagation and application updates, verify:

```bash
# Test main domain
curl -I https://ariadnenexus.com

# Test API endpoints
curl https://ariadnenexus.com/api/health
curl https://ariadnenexus.com/api/status | jq
curl https://ariadnenexus.com/api/daily-summary | jq

# Test WWW redirect
curl -I https://www.ariadnenexus.com

# Test sitemap
curl https://ariadnenexus.com/sitemap.xml

# Test robots.txt
curl https://ariadnenexus.com/robots.txt
```

All endpoints should return 200 OK responses.
