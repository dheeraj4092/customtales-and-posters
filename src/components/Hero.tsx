
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent/30 to-transparent" />
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          {/* Decorative grid pattern */}
          <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMwMDAiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBtLTMwIDBhMzAgMzAgMCAxIDAgNjAgMCAzMCAzMCAwIDEgMC02MCAwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iLjUiLz48cGF0aCBkPSJNMzAgMzBtLTI1IDBhMjUgMjUgMCAxIDAgNTAgMCAyNSAyNSAwIDEgMC01MCAwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iLjUiLz48cGF0aCBkPSJNMzAgMzBtLTIwIDBhMjAgMjAgMCAxIDAgNDAgMCAyMCAyMCAwIDEgMC00MCAwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iLjUiLz48L2c+PC9zdmc+')]" />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 pt-32 md:pt-40 lg:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 animate-fade-up">
            <div className="space-y-6 max-w-xl">
              <span className="inline-block px-3 py-1 rounded-full bg-accent text-primary-foreground text-sm font-medium">
                Personalized Stories & Art
              </span>
              
              <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                Make Your Child the Hero of Their Own Story
              </h1>
              
              <p className="text-xl text-muted-foreground">
                Create personalized books and posters that feature your child in magical adventures and cherished memories.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/custom-order">
                  <Button size="lg" className="rounded-full group">
                    Create Custom Story
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                
                <Link to="/products?category=book">
                  <Button size="lg" variant="outline" className="rounded-full">
                    Shop Books & Posters
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 mx-auto lg:mx-0 relative">
            <div className="relative w-[300px] md:w-[400px] aspect-[3/4]">
              {/* Main image */}
              <div className={cn(
                "absolute inset-0 rounded-2xl overflow-hidden shadow-elevated",
                "animate-fade-up [animation-delay:0.2s]"
              )}>
                <img 
                  src="/placeholder.svg" 
                  alt="Personalized storybook example" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-xl bg-primary rotate-6 animate-fade-up [animation-delay:0.4s]" />
              <div className="absolute -top-4 -right-8 w-16 h-16 rounded-lg bg-accent rotate-12 animate-fade-up [animation-delay:0.6s]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
