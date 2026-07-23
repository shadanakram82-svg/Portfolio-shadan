# Shadan Akram | Web Developer Portfolio

A high-performance, visually engaging, and modern personal portfolio website built to showcase projects, skills, and achievements. Engineered with React 19 and Vite, featuring seamless smooth scrolling, GSAP animations, and a flawless dark/light mode transition.

**[Live Demo](https://yourwebsite.com)** 

![Project Preview](https://via.placeholder.com/1200x600?text=Portfolio+Preview+Image)

![React](https://img.shields.io/badge/React-19.2.7-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-8.1.1-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3.2-38B2AC?style=for-the-badge&logo=tailwind-css)
![GSAP](https://img.shields.io/badge/GSAP-3.15.0-88CE02?style=for-the-badge&logo=greensock)

</div>

<br />

## ✨ Features

- 🌓 **Dark / Light Mode**: Seamless theme switching utilizing the native View Transitions API for a premium expanding-circle effect.
- 🚀 **Smooth Scrolling**: Integrated **Lenis** to provide a buttery-smooth scrolling experience across the entire Single Page Application (SPA).
- ✨ **Dynamic Animations**: Custom `IntersectionObserver` logic and **GSAP** are used to trigger stunning scroll-reveal and "pop" effects as elements enter the viewport.
- 📱 **Fully Responsive**: Mobile-first approach utilizing a hybrid of **Tailwind CSS** and **Bootstrap** grid, complete with a custom full-screen hamburger overlay menu for mobile devices.
- 🎨 **Immersive UI**: Features an animated Preloader and a dynamic background particle system.
- ⚡ **Optimized Performance**: Built on Vite for lightning-fast Hot Module Replacement (HMR) and optimized production builds.

---

## 🛠️ Tech Stack

**Core:**
- React (v19)
- Vite

**Styling & UI:**
- Tailwind CSS (v4)
- Bootstrap 5 (via CDN)
- Custom Vanilla CSS (`index.css`)

**Animations & Interactions:**
- GSAP (GreenSock Animation Platform)
- Lenis (Smooth Scroll)
- Native Intersection Observer API
- Native View Transitions API

**Typography & Icons:**
- React Icons
- FontAwesome 6 (via CDN)
- Google Fonts: *Space Grotesk*, *Syne*, *JetBrains Mono*

---

## 📂 Project Structure

```text
📦 src
 ┣ 📂 assets               # Static images and icons
 ┣ 📂 components           # Reusable React components
 ┃ ┣ 📜 About.jsx          # About section with GSAP animations
 ┃ ┣ 📜 Achievements.jsx   # Achievements display
 ┃ ┣ 📜 Contact.jsx        # Contact form and details
 ┃ ┣ 📜 Footer.jsx         # Page footer
 ┃ ┣ 📜 Hero.jsx           # Landing section
 ┃ ┣ 📜 Navbar.jsx         # Sticky navigation & Dark Mode toggle
 ┃ ┣ 📜 Preloader.jsx      # Initial loading screen
 ┃ ┣ 📜 Projects.jsx       # Project showcase with GSAP
 ┃ ┗ 📜 Skills.jsx         # Technical skills matrix with GSAP
 ┣ 📜 App.css              # Application specific styles
 ┣ 📜 App.jsx              # Main layout, Lenis setup, and Scroll Observers
 ┣ 📜 index.css            # Global Tailwind imports & custom CSS variables
 ┗ 📜 main.jsx             # React DOM entry point
```

---

## 📸 Screenshots

![Screenshot 1](https://via.placeholder.com/800x450?text=Hero+Section)
![Screenshot 2](https://via.placeholder.com/800x450?text=Dark/Light+Mode)
![Screenshot 3](https://via.placeholder.com/800x450?text=Projects+Section)

---

## ⚙️ Installation

### Environment Requirements
- Node.js (v18 or higher recommended)
- npm (Node Package Manager)

### How to Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port specified by Vite).

---

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the Vite development server with HMR.
- `npm run build`: Bundles the app into static files for production in the `dist` folder.
- `npm run preview`: Bootstraps a local web server to preview your production build.
- `npm run lint`: Runs ESLint to check for code quality and formatting issues.

---

## 📐 Responsive Design & Performance

- **Responsive Strategy**: The application uses Tailwind utility classes (`md:`, `lg:`) alongside Bootstrap's grid system (`d-flex`, `d-lg-none`) to ensure components automatically adjust from mobile screens to ultrawide desktop monitors. The navigation gracefully degrades into an interactive full-screen overlay on smaller devices.
- **Performance Optimizations**: 
  - `IntersectionObserver` is utilized to defer animations until elements are actually in the viewport, saving CPU cycles.
  - Strict Mode enabled in React 19 for catching potential lifecycle issues.
  - Lenis scroll listener uses `requestAnimationFrame` for high-performance rendering.

---

## 📦 Libraries Used

From `package.json`:
- `react` / `react-dom`: Component rendering.
- `gsap`: Advanced DOM animations.
- `lenis`: High-performance smooth scrolling.
- `react-icons`: Modular SVG icons.
- `tailwindcss` / `@tailwindcss/vite`: Utility-first CSS framework.
- `eslint` (and plugins): Code linting and enforcement.

---

## 🏗️ Project Architecture

The project follows a **Component-Based Single Page Application (SPA)** architecture. 
Instead of traditional routing, it utilizes a single continuous page layout mapped inside `App.jsx`. Navigation relies on native HTML anchor links (e.g., `<a href="#about">`) intercepted by the Lenis smooth scroll instance to gracefully pan the user to the corresponding `<section id="about">` components. State management is kept local to components (e.g., Theme State in `Navbar.jsx`, Loading State in `App.jsx`) utilizing React Hooks (`useState`, `useEffect`).

---

## 🚀 Future Improvements

- Add a dynamic backend or headless CMS (like Sanity or Strapi) to manage projects and achievements without code edits.
- Implement an internationalization (i18n) library for multi-language support.
- Add form validation and email integration (e.g., EmailJS) to the Contact section.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👤 Author

**Shadan Akram**
- GitHub: [https://github.com/shadanakram82-svg/Portfolio-shadan]
- LinkedIn: [https://www.linkedin.com/in/shadan-akram-36167135a/]
- Live website : [https://portfolio-shadan-akram.vercel.app/]

---

## 📬 Contact

Email -shadanakram82@gmail.com

**[GitHub Repository](https://github.com/shadanakram82-svg/Portfolio-shadan)** | **[Live Website](https://portfolio-shadan-akram.vercel.app/)**
