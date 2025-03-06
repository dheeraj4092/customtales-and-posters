
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search as SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import ProductCard from '@/components/ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  
  // Update the URL when search query changes
  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
  };

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['search', searchParams.get('q')],
    queryFn: async () => {
      if (!searchParams.get('q')) return [];
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock search results
      const allProducts: Product[] = [
        { id: '1', name: 'The Great Gatsby', price: 12.99, image: '/placeholder.svg', category: 'book' },
        { id: '2', name: 'To Kill a Mockingbird', price: 14.99, image: '/placeholder.svg', category: 'book' },
        { id: '3', name: 'Abstract Dreams', price: 24.99, image: '/placeholder.svg', category: 'poster' },
        { id: '4', name: 'Mountain Sunset', price: 19.99, image: '/placeholder.svg', category: 'poster' },
        { id: '5', name: 'Pride and Prejudice', price: 9.99, image: '/placeholder.svg', category: 'book' },
        { id: '6', name: 'Urban Life', price: 22.99, image: '/placeholder.svg', category: 'poster' },
      ];
      
      const query = searchParams.get('q')?.toLowerCase();
      return allProducts.filter(product => 
        product.name.toLowerCase().includes(query || '') ||
        product.category.toLowerCase().includes(query || '')
      );
    },
    enabled: !!searchParams.get('q')
  });

  return (
    <div className="container py-20">
      <h1 className="text-3xl font-bold mb-8">Search</h1>
      
      <form onSubmit={handleSearch} className="relative mb-8 max-w-xl mx-auto">
        <Input
          type="search"
          placeholder="Search for books, posters, and more..."
          className="pr-12"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button 
          type="submit" 
          size="icon" 
          className="absolute right-0 top-0 h-full rounded-l-none"
        >
          <SearchIcon className="h-4 w-4" />
        </Button>
      </form>
      
      {searchParams.get('q') ? (
        <div>
          <h2 className="text-xl font-medium mb-4">
            {isLoading ? 'Searching...' : `Search results for "${searchParams.get('q')}"`}
          </h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array(4).fill(0).map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="h-[200px] w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : searchResults && searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {searchResults.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  category={product.category}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No results found. Try a different search term.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-muted-foreground">Enter a search term to find products.</p>
        </div>
      )}
    </div>
  );
};

export default Search;
