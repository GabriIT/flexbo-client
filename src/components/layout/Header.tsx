
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="mr-6">
            <h1 className="text-2xl font-bold text-flexbo-primary">Flexbo</h1>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/products/packaging-boxes" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium">Packaging Boxes</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Custom printed packaging boxes for products
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/products/pouches" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium">Flexible Pouches</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Stand-up pouches and flexible packaging solutions
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/products/labels" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium">Labels & Stickers</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Customized labels for branding and information
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/products/bags" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text:accent-foreground">
                            <div className="text-sm font-medium">Paper Bags</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Eco-friendly paper bag solutions
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/solutions/food-industry" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium">Food Industry</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Packaging solutions for food and beverages
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/solutions/retail" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium">Retail & E-commerce</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Enhance unboxing experiences with custom packaging
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/solutions/cosmetics" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium">Cosmetics & Beauty</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Elegant packaging solutions for beauty products
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/certifications" className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50")}>
                    Certifications
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/about" className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50")}>
                    About Us
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/contact" className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50")}>
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-2">
          <Button variant="outline" asChild>
            <Link to="/auth/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/auth/register">Get Started</Link>
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={mobileMenuOpen ? "hidden" : "block"}>
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={mobileMenuOpen ? "block" : "hidden"}>
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden py-2 border-t border-gray-200">
          <div className="container space-y-1">
            <div className="py-2">
              <h3 className="font-medium mb-1">Products</h3>
              <div className="pl-4 space-y-1">
                <Link to="/products/packaging-boxes" className="block py-1.5 text-gray-600 text-sm">Packaging Boxes</Link>
                <Link to="/products/pouches" className="block py-1.5 text-gray-600 text-sm">Flexible Pouches</Link>
                <Link to="/products/labels" className="block py-1.5 text-gray-600 text-sm">Labels & Stickers</Link>
                <Link to="/products/bags" className="block py-1.5 text-gray-600 text-sm">Paper Bags</Link>
              </div>
            </div>
            
            <div className="py-2">
              <h3 className="font-medium mb-1">Solutions</h3>
              <div className="pl-4 space-y-1">
                <Link to="/solutions/food-industry" className="block py-1.5 text-gray-600 text-sm">Food Industry</Link>
                <Link to="/solutions/retail" className="block py-1.5 text-gray-600 text-sm">Retail & E-commerce</Link>
                <Link to="/solutions/cosmetics" className="block py-1.5 text-gray-600 text-sm">Cosmetics & Beauty</Link>
              </div>
            </div>
            
            <Link to="/certifications" className="block py-2 font-medium">Certifications</Link>
            <Link to="/about" className="block py-2 font-medium">About Us</Link>
            <Link to="/contact" className="block py-2 font-medium">Contact</Link>
            
            <div className="pt-4 pb-2 flex flex-col space-y-2">
              <Button variant="outline" asChild>
                <Link to="/auth/login" className="w-full text-center">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/auth/register" className="w-full text-center">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
