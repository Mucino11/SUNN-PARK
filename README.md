# SUNN-PARK Parking Management System

SUNN-PARK is a modern web application for managing parking spaces, built with React and TypeScript. The system provides features for both users and administrators to manage parking spaces efficiently.

## Features

### User Features

- User authentication (login/signup)
- View available parking spaces
- Book parking spaces
- View booking history
- Manage personal profile

### Admin Features (Future implementation)

- Admin dashboard
- Manage parking spaces
- View and manage bookings
- User management
- Analytics and reporting

## Tech Stack

- **Frontend**: React/Next.JS with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router
- **Form Handling**: React Hook Form
- **Authentication**: Custom authentication system

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd SUNN-PARK
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Install Google Maps API package:

```bash
npm install @react-google-maps/api
# or
yarn add @react-google-maps/api
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Troubleshooting

#### Google Maps API Issues

If you encounter the following error:

```
Module not found: Can't resolve '@react-google-maps/api'
```

Follow these steps to resolve it:

1. Delete the `node_modules` folder and `package-lock.json` (or `yarn.lock`):

```bash
rm -rf node_modules package-lock.json
# or for yarn
rm -rf node_modules yarn.lock
```

2. Clear npm cache:

```bash
npm cache clean --force
```

3. Reinstall dependencies:

```bash
npm install
# or
yarn install
```

4. Install Google Maps API package explicitly:

```bash
npm install @react-google-maps/api
# or
yarn add @react-google-maps/api
```

5. Restart your development server:

```bash
npm run dev
# or
yarn dev
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── context/       # React context providers
├── hooks/         # Custom React hooks
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── App.tsx        # Main application component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or concerns, please open an issue in the repository.
