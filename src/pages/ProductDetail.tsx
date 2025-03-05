
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, getRelatedProducts } from '@/utils/data';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ArrowLeft, Minus, Plus, ShoppingCart, Heart } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  
  const product = id ? getProductById(id) : undefined;
  const relatedProducts = id ? getRelatedProducts(id) : [];
  
  // If product doesn't exist, redirect to products page
  useEffect(() => {
    if (!product && id) {
      navigate('/products');
    }
  }, [product, id, navigate]);
  
  if (!product) {
    return null; // Will redirect in useEffect
  }
  
  const handleAddToCart = () => {
    addItem(product.id, quantity);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };
  
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container-tight">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="px-0 hover:bg-transparent"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        
        {/* Product Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="rounded-2xl overflow-hidden bg-white shadow-subtle">
            <img 
              src={product.images[0]} 
              alt={product.title} 
              className="w-full h-auto object-cover aspect-square"
            />
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                  {product.category === 'book' ? 'Book' : 
                   product.category === 'poster' ? 'Poster' : 'Custom'}
                </span>
                {product.stock && product.stock > 0 ? (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    In Stock
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                    Out of Stock
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-display font-bold">{product.title}</h1>
              
              <p className="text-2xl font-medium mt-2">{formatPrice(product.price)}</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
            
            {product.ageGroups && product.ageGroups.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Age Group</h3>
                <div className="flex flex-wrap gap-2">
                  {product.ageGroups.map((age) => (
                    <span 
                      key={age}
                      className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full"
                    >
                      {age === 'toddler' ? 'Toddler (0-2)' :
                       age === 'preschool' ? 'Preschool (3-5)' :
                       age === 'elementary' ? 'Elementary (6-10)' :
                       age === 'middle' ? 'Middle School (11-13)' :
                       age === 'teen' ? 'Teen (14-17)' : 'Adult (18+)'}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Custom product note */}
            {product.category === 'custom' && (
              <div className="bg-accent/50 p-4 rounded-lg">
                <p className="text-sm">
                  This is a custom product. After purchase, our design team will contact you to collect images and details for your personalized creation.
                </p>
              </div>
            )}
            
            {/* Quantity Selector */}
            <div>
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={increaseQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                className="flex-1"
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.stock || product.stock <= 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              
              <Button variant="outline" size="lg" className="sm:flex-none">
                <Heart className="h-5 w-5" />
              </Button>
              
              {product.category === 'custom' && (
                <Link to="/custom-order" className="flex-1">
                  <Button variant="outline" size="lg" className="w-full">
                    Customize Now
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-display font-bold mb-8">You may also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
