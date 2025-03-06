
import React from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';

interface ProductAttributesProps {
  form: UseFormReturn<any>;
}

const ProductAttributes: React.FC<ProductAttributesProps> = ({ form }) => {
  return (
    <>
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
    </>
  );
};

export default ProductAttributes;
