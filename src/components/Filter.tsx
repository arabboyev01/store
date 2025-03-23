import React, { useState, useEffect } from 'react';
import productService from '../api/api';

interface FilterProps {
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    priceRange: [number, number];
    setPriceRange: (range: [number, number]) => void;
}

const Filter: React.FC<FilterProps> = ({
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange
}) => {
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const data = await productService.fetchCategories();
                setCategories(data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally {
                setLoading(false);
            }
        };

        getCategories();
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Categories</h3>
                {loading ? (
                    <div className="animate-pulse h-20 bg-gray-200 rounded"></div>
                ) : (
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <input
                                id="category-all"
                                type="radio"
                                name="category"
                                checked={selectedCategory === ''}
                                onChange={() => setSelectedCategory('')}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor="category-all" className="ml-2 text-sm text-gray-700">
                                All Categories
                            </label>
                        </div>

                        {categories.map((category) => (
                            <div key={category} className="flex items-center">
                                <input
                                    id={`category-${category}`}
                                    type="radio"
                                    name="category"
                                    checked={selectedCategory === category}
                                    onChange={() => setSelectedCategory(category)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700 capitalize">
                                    {category}
                                </label>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">${priceRange[0]}</span>
                    <span className="text-sm text-gray-600">${priceRange[1]}</span>
                </div>
                <div className="flex space-x-4">
                    <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
};

export default Filter;