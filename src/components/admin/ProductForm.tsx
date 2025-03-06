
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Icons } from '@/components/Icons';
import { useProducts } from '@/hooks/useProducts';
import ProductDetails from './ProductDetails';
import ProductAgeGroups from './ProductAgeGroups';
import ProductAttributes from './ProductAttributes';
import ProductImageUpload from './ProductImageUpload';
import { formSchema } from '@/utils/productFormUtils';

type FormValues = z.infer<ReturnType<typeof formSchema>>;

interface ProductFormProps {
  productId?: string;
  onCancel: () => void;
  onSuccess: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ 
  productId, 
  onCancel, 
  onSuccess 
}) => {
  const { createProduct, updateProduct, getProduct } = useProducts();
  const [uploadingImages, setUploadingImages] = useState(false);
  
  // Fetch product data if editing
  const { 
    data: existingProduct, 
    isLoading: isLoadingProduct 
  } = productId ? getProduct(productId) : { data: undefined, isLoading: false };
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema()),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      category: 'book',
      age_groups: [],
      featured: false,
      stock: 0,
      tags: '',
      images: [],
    }
  });
  
  // Set form values when existing product data is loaded
  useEffect(() => {
    if (existingProduct) {
      form.reset({
        title: existingProduct.title,
        description: existingProduct.description,
        price: existingProduct.price,
        category: existingProduct.category,
        age_groups: existingProduct.age_groups,
        featured: existingProduct.featured || false,
        stock: existingProduct.stock || 0,
        tags: existingProduct.tags?.join(', ') || '',
        images: existingProduct.images || [],
      });
    }
  }, [existingProduct, form]);
  
  const onSubmit = (data: FormValues) => {
    if (productId) {
      updateProduct({ 
        id: productId, 
        product: data as any
      });
    } else {
      createProduct(data as any);
    }
    onSuccess();
  };
  
  if (isLoadingProduct) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Loading Product...</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center py-8">
            <Icons.spinner className="h-8 w-8 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{productId ? 'Edit Product' : 'Create New Product'}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <ProductDetails form={form} />
            <ProductAgeGroups form={form} />
            <ProductAttributes form={form} />
            <ProductImageUpload form={form} uploadingImages={uploadingImages} setUploadingImages={setUploadingImages} />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={form.formState.isSubmitting || uploadingImages}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  {productId ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                productId ? 'Update Product' : 'Create Product'
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default ProductForm;
