'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, User, Menu, X, Star, Heart, Book, TrendingUp, Award, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

 

const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
      const [searchQuery, setSearchQuery] = useState('');
      const [cartCount, setCartCount] = useState(3);
      const [featuredBooks, setFeaturedBooks] = useState([]);
      const [currentBookIndex, setCurrentBookIndex] = useState(0);
      const [currentSlide, setCurrentSlide] = useState(0);
    

   const navItems = [
    { name: 'Home', href: '/Home' },
    { name: 'About', href: '/About' },
    { name: 'Shop', href: '/BookstoreShopPage' },
    { name: 'Delivery Team', href: '/LoginForm' },
    { name: 'Sellers', href: '' }
  ];

  const router = useRouter();
    const handleClick = () => {
      router.push('/LoginForm');
    }
  return (

    <div className='bg-gray-900 text-white relative overflow-hidden'>
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-yellow-400 opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>
    <header >
          {/* Navigation */}
          <nav className="relative z-50 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                  <Book className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    NEHI
                  </h1>
                  <p className="text-xs text-gray-400 -mt-1">BOOKPOINT</p>
                </div>
              </div>
    
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 font-medium"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
    
              {/* Right side icons */}
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                  <Search className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-800 transition-colors relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </button>
                <button className="p-2 rounded-full hover:bg-gray-800 transition-colors" onClick={handleClick}>
                  <User className="w-5 h-5" />
                </button>
                <button
                  className="md:hidden p-2 rounded-full hover:bg-gray-800 transition-colors"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
    
            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900 bg-opacity-95 backdrop-blur-md border-t border-gray-800">
                <div className="px-6 py-4 space-y-4">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block text-gray-300 hover:text-yellow-400 transition-colors duration-300 font-medium"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </nav>
          </header>
    </div>
    
  );
   
};
export default Header;
