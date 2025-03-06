
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/Icons';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { uploadProductImage } from '@/services/productService';

interface ProductImageUploadProps {
  form: UseFormReturn<any>;
  uploadingImages: boolean;
  setUploadingImages: (value: boolean) => void;
}

const ProductImageUpload: React.FC<ProductImageUploadProps> = ({ 
  form, 
  uploadingImages, 
  setUploadingImages 
}) => {
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

  return (
    <FormField
      control={form.control}
      name="images"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Images</FormLabel>
          <FormControl>
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {field.value.map((image: string, index: number) => (
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
  );
};

export default ProductImageUpload;
