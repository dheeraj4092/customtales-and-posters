
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import { getFeaturedProducts } from '@/utils/data';

const FeaturedProducts: React.FC = () => {
  const featuredProducts = getFeaturedProducts();

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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map((product) => (
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
      </div>
    </section>
  );
};

export default FeaturedProducts;
