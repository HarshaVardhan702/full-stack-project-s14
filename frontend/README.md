# Certification Tracker - Frontend

A professional React + Vite web application for tracking and managing professional certifications.

## Features

### User Features
- **Dashboard**: Overview of all certifications with status indicators
- **Certification Management**: 
  - View all certifications with filtering and search
  - Add new certifications
  - Edit existing certifications
  - Delete certifications
- **Status Tracking**: Track certification expiry dates with visual indicators
  - ✓ Active certificates
  - ⚠️ Expiring soon (within 30 days)
  - Expired certificates
- **Authentication**: Secure login system with demo credentials

### Admin Features
- All user features
- Admin panel access
- User management capabilities
- System reports and notifications management

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── CertificationCard.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── CertificationList.jsx
│   │   └── AddCertification.jsx
│   ├── styles/
│   │   ├── index.css
│   │   ├── App.css
│   │   ├── Navbar.css
│   │   ├── Login.css
│   │   ├── Dashboard.css
│   │   ├── CertificationList.css
│   │   ├── CertificationCard.css
│   │   └── AddCertification.css
│   ├── App.jsx
│   └── main.jsx
├── vite.config.js
├── eslint.config.js
├── package.json
└── README.md
```

## Tech Stack

- **React 18.2** - UI library
- **Vite 4.3** - Build tool and dev server
- **React Router 6** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Styling with modern CSS features

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The optimized build will be created in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Demo Credentials
- **Email**: demo@example.com
- **Password**: demo123
- **Role**: User or Admin

## Pages & Components

### Login Page
- User authentication interface
- Role selection (User/Admin)
- Demo credentials provided

### Dashboard
- Quick overview of certification statistics
- Recent certifications display
- Status indicators for quick assessment
- Admin-specific tools section

### Certification List
- Complete list of all certifications
- Advanced filtering by status
- Search functionality
- Sorting options
- Add new certification button

### Add Certification Form
- Form to add new certifications
- Fields: Name, Issuer, Credential ID, Dates, Certificate URL, Notes
- Form validation
- Success/error messaging

### Certification Card Component
- Individual certification display
- Status badges
- Days until expiry counter
- Edit and delete buttons
- Certificate URL link

## Styling

The application uses a modern, professional design with:
- **Color Scheme**: 
  - Primary: Indigo (#4f46e5)
  - Success: Green (#10b981)
  - Warning: Amber (#f59e0b)
  - Danger: Red (#ef4444)
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Semantic HTML and proper contrast ratios

## Available Scripts

### `npm run dev`
Runs the app in development mode with hot module replacement

### `npm run build`
Builds the app for production with optimizations

### `npm run preview`
Serves the production build locally for testing

### `npm run lint`
Runs ESLint to check code quality

## Environment Variables

Create a `.env.local` file in the frontend directory:

```
VITE_API_BASE_URL=http://localhost:3001/api
```

## Backend Integration

The frontend is ready to connect to a backend API. Currently, sample data is used. To integrate with your backend:

1. Replace sample data with API calls using axios
2. Update authentication to use backend endpoints
3. Connect form submissions to backend API
4. Implement proper error handling

### Key areas for backend integration:
- Authentication endpoints (`/api/auth/login`)
- Certification CRUD operations (`/api/certifications`)
- User management (`/api/users`)
- Notification system

## Vite Configuration

The `vite.config.js` includes:
- React plugin support
- Development server on port 3000
- Production build optimization
- Source map generation (disabled by default)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

Vite provides:
- **Lightning-fast HMR** (Hot Module Replacement)
- **Optimized build output** using Rollup
- **Fast cold starts** with native ES modules
- **Smaller bundle sizes** compared to CRA

## Future Enhancements

- [ ] Export certifications to PDF
- [ ] Email notifications for expiring certificates
- [ ] Certificate image/file uploads
- [ ] Integration with certification platforms
- [ ] Advanced analytics and reporting
- [ ] Dark mode support
- [ ] Multi-language support
- [ ] PWA support

## License

This project is part of the Certification Tracker application.
