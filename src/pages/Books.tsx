
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '@/components/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  imageUrl: string;
  description: string;
}

const BookList: React.FC = () => {
  const { data: books, isLoading, error } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      return [
        {
          id: '1',
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          price: 12.99,
          imageUrl: '/placeholder.svg',
          description: 'A classic novel about the Jazz Age in America.'
        },
        {
          id: '2',
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          price: 14.99,
          imageUrl: '/placeholder.svg',
          description: 'A novel about racial injustice in the American South.'
        },
        {
          id: '3',
          title: '1984',
          author: 'George Orwell',
          price: 11.99,
          imageUrl: '/placeholder.svg',
          description: 'A dystopian novel about totalitarianism and surveillance.'
        },
        {
          id: '4',
          title: 'Pride and Prejudice',
          author: 'Jane Austen',
          price: 9.99,
          imageUrl: '/placeholder.svg',
          description: 'A romantic novel about social standing and marriage in early 19th-century England.'
        }
      ] as Book[];
    }
  });

  if (error) {
    return <div className="container py-20 text-center">Error loading books</div>;
  }

  return (
    <div className="container py-20">
      <h1 className="text-3xl font-bold mb-8">Books Collection</h1>
      
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
          {books?.map(book => (
            <ProductCard
              key={book.id}
              id={book.id}
              name={book.title}
              price={book.price}
              image={book.imageUrl}
              category="book"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
