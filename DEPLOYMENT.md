# Outfit Gallery - Deployment Guide

## 📦 What's Included for Deployment

- `index-deploy.html` - Password-protected gallery (rename to `index.html` for GitHub Pages)
- `app.js` - Gallery logic and filters
- `outfits.json` - Your outfit data
- `Outfits Owned by Sankalpa/` - All outfit images

## 🔐 Password Setup

**Default password:** `outfitlove2025`

To change it, edit line 178 in `index-deploy.html`:
```javascript
const CORRECT_PASSWORD = 'your-new-password';
```

## 🚀 Deploy to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Name it: `outfit-gallery` (or anything you like)
3. Set to **Private** (important!)
4. Don't initialize with README
5. Click "Create repository"

### Step 2: Prepare Files

1. Rename `index-deploy.html` to `index.html`
2. Make sure these files are in your project folder:
   - `index.html`
   - `app.js`
   - `outfits.json`
   - `Outfits Owned by Sankalpa/` (folder with images)

### Step 3: Push to GitHub

Open terminal in your project folder and run:

```bash
git init
git add index.html app.js outfits.json "Outfits Owned by Sankalpa"
git commit -m "Deploy outfit gallery"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/outfit-gallery.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Click "Pages" in left sidebar
4. Under "Source", select "main" branch
5. Click "Save"
6. Wait 1-2 minutes

Your site will be live at: `https://YOUR-USERNAME.github.io/outfit-gallery/`

## 🔄 Updating Outfits

When you add/edit outfit tags locally:

1. Use `tag-helper.html` with `server.py` running
2. Tag new outfits (auto-saves to `outfits.json`)
3. Push updated file to GitHub:

```bash
git add outfits.json "Outfits Owned by Sankalpa"
git commit -m "Update outfits"
git push
```

Website updates in 1-2 minutes!

## 🔒 Privacy

✅ Repository is **private** - only you see the code
✅ Site has **password protection**
✅ URL is **not listed** anywhere (only people with link can access)
✅ Even with link, need password to view

## 📱 Sharing with Your Wife

Send her:
1. The website URL: `https://YOUR-USERNAME.github.io/outfit-gallery/`
2. The password: (whatever you set)

She can bookmark it on her phone!

## ⚠️ Important Notes

- Password is stored in the HTML file - anyone viewing page source can see it
- For stronger security, consider using Netlify with environment variables
- The password resets when browser session ends (she'll need to re-enter after closing browser)

## 🛠️ Local Management

Keep using:
- `tag-helper.html` - For tagging/editing
- `server.py` - Run before using tag-helper
- Command: `python server.py`

The deployed version is READ-ONLY for your wife.
