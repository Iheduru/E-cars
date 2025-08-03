## 🎨 Front-End Documentation for E-Cars React Application

**🖋️ Author**: Iheduru .F. Chimobi
**📅 Date**: August 3, 2025

---

### 📑 Table of Contents

1. [🚀 Introduction & Purpose](#introduction--purpose)
2. [🛠️ Tech Stack & Dependencies](#tech-stack--dependencies)
3. [📂 Folder Structure](#folder-structure)
4. [⚙️ Setup & Installation](#setup--installation)
5. [🌐 Environment Configuration](#environment-configuration)
6. [🔗 API Service Layer](#api-service-layer)
7. [📊 State Management](#state-management)
8. [⚡ Error Handling & Interceptors](#error-handling--interceptors)
9. [🪝 Custom Hooks](#custom-hooks)
10. [🧪 Testing Strategy](#testing-strategy)
11. [🔍 Linting & Formatting](#linting--formatting)
12. [🤝 Contribution & Maintenance](#contribution--maintenance)

---

## 🚀 Introduction & Purpose

The **E-Cars Frontend** is a React application built with Vite to manage car listings, bookings, user profiles, and payments. This document outlines its architecture, best practices, and guidelines for scalable development.

## 🛠️ Tech Stack & Dependencies

* ⚛️ **React** ^18
* 🚀 **Vite** for dev & build
* ✨ **Tailwind CSS** for styling
* 🔗 **Axios** for HTTP
* 🗂️ **Redux Toolkit** or **React Query**
* 🧪 **Jest** + **React Testing Library**
* 🛣️ **React Router**
* 📝 **ESLint** + **Prettier**

## 📂 Folder Structure

*(Replace with exact layout from `/src`)*

```
src/
├─ App.jsx
├─ main.jsx
├─ api/
├─ components/
├─ features/
├─ hooks/
├─ store/
├─ utils/
└─ assets/
```

## ⚙️ Setup & Installation

1. Clone & install:

```bash
git clone <repo>
cd e-cars-frontend
npm install
```

2. Run dev server: `npm run dev`
3. Build: `npm run build`

## 🌐 Environment Configuration

```env
VITE_API_URL=https://api.e-cars.ng
```

## 🔗 API Service Layer

Configure Axios instances under `/src/api` with interceptors.

## 📊 State Management

Use Redux Toolkit slices or React Query hooks for data fetching.

## ⚡ Error Handling & Interceptors

Global `ErrorBoundary` + Axios interceptors + toast notifications.

## 🪝 Custom Hooks

E.g., `useCars`, `useBookings`, `useUserProfile`.

## 🧪 Testing Strategy

Jest + RTL, mocks with MSW, coverage ≥80%.

## 🔍 Linting & Formatting

ESLint + Prettier + Husky pre-commit hooks.

## 🤝 Contribution & Maintenance

Branch conventions, Conventional Commits, monthly dependency updates.


