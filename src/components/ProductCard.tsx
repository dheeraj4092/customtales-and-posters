
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id);
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className={cn(
        'group block relative rounded-2xl overflow-hidden bg-white card-hover',
        featured ? 'aspect-[4/5]' : 'aspect-[3/4]'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className={cn(
        'w-full h-full relative',
        !imageLoaded && 'image-loading'
      )}>
        <img
          src={product.images[0]}
          alt={product.title}
          className={cn(
            'w-full h-full object-cover transition-transform duration-500 ease-out-expo',
            isHovered && 'scale-105',
            !imageLoaded && 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      
      {/* Overlay with details */}
      <div className={cn(
        'absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300',
        isHovered ? 'opacity-100' : 'opacity-0 sm:opacity-80'
      )}>
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Add to wishlist functionality
            }}
          >
            <Heart className="h-4 w-4 text-white" />
          </Button>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-white font-medium line-clamp-2">{product.title}</h3>
              <p className="text-white/80 text-sm mt-1">${product.price.toFixed(2)}</p>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white text-primary hover:bg-white/90 transition-colors"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Category label */}
      <div className="absolute top-4 left-4">
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm">
          {product.category === 'book' ? 'Book' : 
           product.category === 'poster' ? 'Poster' : 'Custom'}
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
