
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '@/components/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';

interface Poster {
  id: string;
  title: string;
  artist: string;
  price: number;
  imageUrl: string;
  description: string;
}

const PosterList: React.FC = () => {
  const { data: posters, isLoading, error } = useQuery({
    queryKey: ['posters'],
    queryFn: async () => {
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      return [
        {
          id: '1',
          title: 'Abstract Dreams',
          artist: 'Jane Doe',
          price: 24.99,
          imageUrl: '/placeholder.svg',
          description: 'A colorful abstract design with vibrant patterns.'
        },
        {
          id: '2',
          title: 'Mountain Sunset',
          artist: 'John Smith',
          price: 19.99,
          imageUrl: '/placeholder.svg',
          description: 'Beautiful mountain landscape at sunset with rich colors.'
        },
        {
          id: '3',
          title: 'Urban Life',
          artist: 'Alex Johnson',
          price: 22.99,
          imageUrl: '/placeholder.svg',
          description: 'A stylized cityscape showing the hustle and bustle of urban life.'
        },
        {
          id: '4',
          title: 'Ocean Waves',
          artist: 'Sam Wilson',
          price: 18.99,
          imageUrl: '/placeholder.svg',
          description: 'Calming ocean waves with a minimalist aesthetic.'
        }
      ] as Poster[];
    }
  });

  if (error) {
    return <div className="container py-20 text-center">Error loading posters</div>;
  }

  return (
    <div className="container py-20">
      <h1 className="text-3xl font-bold mb-8">Posters Collection</h1>
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-[200px] w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posters?.map(poster => (
            <ProductCard
              key={poster.id}
              id={poster.id}
              name={poster.title}
              price={poster.price}
              image={poster.imageUrl}
              category="poster"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PosterList;
