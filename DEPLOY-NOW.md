# Quick Deployment Checklist

## ✅ Pre-Deployment Setup Complete

### Files Ready for Deployment:
- ✓ `index.html` (password-protected version)
- ✓ `app.js` (gallery logic)
- ✓ `outfits.json` (your outfit data)
- ✓ `Outfits Owned by Sankalpa/` (image folder)
- ✓ `.gitignore` (excludes local dev tools)

### Files Excluded (Local Only):
- `server.py` - Development server
- `tag-helper.html` - Management interface
- `index-local.html` - Non-password version backup
- Backup files

---

## 🚀 Deploy to GitHub Pages

### Step 1: Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial deployment: Outfit Gallery"
```

### Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `outfit-gallery` (or your choice)
3. Set to **Private**
4. Don't initialize with README
5. Click "Create repository"

### Step 3: Push to GitHub
```bash
git remote add origin https://github.com/YOUR-USERNAME/outfit-gallery.git
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to repository Settings
2. Click "Pages" in sidebar
3. Source: Deploy from branch "main"
4. Folder: / (root)
5. Click Save

Wait 1-2 minutes, then visit:
`https://YOUR-USERNAME.github.io/outfit-gallery/`

---

## 🔐 Important: Change Password

**BEFORE deploying**, edit line 56 in `index.html`:

```javascript
const CORRECT_PASSWORD = 'outfitlove2025';  // ← Change this!
```

Pick a strong password and share it only with your wife.

---

## 🔄 Future Updates Workflow

When you add/edit outfits:

1. Use `tag-helper.html` locally (with `server.py` running)
2. Tag/edit outfits (saves to `outfits.json`)
3. Commit and push changes:
   ```bash
   git add outfits.json "Outfits Owned by Sankalpa"
   git commit -m "Update outfits"
   git push
   ```
4. Site updates automatically in 1-2 minutes!

---

## 📱 Share with Your Wife

Send her:
1. Website URL: `https://YOUR-USERNAME.github.io/outfit-gallery/`
2. Password: (whatever you set)

She can bookmark it on her phone for easy access!

---

## ⚠️ Security Note

The password is stored in the HTML file - it's basic protection for convenience. Anyone viewing the page source can see it. For stronger security, consider:
- Netlify with environment variables
- Cloudflare Pages with password protection
- Private hosting with authentication

For this use case (just you and your wife), the current setup is perfectly fine!
