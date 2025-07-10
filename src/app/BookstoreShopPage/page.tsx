"use client";
import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, Star, Heart } from 'lucide-react';

const BookstoreShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample book data
  const books = [
    {
      id: 1,
      title: "Thermodynamics",
      subtitle: "Satyaprakash",
      author: "Dr. Satyaprakash",
      price: 299,
      originalPrice: 399,
      image: "/api/placeholder/200/280",
      category: "Novel",
      rating: 4.5,
      isNew: true
    },
    {
      id: 2,
      title: "Mahabharat",
      subtitle: "Ancient Epic Retold",
      author: "Vyasa",
      price: 499,
      originalPrice: 699,
      image: "/api/placeholder/200/280",
      category: "Novel",
      rating: 4.8,
      isNew: false
    },
    {
      id: 3,
      title: "Marathi Vyakaranartha",
      subtitle: "Grammar Guide",
      author: "Prof. Sharma",
      price: 199,
      originalPrice: 249,
      image: "/api/placeholder/200/280",
      category: "Translations",
      rating: 4.2,
      isNew: true
    },
    {
      id: 4,
      title: "The Book Thief",
      subtitle: "A Novel",
      author: "Markus Zusak",
      price: 349,
      originalPrice: 449,
      image: "/api/placeholder/200/280",
      category: "Novel",
      rating: 4.7,
      isNew: false
    },
    {
      id: 5,
      title: "Thermodynamics Advanced",
      subtitle: "Satyaprakash Vol 2",
      author: "Dr. Satyaprakash",
      price: 399,
      originalPrice: 499,
      image: "/api/placeholder/200/280",
      category: "Novel",
      rating: 4.3,
      isNew: true
    },
    {
      id: 6,
      title: "Physics Fundamentals",
      subtitle: "Core Concepts",
      author: "Dr. Kumar",
      price: 279,
      originalPrice: 349,
      image: "/api/placeholder/200/280",
      category: "Kids' Stories",
      rating: 4.1,
      isNew: false
    },
    {
      id: 7,
      title: "Mathematics Today",
      subtitle: "Advanced Topics",
      author: "Prof. Verma",
      price: 329,
      originalPrice: 429,
      image: "/api/placeholder/200/280",
      category: "Translations",
      rating: 4.4,
      isNew: true
    },
    {
      id: 8,
      title: "Chemistry Handbook",
      subtitle: "Complete Guide",
      author: "Dr. Patel",
      price: 449,
      originalPrice: 549,
      image: "/api/placeholder/200/280",
      category: "Novel",
      rating: 4.6,
      isNew: false
    }
  ];

  const categories = ['All', 'Novel', 'Translations', 'Kids\' Stories'];

  const filteredBooks = books.filter(book => {
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const BookCard = ({ book }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative group">
        <img 
          src={book.image} 
          alt={book.title}
          className="w-full h-64 object-cover"
        />
        {book.isNew && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
            NEW
          </span>
        )}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors">
            Quick View
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(book.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">({book.rating})</span>
        </div>
        
        <h3 className="font-bold text-lg mb-1 text-gray-900">{book.title}</h3>
        <p className="text-gray-600 text-sm mb-1">{book.subtitle}</p>
        <p className="text-gray-500 text-sm mb-3">by {book.author}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-xl text-orange-600">₹{book.price}</span>
            <span className="text-gray-500 line-through text-sm">₹{book.originalPrice}</span>
          </div>
          <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors text-sm font-medium">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-orange-500 rounded flex items-center justify-center">
                  <span className="font-bold text-lg">N</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold">NETAJI</h1>
                  <p className="text-xs text-gray-300">BOOKPOINT</p>
                </div>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="hover:text-orange-400 transition-colors">Home</a>
              <a href="#" className="hover:text-orange-400 transition-colors">About</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Shop</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Delivery Team</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Sellers</a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-800 rounded">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded">
                <User className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="md:hidden p-2 hover:bg-gray-800 rounded">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore All Books Here</h1>
          <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search books or authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center">
          <button className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium">
            Load More Books
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-orange-500 rounded flex items-center justify-center">
                  <span className="font-bold text-lg">N</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">NETAJI</h3>
                  <p className="text-xs text-gray-300">BOOKPOINT</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Your trusted partner for quality books and educational materials.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Terms & Conditions</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Novels</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Translations</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Kids' Stories</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Academic</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p>📞 +91 12345 67890</p>
                <p>📧 info@netajibookpoint.com</p>
                <p>📍 Mumbai, Maharashtra</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Netaji Bookpoint. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BookstoreShopPage;