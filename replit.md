# ResQNet - Emergency Response Network

## Overview
ResQNet is a community-driven emergency response network that connects people in need with nearby volunteers. The application is built with React 18, Vite, and Supabase for backend services.

## Recent Changes
- **October 1, 2025**: Initial Replit environment setup completed
  - Configured Vite to run on port 5000 with proper Replit proxy support
  - Set up Supabase integration with environment variables
  - Configured deployment settings for autoscale deployment
  - Removed HTTPS/SSL configuration (not needed in Replit)

## Project Architecture

### Frontend Stack
- **React 18**: Main UI framework
- **Vite**: Build tool and development server
- **Redux Toolkit**: State management
- **React Router v6**: Client-side routing
- **TailwindCSS**: Utility-first styling framework
- **Framer Motion**: Animation library
- **React Hook Form**: Form management
- **Recharts & D3.js**: Data visualization

### Backend Services
- **Supabase**: Backend-as-a-Service
  - Authentication
  - PostgreSQL database
  - Real-time subscriptions
  - Storage

### Project Structure
- `/src/pages/`: Page components (home-landing, victim-dashboard, volunteer-dashboard, alert-history, user-profile, login-register)
- `/src/components/`: Reusable UI components
- `/src/contexts/`: React context providers (AuthContext)
- `/src/services/`: API service layers (emergencyService, userService)
- `/src/lib/`: Third-party library configurations (supabase)
- `/supabase/`: Supabase configuration and migrations

### Environment Variables
The following environment variables are configured in `.env`:
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key
- Additional API keys for various services (Gemini, Anthropic, Google Analytics, etc.)

## Development

### Running Locally
The project runs on port 5000 with the workflow "Frontend" which executes `npm run dev`.

### Deployment
- **Type**: Autoscale deployment (stateless web app)
- **Build**: `npm run build`
- **Run**: `npm run serve -- --port 5000 --host 0.0.0.0`

### Known Issues
- HMR (Hot Module Replacement) WebSocket connections may show errors in browser console due to Replit's proxy environment. This doesn't affect functionality, only live reload during development.

## User Preferences
None specified yet.
