
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

const FeaturedProducts: React.FC = () => {
  const { data: featuredProducts, isLoading } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true);
        
      if (error) {
        console.error('Error fetching featured products:', error);
        throw error;
      }
      
      return data as Product[];
    }
  });

  return (
    <section className="py-20 bg-secondary/50">
      <div className="container-tight">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
              Featured Products
            </h2>
            <p className="mt-2 text-muted-foreground max-w-lg">
              Discover our most popular books, posters, and custom creations that spark imagination and joy.
            </p>
          </div>
          
          <Link to="/products">
            <Button variant="ghost" className="group">
              View all products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {Array(4).fill(0).map((_, index) => (
              <div key={index} className="animate-pulse">
                <Skeleton className="aspect-[4/5] w-full rounded-xl" />
                <div className="mt-4 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts?.map((product) => (
              <div key={product.id} className="animate-fade-up">
                <ProductCard 
                  id={product.id}
                  name={product.title}
                  price={product.price}
                  image={product.images[0]}
                  category={product.category}
                  featured={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
