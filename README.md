# Pour Choice Taphouse Website

A modern, mobile-first website for Pour Choice Taphouse located at 1225 N Mills Ave, Orlando, FL 32803.

## Features

- 🍺 **Live Beer Menu** - Integrated with Untappd for Business (Venue ID: 42359)
- 📸 **Instagram Feed** - Real-time feed via LightWidget
- 🗺️ **Google Maps** - Embedded location map with directions
- 📱 **Fully Responsive** - Mobile-first design
- 🔞 **Age Gate** - 21+ verification modal
- ⚡ **Static Site** - Fast loading, no server required

## Tech Stack

- HTML5
- CSS3 (Custom properties, Flexbox, Grid)
- Vanilla JavaScript (ES6+)
- Google Fonts (Bebas Neue, Source Sans 3)

## Deployment

This site is designed to be deployed on any static hosting platform:

### Netlify
1. Connect this repository to Netlify
2. Deploy settings:
   - Build command: (leave empty)
   - Publish directory: `/`
3. Deploy!

### Vercel
1. Import this repository
2. Framework preset: Other
3. Deploy!

## File Structure

```
/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles
├── js/
│   └── script.js       # Age gate, navigation, etc.
├── images/             # Image assets (add your own)
└── README.md
```

## Customization

### Update Hours
Edit the hours in `index.html` in the Hours section (search for `hours__time`).

### Update Contact Info
Search for `TODO:` comments in `index.html` to find:
- Email address
- Phone number
- Social media links

### Replace Images
- Hero background: Update URL in `.hero__background` style
- Add logo: Uncomment and update `hero__logo-img` in hero section
- Favicon: Add to `/images/favicon.ico`

## License

© 2025 Pour Choice Taphouse. All rights reserved.


