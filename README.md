# Indian Art Through the Ages — Interactive Timeline

An elegant, editorial-style interactive website that visualizes the evolution of Indian art history from approximately 2500 BCE (Indus Valley Civilization) to the 21st century (Contemporary Digital India). 

Built using a light, museum-inspired aesthetic (warm ivory, cream, terracotta, and dark charcoal), the site utilizes Knight Lab's **TimelineJS3** as its core engine, paired with custom HTML5, CSS3, and JavaScript overlays to deliver detailed editorial content.

---

## Features

- **TimelineJS Integration**: A fully draggable, interactive horizontal timeline mapping 10 key art historical periods.
- **Dynamic Selected Panel**: Selecting any slide dynamically updates a rich metadata panel below the timeline displaying:
  - Artifact Title & Era
  - Production Period, Region, Medium, and Artist/School
  - A brief historical summary
- **Interactive Tooltips (Hover Cards)**: Hovering over the timeline navigation dots expands a custom editorial hover card featuring the artifact image, title, era, and a preview description.
- **Full-Screen Editorial Modal**: Clicking "Explore Full Essay" on any artifact opens a solid ivory page-takeover modal with 3 detailed paragraphs of historical context, featuring a custom serif drop-cap.
- **Hand-Drawn Editorial SVG**: Entry 10 features a custom vector SVG, *India: Past → Future*, symbolizing the artistic transition: *Traditional India → Modern India → Digital India*.
- **Museum Aesthetic**: Muted color palettes, elegant serif typography (`Cormorant Garamond`), clean UI font (`Inter`), double borders, and generous whitespace.
- **Responsive Layout**: Fluid grids and CSS rules that adapt the split details panels and modular overlays to desktop, tablet, and mobile screens.

---

## Tech Stack

- **Structure**: HTML5
- **Styling**: CSS3 (Vanilla)
- **Logic**: Vanilla JavaScript (ES6)
- **Timeline Engine**: TimelineJS3 (Knight Lab CDN)
- **Fonts**: Google Fonts (Cormorant Garamond & Inter)

---

## Folder Structure

```text
indian-art-form-timeline/
│
├── index.html                  # Main entry point and semantic HTML5 layout
├── css/
│   └── styles.css              # Theme variables, layouts, and TimelineJS style overrides
├── js/
│   ├── data.js                 # Complete timeline data (JSON structures and essays)
│   ├── timeline.js             # Initializer script for programmatically setting up TimelineJS
│   └── interactions.js         # Navigation syncing, custom hover cards, and modal logic
├── assets/
│   └── images/
│       └── contemporary_art.svg # Original vector SVG for Entry 10
└── README.md                   # Setup instructions and documentation
```

---

## Local Setup

To run this site locally, serve the directory through a local development HTTP server. This is necessary because TimelineJS needs to dynamically load data files and local assets, which browsers restrict over the `file://` protocol due to CORS policies.

### Option A: Using Python (Recommended)
If Python is installed, run this command in your terminal within the project directory:
```bash
python -m http.server 8000
```
Then open your browser and navigate to `http://localhost:8000`.

### Option B: Using Node.js
If you have Node.js installed, you can use `http-server` or `serve`:
```bash
npx http-server -p 8000
```
Then navigate to `http://localhost:8000`.

---

## Deployment

Since the project is a lightweight static website, it can be deployed to any static hosting provider without requiring a build step or backend servers:
- **GitHub Pages**: Push the repository to GitHub, go to Repository Settings -> Pages, and enable Pages on your main branch.
- **Vercel**: Run `vercel` in the project root directory or link the repo.
- **Netlify**: Drag and drop the workspace directory into the Netlify dashboard or connect your Git repository.

---

## Image & Licensing Attribution Note

The historical images in this archive are sourced from **Wikimedia Commons**, representing public domain or Creative Commons-licensed files. 

> [!IMPORTANT]
> - A source attribution link is provided under each image in both the Selected Artifact panel and the Editorial Modal.
> - While these images are believed to be in the public domain or open-licensed, **the specific license of each individual Wikimedia Commons file must be checked and verified** before final commercial publication or distribution.
