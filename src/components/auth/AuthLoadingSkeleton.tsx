
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const AuthLoadingSkeleton: React.FC = () => (
  <div className="container flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
    <Card className="w-full max-w-md">
      <CardHeader>
        <Skeleton className="h-8 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  </div>
);

export default AuthLoadingSkeleton;
