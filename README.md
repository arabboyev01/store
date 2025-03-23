# Product Catalog

A React application that displays a catalog of products with features like filtering, searching, and a shopping cart.

## Features

- Product listing with search and filtering capabilities
- Category filtering and price range filtering
- Shopping cart functionality with add/remove/update operations
- Responsive design for mobile and desktop
- Cart persistence using localStorage
- React Router for navigation
- Lazy loading for improved performance

## Technologies Used

- React 18
- React Router for navigation
- Context API for state management
- Tailwind CSS for styling
- FakeStore API for product data

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/product-catalog.git
   cd product-catalog
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
src/
├── App.jsx              # Main app component
├── index.jsx            # Entry point
├── components/          # Reusable components
│   ├── ProductList.jsx  # Displays list of products
│   ├── ProductCard.jsx  # Individual product card
│   ├── SearchBar.jsx    # Search functionality
│   ├── Filter.jsx       # Category and price filters
│   ├── Cart.jsx         # Cart page component
│   ├── CartItem.jsx     # Individual cart item
│   ├── Layout.jsx       # Page layout wrapper
│   └── Navbar.jsx       # Navigation bar
├── contexts/            # React context
│   └── CartContext.jsx  # Cart state management
├── pages/               # Page components
│   ├── CatalogPage.jsx  # Main product catalog
│   └── CartPage.jsx     # Shopping cart page
└── utils/               # Utility functions
    └── api.js           # API related functions
```

## Deployment

This project is configured for easy deployment on Vercel, Netlify, or GitHub Pages.

### Deploying to Vercel

1. Install Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Deploy:
   ```
   vercel
   ```

### Deploying to Netlify

1. Build the project:
   ```
   npm run build
   ```

2. Deploy using Netlify CLI or connect your GitHub repository to Netlify for continuous deployment.

## Live Demo

You can view a live demo of this application at: [https://product-catalog-demo.vercel.app](https://product-catalog-demo.vercel.app)

## License

This project is licensed under the MIT License - see the LICENSE file for details.