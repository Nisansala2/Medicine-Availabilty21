"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, User, Menu, X, Star, Heart, Book, TrendingUp, Award, Users, ChevronLeft, ChevronRight } from 'lucide-react';
// Assuming you have an About component in the same directory


const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [book, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  
 const [cartCount, setCartCount] = useState(3);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample featured books data
  const sampleBooks = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      price: 24.99,
      originalPrice: 29.99,
      rating: 4.8,
      reviews: 1250,
      image: "/api/placeholder/300/400",
      genre: "Fiction"
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      price: 19.99,
      originalPrice: 24.99,
      rating: 4.9,
      reviews: 2100,
      image: "/api/placeholder/300/400",
      genre: "Self-Help"
    },
    {
      id: 3,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      price: 22.99,
      originalPrice: 27.99,
      rating: 4.7,
      reviews: 1800,
      image: "/api/placeholder/300/400",
      genre: "Romance"
    }
  ];

  // Sample books for the book list
   const books = [
    {
      id: 1,
      title: "Thunmanhandiya",
      author: "Mahagamasekara",
      image: "/thunmanhandiya.webp",
      badge: "BEST SELLER",
     
    },
    {
      id: 2,
      title: "Gamperaliya",
      author: "Martin Wickramasinghe",
      image: "/gama.jpg",
      badge: "CLASSIC",
      badgeColor: "bg-blue-500"
    },
    {
      id: 3,
      title: "Nectar in a Sieve",
      author: "Kamala Markandaya",
      image: "/necter.jpg",
      badge: "AWARD WINNER",
      badgeColor: "bg-red-500"
    },
    {
      id: 4,
      title: "Adaraneeya Victoria",
      author: "Mohan Raj Madawala",
      image: "/wiktori.jpg",
      badge: "FEATURED",
      badgeColor: "bg-green-500"
    },
    {
      id: 5,
      title: "Island of a Thousand Mirrors",
      author: "Nayomi Munaweera",
      image: "/thun.jpg",
      badge: "NEW RELEASE",
      badgeColor: "bg-purple-500"
    },
    {
      id: 6,
      title: "The Mahabharata Quest",
      author: "Christopher C. Doyle",
      image: "/thun.jpg",
      badge: "TRENDING",
      badgeColor: "bg-yellow-500"
    }
  ];

    const booksPerSlide = 4;
  const totalSlides = Math.ceil(books.length / booksPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const getCurrentBooks = () => {
    const startIndex = currentSlide * booksPerSlide;
    return books.slice(startIndex, startIndex + booksPerSlide);
  };


  useEffect(() => {
    setFeaturedBooks(sampleBooks);
    setFilteredBooks(sampleBooks);
    // Auto-rotate featured books
    const interval = setInterval(() => {
      setCurrentBookIndex((prev) => (prev + 1) % sampleBooks.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

const handleSearch = () => {   
    console.log('Searching for:', searchQuery);     // Implement search functionality 
      };

  const stats = [
    { icon: Book, label: "Books Available", value: "50,000+" },
    { icon: Users, label: "Happy Readers", value: "25,000+" },
    { icon: Award, label: "Awards Won", value: "150+" },
    { icon: TrendingUp, label: "Daily Sales", value: "500+" }
  ];

  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '/About' },
    { name: 'Shop', href: '/BookstoreShopPage' },
    { name: 'Delivery Team', href: '/LoginForm' },
    { name: 'Sellers', href: '#' }
  ];

  const router = useRouter();
  const handleClick = () => {
    router.push('/LoginForm');
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
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

    

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
            The Book Lover's Dreamland Awaits!
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Welcome to the ultimate book lover's paradise! Join our community and contribute to the ever-evolving library of stories. Every book has a chance to inspire someone new.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search a book..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-2 px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 font-semibold"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Featured Book Display */}
        <div className="relative mb-16">
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* Floating Book Animation */}
              <div className="relative animate-bounce">
                <div className="w-96 h-64 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg transform rotate-3 opacity-20"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg transform -rotate-2 opacity-20"></div>
                  <div className="relative bg-gradient-to-br from-yellow-200 to-orange-200 rounded-lg p-8 shadow-2xl">
                    <div className="text-center">
                      <Book className="w-16 h-16 mx-auto mb-4 text-gray-800" />
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {featuredBooks[currentBookIndex]?.title || "Featured Book"}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        by {featuredBooks[currentBookIndex]?.author || "Amazing Author"}
                      </p>
                      <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(featuredBooks[currentBookIndex]?.rating || 5)
                                  ? 'text-yellow-500 fill-current'
                                  : 'text-gray-400'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          ({featuredBooks[currentBookIndex]?.reviews || 1000} reviews)
                        </span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-2xl font-bold text-gray-800">
                          ${featuredBooks[currentBookIndex]?.price || 19.99}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ${featuredBooks[currentBookIndex]?.originalPrice || 24.99}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating particles around the book */}
              <div className="absolute -top-4 -left-4 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute -top-2 -right-6 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -right-2 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
              <div className="absolute -bottom-6 -left-8 w-4 h-4 bg-yellow-300 rounded-full animate-bounce"></div>
            </div>
          </div>

          {/* Book navigation dots */}
          <div className="flex justify-center space-x-2 mb-8">
            {sampleBooks.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBookIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentBookIndex
                    ? 'bg-yellow-400 w-8'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gray-800 bg-opacity-50 rounded-xl backdrop-blur-sm border border-gray-700 hover:border-yellow-400 transition-all duration-300 hover:transform hover:scale-105"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="text-center space-y-4 md:space-y-0 md:space-x-6 md:flex md:justify-center">
          <button className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Explore Our Collection
          </button>
          <button className="w-full md:w-auto px-8 py-4 border-2 border-yellow-400 text-yellow-400 rounded-full font-semibold hover:bg-yellow-400 hover:text-black transition-all duration-300 transform hover:scale-105">
            Join Our Community
          </button>
        </div>

        {/* Quick Categories */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Fiction', 'Non-Fiction', 'Romance', 'Mystery'].map((category) => (
            <button
              key={category}
              className="p-4 bg-gray-800 bg-opacity-30 rounded-lg border border-gray-700 hover:border-yellow-400 transition-all duration-300 hover:bg-gray-700 hover:bg-opacity-50 group"
            >
              <div className="text-yellow-400 group-hover:text-yellow-300 font-semibold">
                {category}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center z-50">
        <Heart className="w-6 h-6 text-black" />
      </button>

      <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Our Best Picks
      </h2>
      
     
      {/* Carousel Container */}
      <div className="relative">
        {/* Main Carousel */}
        <div className="border-4 border-purple-400 rounded-lg p-6 bg-black shadow-lg">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg">
            {getCurrentBooks().map((book) => (
              <div key={book.id} className="relative group cursor-pointer">
                {/* Book Cover */}
                <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badge */}
                  <div className={`absolute top-2 left-2 ${book.badgeColor} text-white text-xs font-bold px-2 py-1 rounded transform -rotate-12`}>
                    {book.badge}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center text-white">
                        <Star className="w-4 h-4 fill-current mr-1" />
                        <span className="text-sm font-medium">4.5</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Book Info */}
                <div className="mt-3 text-center">
                  <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 text-xs">
                    {book.author}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentSlide
                    ? 'bg-purple-500'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Auto-scroll functionality */}
      <div className="mt-4 text-center">
        <button
          onClick={() => {
            const interval = setInterval(() => {
              setCurrentSlide((prev) => (prev + 1) % totalSlides);
            }, 3000);
            
            setTimeout(() => clearInterval(interval), 15000);
          }}
          className="text-purple-600 hover:text-purple-800 text-sm font-medium"
        >
          Start Auto-scroll
        </button>
      </div>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">About Us</h2>
            <p className="text-lg mb-6 text-gray-700">
              We are passionate about creating amazing digital experiences that help businesses 
              grow and connect with their audience effectively.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-gray-600">
                  We constantly push the boundaries of what's possible in digital design and development.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality</h3>
                <p className="text-gray-600">
                  Every project receives our full attention to detail and commitment to excellence.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Partnership</h3>
                <p className="text-gray-600">
                  We work closely with our clients to understand their needs and exceed expectations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    </div>
    
    
  );
  
};

export default Home;