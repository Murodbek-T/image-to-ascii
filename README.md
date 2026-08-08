# 🎨 ASCII Art Generator

A lightweight, zero-dependency web application built with vanilla JavaScript that converts images into high-quality ASCII art in real-time, featuring a sleek dark-themed UI and high-resolution PNG export capabilities.

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=flat-square&logo=javascript)
![HTML5 Canvas](https://img.shields.io/badge/HTML5-Canvas_API-orange?style=flat-square&logo=html5)
![CSS3](https://img.shields.io/badge/CSS3-Minimalist_Dark-blue?style=flat-square&logo=css3)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ✨ Features

- ⚡ **Zero External Dependencies** — Built completely with native Web APIs (`HTML5 Canvas` & `Vanilla JS`).
- 📐 **Aspect Ratio Compensation** — Corrects character height-to-width distortions for natural image proportions.
- 👁️ **Perceptual Luminance Extraction** — Uses relative luminance weights for accurate grayscale intensity mapping.
- 💾 **High-Res PNG Export** — Renders character grids back onto an in-memory canvas for instant image downloading.
- 🌙 **Minimal Dark Theme** — Clean, modern, responsive user interface built for code editors and developer tools.

---

## 🛠️ How It Works

Converting an image into ASCII art involves a four-step digital signal processing pipeline:
