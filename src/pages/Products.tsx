
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProductsByCategory, products as allProducts } from '@/utils/data';
import { AgeGroup, Product, ProductCategory } from '@/types';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProductsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | 'all'>(
    categoryParam as ProductCategory || 'all'
  );
  const [ageFilters, setAgeFilters] = useState<AgeGroup[]>([]);

  useEffect(() => {
    if (categoryParam && ['book', 'poster', 'custom'].includes(categoryParam)) {
      setCategoryFilter(categoryParam as ProductCategory);
    }
  }, [categoryParam]);

  useEffect(() => {
    let filteredProducts: Product[] = 
      categoryFilter === 'all' 
        ? [...allProducts] 
        : getProductsByCategory(categoryFilter);

    if (ageFilters.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        product.ageGroups.some(age => ageFilters.includes(age))
      );
    }

    setProducts(filteredProducts);
  }, [categoryFilter, ageFilters]);

  const handleAgeFilterChange = (ageGroup: AgeGroup) => {
    setAgeFilters(prevFilters => 
      prevFilters.includes(ageGroup)
        ? prevFilters.filter(ag => ag !== ageGroup)
        : [...prevFilters, ageGroup]
    );
  };

  const ageGroups: { value: AgeGroup, label: string }[] = [
    { value: 'toddler', label: 'Toddler (0-3 years)' },
    { value: 'preschool', label: 'Preschool (3-5 years)' },
    { value: 'elementary', label: 'Elementary (6-10 years)' },
    { value: 'middle', label: 'Middle School (11-13 years)' },
    { value: 'teen', label: 'Teen (14-17 years)' },
    { value: 'adult', label: 'Adult (18+ years)' }
  ];

  return (
    <div className="container-tight py-12">
      <h1 className="text-4xl font-display font-bold tracking-tight mb-8">Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Filters */}
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Category</h3>
            <div className="space-y-2">
              <Tabs 
                value={categoryFilter} 
                onValueChange={(value) => setCategoryFilter(value as ProductCategory | 'all')}
                className="w-full"
              >
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="book">Books</TabsTrigger>
                  <TabsTrigger value="poster">Posters</TabsTrigger>
                  <TabsTrigger value="custom">Custom</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Age Group</h3>
            <div className="space-y-2">
              {ageGroups.map(age => (
                <div key={age.value} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`age-${age.value}`}
                    checked={ageFilters.includes(age.value)}
                    onCheckedChange={() => handleAgeFilterChange(age.value)}
                  />
                  <Label htmlFor={`age-${age.value}`}>{age.label}</Label>
                </div>
              ))}
            </div>
          </div>
          
          {ageFilters.length > 0 && (
            <Button 
              variant="outline" 
              onClick={() => setAgeFilters([])}
              className="w-full"
            >
              Clear Filters
            </Button>
          )}
        </div>
        
        {/* Products Grid */}
        <div className="md:col-span-3">
          {products.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No products found matching your filters.</p>
              <Button onClick={() => {setCategoryFilter('all'); setAgeFilters([])}}>
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
