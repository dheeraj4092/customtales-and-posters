
import React from 'react';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Image, Palette } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Products */}
      <FeaturedProducts />
      
      {/* Categories Section */}
      <section className="py-20">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
              Explore Our Categories
            </h2>
            <p className="mt-4 text-muted-foreground">
              From educational books to custom family posters, find the perfect item for every occasion.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Books */}
            <div className="bg-white rounded-2xl p-8 shadow-subtle hover:shadow-elevated transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">Children's Books</h3>
              <p className="text-muted-foreground mb-6">
                Educational and entertaining books for children of all ages, from toddlers to teens.
              </p>
              <Link to="/products?category=book">
                <Button variant="outline" className="rounded-full group">
                  Browse Books
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            
            {/* Posters */}
            <div className="bg-white rounded-2xl p-8 shadow-subtle hover:shadow-elevated transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Image className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">Decorative Posters</h3>
              <p className="text-muted-foreground mb-6">
                Beautiful posters for children's rooms, featuring educational and inspirational designs.
              </p>
              <Link to="/products?category=poster">
                <Button variant="outline" className="rounded-full group">
                  Browse Posters
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            
            {/* Custom Orders */}
            <div className="bg-white rounded-2xl p-8 shadow-subtle hover:shadow-elevated transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Palette className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">Custom Creations</h3>
              <p className="text-muted-foreground mb-6">
                Personalized books and posters featuring your child or family, created by our design team.
              </p>
              <Link to="/custom-order">
                <Button variant="outline" className="rounded-full group">
                  Start Custom Order
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-20 bg-accent/30">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
              How Custom Orders Work
            </h2>
            <p className="mt-4 text-muted-foreground">
              Creating your personalized book or poster is simple and collaborative.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Line connecting steps (desktop only) */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-border z-0" />
            
            {/* Step 1 */}
            <div className="relative z-10">
              <div className="bg-white rounded-2xl p-8 shadow-subtle text-center h-full">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold">
                  1
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">Submit Your Request</h3>
                <p className="text-muted-foreground">
                  Upload photos and provide details about the story or poster you'd like to create.
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative z-10">
              <div className="bg-white rounded-2xl p-8 shadow-subtle text-center h-full">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold">
                  2
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">Review & Approve Design</h3>
                <p className="text-muted-foreground">
                  Our designers create a custom draft for your review and make revisions if needed.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative z-10">
              <div className="bg-white rounded-2xl p-8 shadow-subtle text-center h-full">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold">
                  3
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">Receive Your Creation</h3>
                <p className="text-muted-foreground">
                  Once approved, we'll print and ship your custom book or poster directly to you.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/custom-order">
              <Button size="lg" className="rounded-full">
                Start Your Custom Order
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials - Simplified for MVP */}
      <section className="py-20">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
              What Our Customers Say
            </h2>
            <p className="mt-4 text-muted-foreground">
              Join the thousands of happy families who've brought stories to life.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-subtle max-w-3xl mx-auto text-center">
            <div className="mb-6">
              {/* Stars */}
              <div className="flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-lg italic mb-6">
              "The custom storybook featuring my daughter as the main character was absolutely magical. She was thrilled to see herself in the story, and it's become her favorite bedtime book. The quality is outstanding!"
            </p>
            <div>
              <p className="font-semibold">Sarah Thompson</p>
              <p className="text-sm text-muted-foreground">Mother of 2</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
