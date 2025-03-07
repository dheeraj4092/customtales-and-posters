
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, getRelatedProducts } from '@/utils/data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Heart, Share2, ArrowLeft } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ageGroups } from '@/utils/productFormUtils';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  
  if (!id) {
    return <div>Product not found</div>;
  }
  
  const product = getProductById(id);
  
  if (!product) {
    return (
      <div className="container-tight py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Product not found</h2>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }
  
  const relatedProducts = getRelatedProducts(id);
  
  const handleAddToCart = () => {
    addItem(product.id, quantity);
  };
  
  // Get age group labels for display
  const getAgeGroupLabels = () => {
    return product.age_groups.map(ageGroup => {
      const groupInfo = ageGroups.find(group => group.id === ageGroup);
      return groupInfo?.label || ageGroup;
    });
  };
  
  return (
    <div className="container-tight py-12">
      {/* Back button */}
      <div className="mb-8">
        <Link to="/products" className="inline-flex items-center text-primary hover:underline">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Products
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="rounded-xl overflow-hidden aspect-square">
          <img 
            src={product.images[0]} 
            alt={product.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-display font-bold">{product.title}</h1>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="outline">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</Badge>
              {product.featured && <Badge variant="secondary">Featured</Badge>}
            </div>
            <p className="text-2xl font-semibold mt-4">${product.price.toFixed(2)}</p>
          </div>
          
          <Separator />
          
          {/* Age Groups */}
          <div>
            <h3 className="text-sm font-medium mb-2">Age Groups:</h3>
            <div className="flex flex-wrap gap-2">
              {getAgeGroupLabels().map((label, index) => (
                <Badge key={index} variant="outline">{label}</Badge>
              ))}
            </div>
          </div>
          
          {/* Description */}
          <div>
            <h3 className="text-sm font-medium mb-2">Description:</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          
          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Quantity:</h3>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="mx-4 min-w-[2rem] text-center">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            
            <Button 
              className="w-full" 
              size="lg"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              size="lg"
            >
              <Share2 className="h-4 w-4 mr-2" /> Share
            </Button>
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="details">
          <TabsList className="mb-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="returns">Returns</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="space-y-4">
            <h3 className="text-lg font-semibold">Product Details</h3>
            <p className="text-muted-foreground">{product.description}</p>
            {product.tags && product.tags.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="shipping">
            <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
            <p className="text-muted-foreground">
              We ship worldwide! Standard shipping takes 5-7 business days. Express shipping options are available at checkout.
            </p>
          </TabsContent>
          <TabsContent value="returns">
            <h3 className="text-lg font-semibold mb-4">Return Policy</h3>
            <p className="text-muted-foreground">
              If you're not completely satisfied with your purchase, you can return it within 30 days for a full refund.
            </p>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-display font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <ProductCard 
                key={product.id}
                id={product.id}
                name={product.title}
                price={product.price}
                image={product.images[0]}
                category={product.category}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
