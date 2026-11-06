# Fork — Business Management

A modern, responsive business-management landing page built from a Figma design,
with scroll animations and a working newsletter that sends a welcome email.

## Features
- Fully responsive landing page (hero, ecosystem, strategies, process steps, pricing, footer)
- Angular "notched" panels, scroll-reveal animations, hover micro-interactions
- Newsletter sign-up that emails a welcome message to **any** address entered
  (client-side via [EmailJS](https://www.emailjs.com) — works with Live Server, no backend needed)
- Optional Node.js backend (Express + Nodemailer) included as an alternative

## Run it
Just open the site with a static server (e.g. VS Code **Live Server / Go Live**),
or:
```bash
npm install
npm start        # serves at http://localhost:3000
```

## Newsletter setup (EmailJS)
Add your three EmailJS keys in [`js/email-config.js`](js/email-config.js):
```js
window.EMAILJS_CONFIG = {
  PUBLIC_KEY:  "...",
  SERVICE_ID:  "...",
  TEMPLATE_ID: "..."
};
```
In the EmailJS template, set **To Email** to `{{email}}` so the welcome mail is
delivered to whoever subscribes.

## Project structure
```
index.html          # page markup
css/styles.css       # all styles + animations
js/script.js         # photos, animations, newsletter handler
js/email-config.js   # EmailJS keys
assets/              # icons, images, avatars
server/              # optional Node backend (Express + Nodemailer)
```
