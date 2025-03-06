
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Icons } from '@/components/Icons';
import { useProducts } from '@/hooks/useProducts';
import { uploadProductImage } from '@/services/productService';
import { ProductCategory, AgeGroup } from '@/types';

const ageGroups = [
  { id: 'toddler', label: 'Toddler (0-3 years)' },
  { id: 'preschool', label: 'Preschool (3-5 years)' },
  { id: 'elementary', label: 'Elementary (5-12 years)' },
  { id: 'middle', label: 'Middle School (12-14 years)' },
  { id: 'teen', label: 'Teen (14-18 years)' },
  { id: 'adult', label: 'Adult (18+ years)' }
];

const formSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  price: z.coerce.number().positive({ message: 'Price must be a positive number' }),
  category: z.enum(['book', 'poster', 'custom'] as const),
  ageGroups: z.array(z.enum(['toddler', 'preschool', 'elementary', 'middle', 'teen', 'adult'] as const))
    .min(1, { message: 'Select at least one age group' }),
  featured: z.boolean().default(false),
  stock: z.coerce.number().int().nonnegative({ message: 'Stock must be a non-negative integer' }),
  tags: z.string().transform(val => val ? val.split(',').map(tag => tag.trim()) : []),
  images: z.array(z.string()).min(1, { message: 'At least one image is required' }),
});

type FormValues = z.infer<typeof formSchema>;

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
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      category: 'book' as ProductCategory,
      ageGroups: [],
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
        ageGroups: existingProduct.ageGroups,
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
        product: data
      });
    } else {
      createProduct(data);
    }
    onSuccess();
  };
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    try {
      setUploadingImages(true);
      const imageUrls = [...form.getValues('images')];
      
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        const imageUrl = await uploadProductImage(file);
        imageUrls.push(imageUrl);
      }
      
      form.setValue('images', imageUrls, { shouldValidate: true });
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setUploadingImages(false);
    }
  };
  
  const removeImage = (index: number) => {
    const currentImages = form.getValues('images');
    currentImages.splice(index, 1);
    form.setValue('images', currentImages, { shouldValidate: true });
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Product title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Product description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="book">Book</SelectItem>
                        <SelectItem value="poster">Poster</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="ageGroups"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Age Groups</FormLabel>
                    <FormDescription>
                      Select all appropriate age groups for this product.
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {ageGroups.map((ageGroup) => (
                      <FormField
                        key={ageGroup.id}
                        control={form.control}
                        name="ageGroups"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={ageGroup.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(ageGroup.id as AgeGroup)}
                                  onCheckedChange={(checked) => {
                                    const currentValue = [...field.value];
                                    if (checked) {
                                      currentValue.push(ageGroup.id as AgeGroup);
                                    } else {
                                      const index = currentValue.indexOf(ageGroup.id as AgeGroup);
                                      if (index !== -1) {
                                        currentValue.splice(index, 1);
                                      }
                                    }
                                    field.onChange(currentValue);
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {ageGroup.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter tags separated by commas" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Enter tags separated by commas (e.g., fantasy, adventure, educational)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured Product</FormLabel>
                    <FormDescription>
                      Display this product in the featured section on the homepage
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {field.value.map((image, index) => (
                          <div key={index} className="relative aspect-square rounded-md overflow-hidden group">
                            <img 
                              src={image} 
                              alt={`Product image ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImage(index)}
                            >
                              <Icons.x className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <div className="border border-dashed rounded-md aspect-square flex flex-col items-center justify-center p-4">
                          <label htmlFor="image-upload" className="cursor-pointer text-center">
                            <div className="mb-2">
                              <Icons.upload className="h-8 w-8 mx-auto text-muted-foreground" />
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {uploadingImages ? 'Uploading...' : 'Upload Image'}
                            </span>
                            <Input
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              multiple
                              onChange={handleImageUpload}
                              disabled={uploadingImages}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Upload at least one image for your product
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
