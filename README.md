# 👗 Sankalpa's Outfit Manager

A beautiful, modern web application to browse, filter, and choose outfits with style!

## 🚀 Quick Start Guide

### Step 1: Convert HEIC Images to JPG
1. Go to [heictojpg.com](https://heictojpg.com) or [freeconvert.com](https://www.freeconvert.com/heic-to-jpg)
2. Upload all 51 HEIC files from the "Outfits Owned by Sankalpa" folder
3. Download the converted JPG files
4. Replace the HEIC files with the JPG versions (keep the same filenames)

### Step 2: Tag Your Outfits
1. Open VS Code
2. Right-click on `tag-helper.html`
3. Select **"Open with Live Server"**
4. The tagging tool will open in your browser
5. For each outfit:
   - Select **Category** (Tops/Dresses/Sarees/Kurti/One-Piece/Other)
   - Select **Colors** (can select multiple)
   - Select **Style** (Traditional/Formal/Casual)
   - Click **"Save & Next"**
6. Your progress auto-saves! You can close and come back later
7. After tagging all outfits, click **"Download outfits.json"**
8. Save the file in the project folder (replace the sample one)

### Step 3: Launch the Website
1. Right-click on `index.html`
2. Select **"Open with Live Server"**
3. Enjoy browsing your wardrobe! 🎉

## ✨ Features

### 🖼️ Image Gallery
- Beautiful responsive grid layout
- Works perfectly on phone and computer
- Click any outfit to view full-screen
- Swipe gestures on mobile

### 🔍 Smart Filters
- **Category Filter**: Tops, Dresses, Sarees, Kurti, One-Piece
- **Color Filter**: Red, Blue, Green, Black, White, Pink, Yellow, Brown, Orange, Multicolor
- **Style Filter**: Traditional, Formal, Casual
- Combine multiple filters for precise searches
- Real-time gallery updates

### 🎲 Surprise Me!
- Randomly picks an outfit for you
- Respects your active filters
- Avoids recently worn outfits (last 5)
- Beautiful reveal animation

### 💾 Smart Tracking
- Remembers recently worn outfits
- Auto-saves tagging progress
- No data lost if you close the browser

## 📱 Mobile Use

To use on iPhone:
1. Copy the entire "Outfit Decider" folder to iCloud Drive or your iPhone
2. Open `index.html` in Safari
3. Tap the Share button → "Add to Home Screen"
4. Now you have a beautiful app icon!

## 🛠️ Tech Stack

- **HTML5** - Structure
- **Tailwind CSS** - Beautiful styling
- **Vanilla JavaScript** - Fast and simple
- **PhotoSwipe** - Premium image viewer
- **Animate.css** - Smooth animations

## 📁 Project Structure

```
Outfit Decider/
├── index.html           # Main website
├── app.js              # JavaScript logic
├── tag-helper.html     # Tagging tool
├── outfits.json        # Outfit data
└── Outfits Owned by Sankalpa/  # All images
```

## 💡 Tips

- **Add new outfits**: Just add the image to the folder, then tag it using tag-helper.html
- **Delete outfits**: Remove the image and its entry from outfits.json
- **Backup**: Keep a copy of outfits.json - it's your entire wardrobe database!
- **Filters**: Use filters to find outfits for specific occasions

## 🎨 Customization

Want to change colors or add features? The code is fully commented and easy to modify:
- Colors: Edit `colorPalette` in `app.js`
- Animations: Change classes in `index.html`
- Layout: Modify Tailwind classes

## ❓ Troubleshooting

**Images not loading?**
- Make sure you're using Live Server (not just opening the HTML file)
- Check that image filenames in outfits.json match actual files

**Filters not working?**
- Make sure outfits.json is properly formatted
- Check browser console for errors (F12)

**Surprise Me shows nothing?**
- Clear your filters first
- Make sure outfits.json has data

## 🎉 Enjoy!

Made with ❤️ for Sankalpa
