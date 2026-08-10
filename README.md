# GM UI/UX Frontend

> A modern, responsive solo project demonstrating frontend UI/UX engineering skills, interactive design patterns, and modular web architecture.

---

## 📌 Project Overview

**GM UI/UX Frontend** is a showcase project built to demonstrate essential and advanced UI/UX frontend skills. It highlights modern web design trends—including glassmorphism, responsive navigation, smooth animations, interactive data visualizers, and modular component design.

---

## ✨ Key Features & Highlights

- **Hero Section**: Engaging landing hero with rich visual hierarchy and interactive elements.
- **Glassmorphic Design Components**: Custom glassmorphism UI elements such as `glass-icon`, `feature-card`, and floating dynamic blocks.
- **Services & Feature Showcase**: Structured feature cards designed for optimal user experience and clarity.
- **Podcast & Media Showcase**: Interactive section for audio/media highlights.
- **Testimonials**: Clean card layouts highlighting client/user feedback.
- **Interactive Charts**: Visual data representation powered by ApexCharts.
- **Lottie Animations**: Dynamic micro-animations integrated using Lottie Web.

---

## 🛠️ Tech Stack

- **Framework**: [Angular 22](https://angular.dev/) (Standalone Components, Signals & Modern Architecture)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & SCSS
- **UI Components**: [Angular Material](https://material.angular.dev/) & `@ntv360/component-pantry`
- **Data Visualization**: [ApexCharts](https://apexcharts.com/) / `ng-apexcharts`
- **Animations**: [Lottie Web](https://airbnb.io/lottie/)
- **Language**: TypeScript & HTML5

---

## 📁 Directory Structure

```text
src/
└── app/
    ├── core/               # Core services, guards, and singleton utilities
    ├── features/           # Feature modules (hero, services, podcast, about, testimonial, footer)
    └── shared/             # Reusable UI components, models, constants, and utilities
        └── components/     # Navbar, Glass Icon, Feature Card, Testimonial Card, Footer
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js (v18+ recommended) and `npm` installed.

### 1. Installation

Clone the repository and install dependencies:

```bash
npm install
```

### 2. Development Server

Run the development server:

```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/` in your browser. The application will automatically reload if you change any source files.

### 3. Build

To build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### 4. Running Tests

To run unit tests with Vitest:

```bash
npm test
```

---

## 👤 Author & Project Note

This project is a **solo project** focused on implementing and showcasing basic to advanced UI/UX frontend development concepts, clean code principles, and modern frontend framework architecture.

