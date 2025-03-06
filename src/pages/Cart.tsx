
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Cart: React.FC = () => {
  const { items, updateItemQuantity, removeItem, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  if (items.length === 0) {
    return (
      <div className="container py-20 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button onClick={() => navigate('/')}>Start Shopping</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-20">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Cart Items ({items.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 py-3">
                  <div className="w-20 h-20 bg-muted rounded overflow-hidden shrink-0">
                    <img 
                      src={item.image || '/placeholder.svg'} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Category: {item.category}
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => updateItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 mt-2 ml-auto text-destructive hover:text-destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline" onClick={() => clearCart()}>
                Clear Cart
              </Button>
              <Button variant="secondary" onClick={() => navigate('/')}>
                Continue Shopping
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$5.99</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(totalPrice * 0.07).toFixed(2)}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${(totalPrice + 5.99 + totalPrice * 0.07).toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => navigate('/checkout')}>
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
