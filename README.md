# Repomend Frontend (Next.js)
![Project Logo](./assets/logo.png)
## 📖 Overview
**Repomend** is a modern **Next.js** application that provides an intuitive UI for exploring repository recommendations. The frontend showcases a polished, responsive design with dynamic components, theming, and smooth user interactions.
---
## ✨ Features
- **Responsive layout** – works seamlessly on desktop, tablet, and mobile.
- **Dynamic topic picker** – interactive UI component for selecting recommendation topics.
- **Container component** – reusable layout wrapper with theming support.
- **State‑of‑the‑art UI** – glassmorphism accents, smooth micro‑animations, and a vibrant color palette.
- **TypeScript strict mode** – fully typed components for maintainability.
---
## 🛠️ Tech Stack
| Layer | Technology |
|------|------------|
| Framework | **Next.js 14** |
| Language | **TypeScript** |
| Styling | **Tailwind CSS** (with custom design tokens) |
| UI Library | **React** |
| Icons | **React‑Icons** |
| State Management | **React Context / useState** |
| Form handling | **React Hook Form** |
---
## 🚀 Getting Started
### Prerequisites
- **Node.js** ≥ 18 (LTS)
- **npm** (or **yarn** / **pnpm**)
### Installation
```bash
# Clone the repository (if you haven't already)
git clone https://github.com/your-org/repomend.git
# Navigate to the frontend folder
cd front/next-app
# Install dependencies
npm install
npm install   # or `yarn` / `pnpm install`
```
### Running the Development Server
```bash
npm run dev
npm run dev   # starts the dev server at http://localhost:3000
```
Open your browser at `http://localhost:3000` – the app should automatically reload on code changes.
---
## 📦 Build for Production
```bash
npm run build   # generates an optimized production build
npm start       # serves the built app
```
---
## 📂 Project Structure
```
next-app/
├─ app/                 # Next.js App Router pages & layout
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/          # Reusable UI components
│   ├─ ui/            # UI primitives (Container, TopicPicker, …)
│   └─ layout/        # Page layout components
├─ pages/              # Next.js page routes
│  ├─ ui/              # UI primitives (Container, TopicPicker, …)
│  └─ layout/          # Page layout components
├─ public/              # Static assets (images, favicons, …)
├─ styles/             # Global CSS / Tailwind config
├─ styles/              # Global CSS / Tailwind config
├─ tsconfig.json       # TypeScript configuration
└─ next.config.js      # Next.js custom configuration
```
---
## 📸 Screenshots & Results
> Replace the placeholders below with actual screenshots of the running application.
### Home Page
![Home Page Screenshot](./assets/screenshots/home.png)
### Topic Picker Interaction
![Topic Picker Demo](./assets/screenshots/topic-picker.gif)
### Container Layout Example
![Container Layout](./assets/screenshots/container.png)
---
## 🤝 Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/awesome-feature`).
3. Make your changes and ensure the project builds.
4. Submit a pull request with a clear description of your changes.
---
## 📄 License
This project is licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.
---
