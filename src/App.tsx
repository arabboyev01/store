import { Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout"
import { CartProvider } from "./contexts/CartContext"
import CatalogPage from "./pages/CatalogPage"
import CartPage from "./pages/CartPage"
import ProductDetails from "./components/SingleProduct/SingleProduct"

function App() {

  return (
    <BrowserRouter>
      <CartProvider>
        <Layout>
          <Suspense fallback={
            <div className="flex justify-center items-center min-h-screen">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<CatalogPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="*" element={<CatalogPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
