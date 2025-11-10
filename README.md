# Islamic Centre of Nanaimo - Website

A modern, responsive website for the Islamic Centre of Nanaimo serving the Muslim community in Nanaimo, BC, Canada.

## Project Overview

This is a static website built with HTML, CSS, and vanilla JavaScript that provides information about the Islamic Centre of Nanaimo, including prayer times, services, events, and community resources.

## Features

- **Dynamic Prayer Times**: Fetches real-time prayer times from the Aladhan API for Nanaimo, BC
- **Prayer Time Countdown**: Live countdown to the next prayer
- **Responsive Design**: Mobile-friendly with hamburger menu navigation
- **Service Information**: Comprehensive details about community services
- **Event Calendar**: Upcoming events and programs
- **Donation System**: Integration framework for online donations (Stripe)
- **Contact Forms**: Contact and inquiry forms
- **Ramadan Resources**: Special information and calendar for Ramadan

## Project Structure

```
Nanaimo Masjid Project/
├── Public/
│   ├── index.html              # Homepage with prayer times
│   ├── about.html              # About Us & History
│   ├── services.html           # Community Services
│   ├── contact-us.html         # Contact Information
│   ├── donate.html             # Donation Page
│   ├── friday-prayer.html      # Friday Prayer Times
│   ├── ramadan.html            # Ramadan Information
│   ├── upcoming-events.html    # Events Calendar
│   ├── posts.html              # News & Updates
│   ├── styles/
│   │   └── main.css            # Main stylesheet
│   ├── scripts/
│   │   └── main.js             # JavaScript file (currently empty)
│   ├── images/                 # Image assets
│   │   ├── masjidPhoto.jpg
│   │   └── *.bmp files
│   └── *.pdf                   # Ramadan calendar PDFs
└── README.md                   # This file
```

## Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables, flexbox, and grid
- **JavaScript (ES6+)**: Vanilla JavaScript for interactivity
- **External APIs**: Aladhan API for prayer times
- **CDN Dependencies**:
  - Google Fonts (Poppins, Amiri)
  - Font Awesome 6.0.0
  - Stripe.js (for donations)

## Pages

1. **Homepage (index.html)**: Welcome section, live prayer times, upcoming events
2. **About (about.html)**: History of the centre, facility information
3. **Services (services.html)**: Daily prayers, Jummah, Eid, educational programs, funeral/marriage services
4. **Contact (contact-us.html)**: Contact information and form
5. **Donate (donate.html)**: Donation form with Stripe integration
6. **Friday Prayer (friday-prayer.html)**: Weekly Jummah prayer times
7. **Ramadan (ramadan.html)**: Ramadan programs and calendar
8. **Events (upcoming-events.html)**: Upcoming community events
9. **Posts (posts.html)**: News and announcements

## Design System

### Color Palette
- Primary Blue: `#1a3e5d`
- Islamic Green: `#2d6a4f`
- Accent Gold: `#c5a227`
- Pure White: `#f9f9f9`
- CTA Coral: `#ff6b6b`
- Mist Gray: `#e0e7ec`
- Icon Colors: `#83b7db`

### Typography
- **Body Font**: Poppins (sans-serif)
- **Heading Font**: Amiri (serif)

## Installation & Setup

1. **Clone or Download** the project
2. **Navigate** to the Public folder
3. **Open** index.html in a web browser
4. **No build process required** - this is a static website

### For Development

Simply open the HTML files in your preferred code editor and use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using VS Code Live Server extension
# Right-click on index.html > "Open with Live Server"
```

## Configuration

### Prayer Times API
The website uses the Aladhan API with the following configuration:
- **City**: Nanaimo
- **Country**: Canada
- **Method**: ISNA (Islamic Society of North America)

### Donation Integration
To enable live donations:
1. Sign up for a Stripe account
2. Replace `YOUR_STRIPE_PUBLIC_KEY` in donate.html (line 127) with your actual Stripe public key
3. Set up a backend server to handle payment processing

## Contact Information

- **Address**: 897 Harbourview Street, Nanaimo, BC
- **Email**: info@nanaimomasjid.com
- **Phone**: (123) 456-7890

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Responsive Breakpoints

- Desktop: > 768px
- Mobile/Tablet: ≤ 768px

## Features in Detail

### Prayer Times
- Fetches from Aladhan API
- Converts 24-hour to 12-hour format
- Shows countdown to next prayer
- Updates every second
- Fallback times if API fails

### Navigation
- Sticky header navigation
- Dropdown menus on desktop
- Hamburger menu on mobile
- Smooth animations and transitions

### Styling
- CSS custom properties for theming
- Gradient background overlay
- Card-based layout
- Fade-in animations
- Hover effects

## Future Enhancements

- Backend integration for forms
- Admin panel for content management
- Event calendar with registration
- Prayer time notifications
- Social media integration
- Blog/news system
- Multi-language support (English/Arabic)

## License

Copyright 2025 Islamic Centre of Nanaimo. All rights reserved.

## Contributors

Developed for the Islamic Centre of Nanaimo community.

## Support

For website issues or suggestions, please contact: info@nanaimomasjid.com
