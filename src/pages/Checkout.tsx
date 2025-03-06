
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/Icons';
import { getProductById } from '@/utils/data';

const Checkout: React.FC = () => {
  const { items, clearCart, totalPrice } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Map cart items to include product details
  const cartItemsWithDetails = items.map(item => {
    const product = getProductById(item.productId);
    return {
      id: item.productId,
      quantity: item.quantity,
      name: product?.title || 'Unknown Product',
      price: product?.price || 0,
      image: product?.images[0] || '/placeholder.svg',
      category: product?.category || 'unknown'
    };
  });
  
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });
  
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate processing payment
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and show success message
      clearCart();
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase.",
      });
      
      // Redirect to homepage or order confirmation page
      navigate('/');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Payment failed",
        description: "There was an issue processing your payment. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  if (items.length === 0) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="mb-8">Add items to your cart to checkout.</p>
        <Button onClick={() => navigate('/')}>Continue Shopping</Button>
      </div>
    );
  }
  
  return (
    <div className="container py-20">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>
                {cartItemsWithDetails.length} {cartItemsWithDetails.length === 1 ? 'item' : 'items'} in your cart
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItemsWithDetails.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              
              <Separator className="my-4" />
              
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping</p>
                <p>$5.99</p>
              </div>
              <div className="flex justify-between">
                <p>Tax</p>
                <p>${(totalPrice * 0.07).toFixed(2)}</p>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-bold">
                <p>Total</p>
                <p>${(totalPrice + 5.99 + totalPrice * 0.07).toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      name="firstName" 
                      value={shippingInfo.firstName}
                      onChange={handleShippingChange}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      name="lastName" 
                      value={shippingInfo.lastName}
                      onChange={handleShippingChange}
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    name="address" 
                    value={shippingInfo.address}
                    onChange={handleShippingChange}
                    required 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      name="city" 
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input 
                      id="state" 
                      name="state" 
                      value={shippingInfo.state}
                      onChange={handleShippingChange}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input 
                      id="zipCode" 
                      name="zipCode" 
                      value={shippingInfo.zipCode}
                      onChange={handleShippingChange}
                      required 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input 
                    id="cardName" 
                    name="cardName" 
                    value={paymentInfo.cardName}
                    onChange={handlePaymentChange}
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input 
                    id="cardNumber" 
                    name="cardNumber" 
                    placeholder="1234 5678 9012 3456"
                    value={paymentInfo.cardNumber}
                    onChange={handlePaymentChange}
                    required 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiration Date</Label>
                    <Input 
                      id="expiry" 
                      name="expiry" 
                      placeholder="MM/YY"
                      value={paymentInfo.expiry}
                      onChange={handlePaymentChange}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input 
                      id="cvv" 
                      name="cvv" 
                      placeholder="123"
                      value={paymentInfo.cvv}
                      onChange={handlePaymentChange}
                      required 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Place Order'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
