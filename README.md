# Islamic Centre of Nanaimo Website

Static website for the Islamic Centre of Nanaimo built with HTML, CSS, and vanilla JavaScript.

## Current Focus

The site is designed around the pages visitors need most:

- Homepage with live prayer times
- Dedicated `Programs` page
- Distinct `Sheikh's Corner` section inside the Programs page
- Clean mobile navigation and large tap targets
- Supporting pages for services, about, Friday prayer, contact, donations, Ramadan, events, and updates

## Project Structure

```text
Nanaimo Masjid Project/
|-- index.html
|-- programs.html
|-- about.html
|-- services.html
|-- contact-us.html
|-- friday-prayer.html
|-- ramadan.html
|-- donate.html
|-- upcoming-events.html
|-- posts.html
|-- history-mission-team.html
|-- styles/
|   `-- main.css
|-- scripts/
|   `-- main.js
`-- images/
```

## Features

- Live prayer times for Nanaimo using the Aladhan API
- Countdown to the next prayer on the homepage
- Shared responsive design system across all pages
- Dedicated programs layout for:
  - Regular masjid-hosted classes and programs
  - Sheikh's Corner for flexible Sheikh-led sessions
- Contact and donation forms ready for later integration

## Development

Open the HTML files directly in a browser or use a simple local server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`.

## Notes

- `scripts/main.js` handles navigation, prayer utilities, and basic contact and donation form behavior.
- `styles/main.css` contains the shared layout, responsive behavior, and component styles.
- The donation flow is still front-end only and does not process live payments.
