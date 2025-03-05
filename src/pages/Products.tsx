
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { products } from '@/utils/data';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { AgeGroup, Product, ProductCategory } from '@/types';

const Products: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') as ProductCategory || '';

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | ''>(initialCategory);
  const [ageFilter, setAgeFilter] = useState<AgeGroup | ''>('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Effect to handle filtering products
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.title.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(term)))
      );
    }
    
    // Apply category filter
    if (categoryFilter) {
      result = result.filter(product => product.category === categoryFilter);
    }
    
    // Apply age filter
    if (ageFilter) {
      result = result.filter(product => product.ageGroups.includes(ageFilter));
    }
    
    setFilteredProducts(result);
  }, [searchTerm, categoryFilter, ageFilter]);

  // Handle category selection from URL query
  useEffect(() => {
    const category = queryParams.get('category') as ProductCategory || '';
    setCategoryFilter(category);
  }, [location.search]);

  const resetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setAgeFilter('');
  };

  const hasActiveFilters = searchTerm || categoryFilter || ageFilter;

  const categories: { value: ProductCategory | ''; label: string }[] = [
    { value: '', label: 'All Categories' },
    { value: 'book', label: 'Books' },
    { value: 'poster', label: 'Posters' },
    { value: 'custom', label: 'Custom Products' }
  ];

  const ageGroups: { value: AgeGroup | ''; label: string }[] = [
    { value: '', label: 'All Ages' },
    { value: 'toddler', label: 'Toddler (0-2 years)' },
    { value: 'preschool', label: 'Preschool (3-5 years)' },
    { value: 'elementary', label: 'Elementary (6-10 years)' },
    { value: 'middle', label: 'Middle School (11-13 years)' },
    { value: 'teen', label: 'Teen (14-17 years)' },
    { value: 'adult', label: 'Adult (18+ years)' }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container-tight">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {categoryFilter === 'book' ? 'Books' : 
             categoryFilter === 'poster' ? 'Posters' : 
             categoryFilter === 'custom' ? 'Custom Products' : 'All Products'}
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            {categoryFilter === 'book' ? 'Explore our collection of engaging and educational books for children of all ages.' : 
             categoryFilter === 'poster' ? 'Discover beautiful posters to decorate your child's room and inspire their imagination.' : 
             categoryFilter === 'custom' ? 'Create personalized products featuring your child or family, made by our talented designers.' : 
             'Browse our full collection of books, posters, and custom products for children.'}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-full"
              />
              {searchTerm && (
                <button 
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setSearchTerm('')}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>

            <Button 
              variant="outline" 
              className="sm:w-auto w-full rounded-full"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {hasActiveFilters && (
                <span className="ml-2 w-2 h-2 rounded-full bg-primary" />
              )}
            </Button>
          </div>

          {/* Filter options */}
          {isFilterOpen && (
            <div className="p-4 bg-secondary rounded-lg animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Category</label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value as ProductCategory | '')}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Age Group</label>
                  <select
                    value={ageFilter}
                    onChange={(e) => setAgeFilter(e.target.value as AgeGroup | '')}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    {ageGroups.map((age) => (
                      <option key={age.value} value={age.value}>{age.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {hasActiveFilters && (
                <div className="mt-4 flex justify-end">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={resetFilters}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="mb-8">
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="animate-fade-up">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or search term.
            </p>
            <Button onClick={resetFilters}>
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
