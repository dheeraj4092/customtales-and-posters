
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { AgeGroup } from '@/types';
import { ageGroups } from '@/utils/productFormUtils';

interface ProductAgeGroupsProps {
  form: UseFormReturn<any>;
}

const ProductAgeGroups: React.FC<ProductAgeGroupsProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="age_groups"
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
                name="age_groups"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={ageGroup.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(ageGroup.id)}
                          onCheckedChange={(checked) => {
                            const currentValue = [...field.value];
                            if (checked) {
                              currentValue.push(ageGroup.id);
                            } else {
                              const index = currentValue.indexOf(ageGroup.id);
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
  );
};

export default ProductAgeGroups;
