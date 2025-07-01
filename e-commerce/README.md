# E-Commerce Website

A modern e-commerce website built with React, TypeScript, and styled-components. This project implements a complete shopping experience with product categories, cart functionality, and a full checkout flow.

## Features

- Product category navigation (Women, Men, Kids)
- Currency switcher ($, €, ¥)
- Shopping cart with overlay
- Product listing with dynamic filtering
- Complete checkout flow:
  - Shipping information
  - Shipping method selection
  - Payment processing
  - Order confirmation

## Technologies Used

- React 18
- TypeScript
- React Router v6
- Styled Components
- Material-UI Icons
- Context API for state management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd e-commerce
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Project Structure

```
src/
  ├── components/         # React components
  │   ├── Cart/          # Cart related components
  │   ├── Checkout/      # Checkout flow components
  │   ├── Navigation/    # Navigation components
  │   └── ProductListing/# Product listing components
  ├── context/           # React Context for state management
  ├── data/             # Mock data
  ├── styles/           # Global styles
  ├── types/            # TypeScript type definitions
  ├── App.tsx           # Main App component
  └── index.tsx         # Application entry point
```

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
