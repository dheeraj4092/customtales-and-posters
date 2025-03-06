
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Icons } from '@/components/Icons';

const CustomOrder: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    orderType: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "Order request submitted!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        orderType: '',
        description: ''
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Custom Orders</h1>
        <p className="text-muted-foreground mb-8">
          Need something special? We can create custom books or posters just for you.
          Fill out the form below and we'll get back to you with a quote.
        </p>
        
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Custom Order Request</CardTitle>
              <CardDescription>Tell us about your custom order idea.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (optional)</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    type="tel" 
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orderType">Order Type</Label>
                  <Input 
                    id="orderType" 
                    name="orderType" 
                    placeholder="e.g., Custom Book, Custom Poster" 
                    value={formData.orderType}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Project Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  placeholder="Please describe what you're looking for in detail..."
                  value={formData.description}
                  onChange={handleChange}
                  className="min-h-[150px]"
                  required 
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Request'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CustomOrder;
