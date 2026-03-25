# Portfolio Website - Zephaniah Daniel Anis

## Project Overview
A simple single-page portfolio website written in plain HTML, CSS, and JavaScript. Content is in Indonesian. The site showcases personal info, projects, a photo gallery, a blog, and contact links.

## Project Structure
- `index.html` / `page.html` - Main HTML file containing all HTML, CSS, and JS
- `profil.jpeg` - Profile photo

## Tech Stack
- Plain HTML5, CSS3, Vanilla JavaScript
- No build tools, no package manager, no frameworks
- Served via Python's built-in HTTP server

## Running the App
The workflow `Start application` runs:
```
python3 -m http.server 5000 --bind 0.0.0.0
```
The site is accessible at port 5000.

## Deployment
Configured as a **static** deployment with `publicDir: "."`.
