# 🎂 Birthday Website — Setup Guide

## Folder Structure
```
birthday-website/
├── index.html       ← Open this in browser
├── style.css        ← All styles
├── script.js        ← All animations & logic
├── images/          ← Photos go here
│   ├── photo1.jpg   ← Already added ✅
│   ├── photo2.jpg   ← Already added ✅
│   ├── photo3.jpg   ← Already added ✅
│   ├── photo4.jpg   ← Already added ✅
│   ├── photo5.jpg   ← Add more photos here
│   ├── photo6.jpg
│   ├── photo7.jpg
│   └── photo8.jpg
└── music/
    └── birthday.mp3 ← Add your birthday mp3 here
```

## Adding Music
1. Find a birthday / romantic mp3 file
2. Rename it to `birthday.mp3`
3. Place it inside the `music/` folder
4. The 🎵 button on the landing page will play it

## Adding More Photos
- Drop any `.jpg` / `.png` photos into the `images/` folder
- Name them `photo5.jpg`, `photo6.jpg`, etc.
- Update the placeholder gallery items in `index.html`:
  Change `<div class="gallery-item placeholder ...">` to `<div class="gallery-item ..." onclick="openLightbox('images/photo5.jpg')">`

## To Share Online (Free Hosting)
1. **GitHub Pages** — Upload to a GitHub repo, enable Pages
2. **Netlify** — Drag & drop the folder at netlify.com/drop
3. **Vercel** — `vercel deploy` from the folder

## Color Theme
- Lavender: `#c9b8e8`
- Deep Purple: `#9b7fd4`
- Rose Pink: `#f4a8c7`
- Gold: `#e8c97a`
- White: `#ffffff`
