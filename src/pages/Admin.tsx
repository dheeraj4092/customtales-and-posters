
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/Icons';
import ProductList from '@/components/admin/ProductList';
import ProductForm from '@/components/admin/ProductForm';
import { is_admin } from '@/utils/auth';

const Admin: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [editProduct, setEditProduct] = useState<string | null>(null);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="container py-20 flex justify-center items-center">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="container py-20">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Manage Products</h2>
            
            {!isCreating && !editProduct && (
              <Button onClick={() => setIsCreating(true)}>
                <Icons.plus className="mr-2 h-4 w-4" />
                Add New Product
              </Button>
            )}
          </div>
          
          {isCreating ? (
            <ProductForm 
              onCancel={() => setIsCreating(false)}
              onSuccess={() => setIsCreating(false)}
            />
          ) : editProduct ? (
            <ProductForm 
              productId={editProduct}
              onCancel={() => setEditProduct(null)}
              onSuccess={() => setEditProduct(null)}
            />
          ) : (
            <ProductList 
              onEdit={setEditProduct}
            />
          )}
        </TabsContent>
        
        <TabsContent value="orders">
          <div className="p-10 text-center text-muted-foreground">
            <h3 className="text-xl mb-2">Order Management</h3>
            <p>Coming soon - Order management functionality</p>
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <div className="p-10 text-center text-muted-foreground">
            <h3 className="text-xl mb-2">User Management</h3>
            <p>Coming soon - User management functionality</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
