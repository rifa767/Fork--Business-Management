<div align="center">

# 🍴 Fork — Business Management

### A modern, animated business-management landing page — built from a Figma design, deployed live.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-683fea?style=for-the-badge)](https://shahadot16.github.io/Fork-Business-Management/)
[![GitHub Pages](https://img.shields.io/badge/Deployed_on-GitHub_Pages-222?style=for-the-badge&logo=github)](https://shahadot16.github.io/Fork-Business-Management/)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![EmailJS](https://img.shields.io/badge/EmailJS-Newsletter-FF6C37?style=flat)

</div>

---

## 🔗 Live Demo

### 👉 **[https://shahadot16.github.io/Fork-Business-Management/](https://shahadot16.github.io/Fork-Business-Management/)**

Open the link above to view the full, responsive website live in your browser.

---

## ✨ Features

- 🎨 **Pixel-faithful design** — rebuilt in clean HTML/CSS/JS from a Figma landing page
- 🧩 **Angular "notched" panels** — interlocking section shapes via CSS `clip-path`
- 🎬 **Smooth animations** — scroll-reveal, hover lifts, floating labels, gradient glow (respects `prefers-reduced-motion`)
- 📱 **Fully responsive** — looks great on desktop, tablet, and phone
- 📧 **Working newsletter** — enter any email and a **welcome mail is sent to that address** (client-side via EmailJS, no backend required)
- ⚡ **Zero build step** — just open it, or serve the folder

---

## 🧭 Sections

`Hero` · `Business Ecosystem` · `Smarter Strategies` · `Process Steps (01–06)` · `Smarter Ways to Manage` · `Pricing Plans` · `Newsletter Footer`

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Markup | HTML5 |
| Styling & Animation | CSS3 (`clip-path`, transitions, keyframes, `IntersectionObserver`-driven reveals) |
| Interactivity | Vanilla JavaScript |
| Email | [EmailJS](https://www.emailjs.com) (client-side welcome emails) |
| Hosting | GitHub Pages |
| Optional backend | Node.js + Express + Nodemailer |

---

## 🚀 Run Locally

No build tools needed. Either:

**Option A — open directly**
Open `index.html` with a static server (e.g. VS Code **Live Server / Go Live**).

**Option B — Node server (also serves the page)**
```bash
npm install
npm start        # http://localhost:3000
```

---

## 📧 Newsletter Setup (EmailJS)

The newsletter sends a welcome email to whoever subscribes. To enable it, add your three EmailJS keys in [`js/email-config.js`](js/email-config.js):

```js
window.EMAILJS_CONFIG = {
  PUBLIC_KEY:  "...",
  SERVICE_ID:  "...",
  TEMPLATE_ID: "..."
};
```

> In the EmailJS template, set **To Email** to `{{email}}` so the mail goes to the address entered in the form.

---

## 📂 Project Structure

```
Fork-Business-Management/
├── index.html          # page markup
├── css/styles.css      # all styles + animations
├── js/
│   ├── script.js       # photos, animations, newsletter handler
│   └── email-config.js # EmailJS keys
├── assets/             # icons, images, avatars
├── server/             # optional Node backend (Express + Nodemailer)
└── README.md
```

---

<div align="center">

### Built with ❤️ by [Md. Shahadot Hossain](https://github.com/Shahadot16)

⭐ If you like this project, give it a star!

</div>
