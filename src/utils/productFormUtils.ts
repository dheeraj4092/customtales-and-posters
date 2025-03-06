
import { AgeGroup } from '@/types';

export const ageGroups = [
  { id: 'toddler' as AgeGroup, label: 'Toddler (0-3 years)' },
  { id: 'preschool' as AgeGroup, label: 'Preschool (3-5 years)' },
  { id: 'elementary' as AgeGroup, label: 'Elementary (5-12 years)' },
  { id: 'middle' as AgeGroup, label: 'Middle School (12-14 years)' },
  { id: 'teen' as AgeGroup, label: 'Teen (14-18 years)' },
  { id: 'adult' as AgeGroup, label: 'Adult (18+ years)' }
];

export const formSchema = () => {
  const z = require('zod');
  return z.object({
    title: z.string().min(2, { message: 'Title must be at least 2 characters' }),
    description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
    price: z.coerce.number().positive({ message: 'Price must be a positive number' }),
    category: z.enum(['book', 'poster', 'custom'] as const),
    age_groups: z.array(z.enum(['toddler', 'preschool', 'elementary', 'middle', 'teen', 'adult'] as const))
      .min(1, { message: 'Select at least one age group' }),
    featured: z.boolean().default(false),
    stock: z.coerce.number().int().nonnegative({ message: 'Stock must be a non-negative integer' }),
    tags: z.string().transform(val => val ? val.split(',').map(tag => tag.trim()) : []),
    images: z.array(z.string()).min(1, { message: 'At least one image is required' }),
  });
};
