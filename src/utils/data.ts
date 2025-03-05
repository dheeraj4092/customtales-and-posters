
import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    title: 'The Adventures of Luna',
    description: 'Join Luna in her magical adventure through the enchanted forest. Perfect for young readers who love fantasy and imagination.',
    price: 24.99,
    category: 'book',
    ageGroups: ['preschool', 'elementary'],
    images: ['/placeholder.svg'],
    featured: true,
    tags: ['fantasy', 'adventure', 'magic'],
    stock: 50
  },
  {
    id: '2',
    title: 'Cosmic Explorers',
    description: 'A beautifully illustrated book about space exploration, planets, and the wonders of the universe. Educational and engaging.',
    price: 29.99,
    category: 'book',
    ageGroups: ['elementary', 'middle'],
    images: ['/placeholder.svg'],
    featured: true,
    tags: ['space', 'science', 'educational'],
    stock: 35
  },
  {
    id: '3',
    title: 'Dinosaur Kingdom',
    description: 'Discover the world of dinosaurs in this fact-filled adventure book. Features detailed illustrations and interesting facts.',
    price: 19.99,
    category: 'book',
    ageGroups: ['preschool', 'elementary'],
    images: ['/placeholder.svg'],
    tags: ['dinosaurs', 'prehistoric', 'educational'],
    stock: 25
  },
  {
    id: '4',
    title: 'Ocean Adventures Poster',
    description: 'A vibrant poster featuring beautiful underwater scenes. Perfect for a child's bedroom or playroom.',
    price: 14.99,
    category: 'poster',
    ageGroups: ['preschool', 'elementary', 'middle'],
    images: ['/placeholder.svg'],
    featured: true,
    tags: ['ocean', 'nature', 'decoration'],
    stock: 100
  },
  {
    id: '5',
    title: 'Space Explorer Poster',
    description: 'An inspiring poster of the solar system with detailed illustrations of planets, stars, and space phenomena.',
    price: 16.99,
    category: 'poster',
    ageGroups: ['elementary', 'middle', 'teen'],
    images: ['/placeholder.svg'],
    tags: ['space', 'science', 'educational', 'decoration'],
    stock: 80
  },
  {
    id: '6',
    title: 'Alphabet Animals',
    description: 'Learn the alphabet with adorable animal illustrations for each letter. Perfect for early learners.',
    price: 22.99,
    category: 'book',
    ageGroups: ['toddler', 'preschool'],
    images: ['/placeholder.svg'],
    tags: ['alphabet', 'animals', 'educational'],
    stock: 60
  },
  {
    id: '7',
    title: 'Custom Storybook',
    description: 'Create a personalized storybook featuring your child as the main character. A unique and special gift.',
    price: 39.99,
    category: 'custom',
    ageGroups: ['toddler', 'preschool', 'elementary', 'middle'],
    images: ['/placeholder.svg'],
    featured: true,
    tags: ['personalized', 'custom', 'gift'],
    stock: 999
  },
  {
    id: '8',
    title: 'Custom Family Poster',
    description: 'Turn your family photos into a beautiful art poster. Various styles and themes available.',
    price: 29.99,
    category: 'custom',
    ageGroups: ['adult'],
    images: ['/placeholder.svg'],
    tags: ['personalized', 'custom', 'family', 'gift'],
    stock: 999
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getRelatedProducts = (productId: string): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];
  
  return products
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, 4);
};
