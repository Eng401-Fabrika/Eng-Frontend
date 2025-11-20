# Web Admin Panel Front-End

A modern, responsive admin panel built with React, TypeScript, and Vite.

## Features

- Modern, clean UI with smooth transitions
- Fully responsive design (mobile, tablet, desktop)
- Authentication flow with login page
- Dashboard landing page with three sections:
  - Hero section (100vh)
  - CTA section (full width)
  - Navigation cards for Documentation and Actions
- Admin panel with dynamic sidebar navigation
- React Router for seamless page transitions

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── pages/
│   ├── Login.tsx          # Authentication page
│   ├── Login.css
│   ├── Dashboard.tsx      # Landing page with hero, CTA, and navigation cards
│   ├── Dashboard.css
│   ├── AdminPanel.tsx     # Admin panel template
│   └── AdminPanel.css
├── components/
│   ├── Sidebar.tsx        # Dynamic sidebar navigation
│   └── Sidebar.css
├── App.tsx                # Main app with routing
├── main.tsx              # Entry point
└── index.css             # Global styles
```

## Pages

### 1. Login Page (`/login`)
- Standard authentication interface
- Redirects to dashboard on successful login

### 2. Dashboard (`/dashboard`)
- **Hero Section**: Full viewport height welcome section with animated illustration
- **CTA Section**: Call-to-action message centered across full width
- **Navigation Cards**: Two clickable cards:
  - Dökümantasyon (Documentation)
  - Aksiyonlar (Actions)

### 3. Admin Panel (`/admin/documentation` or `/admin/actions`)
- Shared layout with header and sidebar
- Dynamic sidebar menu based on selected section
- Responsive design with mobile menu toggle
- **Documentation Section**: Browse guides, API references, and examples
- **Actions Section**: Dashboard with statistics and system management

## Technology Stack

- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite**: Fast build tool and dev server
- **React Router**: Client-side routing
- **CSS3**: Modern styling with CSS variables and animations

## Features Implemented

- Smooth page transitions and animations
- Hover effects on interactive elements
- Mobile-responsive sidebar with overlay
- CSS custom properties for consistent theming
- Gradient backgrounds and modern design patterns
- Accessible navigation with keyboard support

## Customization

### Colors

Edit CSS variables in `src/index.css`:

```css
:root {
  --primary-color: #4f46e5;
  --primary-hover: #4338ca;
  --secondary-color: #06b6d4;
  /* ... */
}
```

### Sidebar Menu Items

Modify the menu items in `src/components/Sidebar.tsx`:

```typescript
const documentationItems: MenuItem[] = [ /* ... */ ];
const actionsItems: MenuItem[] = [ /* ... */ ];
```

## License

This project is private and proprietary.
