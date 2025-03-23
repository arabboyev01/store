import { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import productService from '../api/api';
import { Product } from '../types';

const CatalogPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // Filters state
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

    // Fetch products
    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true);
                const data = await productService.fetchProducts();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, []);

    // Apply filters whenever filter state changes
    useEffect(() => {
        if (products.length === 0) return;

        const filtered = products.filter(product => {
            // Apply search filter
            const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase());

            // Apply category filter
            const matchesCategory = selectedCategory === '' || product.category === selectedCategory;

            // Apply price filter
            const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

            return matchesSearch && matchesCategory && matchesPrice;
        });

        setFilteredProducts(filtered);
    }, [searchTerm, selectedCategory, priceRange, products]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-6">Filters</h2>
                    <div className="mb-6">
                        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    </div>
                    <Filter
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                    />
                </div>
            </div>

            <div className="lg:col-span-3">
                <div className="mb-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Product Catalog</h1>
                    <div className="text-sm text-gray-500">
                        {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                    </div>
                </div>

                <ProductList
                    products={filteredProducts}
                    loading={loading}
                    error={error}
                />
            </div>
        </div>
    );
};

export default CatalogPage;