"use client";
import React, { useState } from 'react';
import { Search, ShoppingCart, User, Heart, Star, MapPin, Phone, Mail, Shield, Truck, Clock, ChevronRight, Filter, X, Plus, Minus, Eye, EyeOff, LogOut, Settings, UserCircle } from 'lucide-react';

const MedicineMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  interface CartItem extends Medicine {
    quantity: number;
  }
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([]);
  
  // User authentication states
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    confirmPassword: ''
  });

  const categories = [
    { id: 'rare', name: 'Rare Diseases', icon: '🧬', count: 245 },
    { id: 'oncology', name: 'Oncology', icon: '🎗️', count: 189 },
    { id: 'orphan', name: 'Orphan Drugs', icon: '💊', count: 156 },
    { id: 'specialty', name: 'Specialty Meds', icon: '⚕️', count: 312 },
    { id: 'imported', name: 'Imported Drugs', icon: '🌍', count: 78 },
    { id: 'compounded', name: 'Compounded', icon: '🧪', count: 134 }
  ];

  const featuredMedicines = [
    {
      id: 1,
      name: 'Kalydeco (Ivacaftor)',
      category: 'Rare Diseases',
      price: '₹2,45,000',
      originalPrice: '₹2,80,000',
      image: '🧬',
      rating: 4.8,
      reviews: 24,
      availability: 'In Stock',
      description: 'For Cystic Fibrosis (G551D mutation)',
      prescription: true,
      rare: true,
      keywords: ['kalydeco', 'ivacaftor', 'cystic fibrosis', 'rare disease', 'lung', 'genetic']
    },
    {
      id: 2,
      name: 'Spinraza (Nusinersen)',
      category: 'Orphan Drugs',
      price: '₹15,50,000',
      originalPrice: '₹16,00,000',
      image: '💉',
      rating: 4.9,
      reviews: 18,
      availability: 'Limited Stock',
      description: 'For Spinal Muscular Atrophy',
      prescription: true,
      rare: true,
      keywords: ['spinraza', 'nusinersen', 'spinal muscular atrophy', 'sma', 'muscle', 'genetic']
    },
    {
      id: 3,
      name: 'Zolgensma (Onasemnogene)',
      category: 'Gene Therapy',
      price: 'On Request',
      originalPrice: '',
      image: '🧪',
      rating: 5.0,
      reviews: 12,
      availability: 'Special Order',
      description: 'Gene therapy for SMA',
      prescription: true,
      rare: true,
      keywords: ['zolgensma', 'onasemnogene', 'gene therapy', 'sma', 'genetic', 'therapy']
    },
    {
      id: 4,
      name: 'Keytruda (Pembrolizumab)',
      category: 'Oncology',
      price: '₹1,85,000',
      originalPrice: '₹2,10,000',
      image: '🎗️',
      rating: 4.7,
      reviews: 45,
      availability: 'In Stock',
      description: 'Immunotherapy for various cancers',
      prescription: true,
      rare: false,
      keywords: ['keytruda', 'pembrolizumab', 'cancer', 'immunotherapy', 'oncology', 'tumor']
    },
    {
      id: 5,
      name: 'Soliris (Eculizumab)',
      category: 'Rare Diseases',
      price: '₹3,20,000',
      originalPrice: '₹3,50,000',
      image: '🔬',
      rating: 4.6,
      reviews: 31,
      availability: 'In Stock',
      description: 'For Paroxysmal Nocturnal Hemoglobinuria',
      prescription: true,
      rare: true,
      keywords: ['soliris', 'eculizumab', 'pnh', 'hemoglobinuria', 'blood disorder', 'complement']
    },
    {
      id: 6,
      name: 'Replagal (Agalsidase alfa)',
      category: 'Orphan Drugs',
      price: '₹1,95,000',
      originalPrice: '₹2,15,000',
      image: '🧬',
      rating: 4.5,
      reviews: 28,
      availability: 'Limited Stock',
      description: 'For Fabry Disease',
      prescription: true,
      rare: true,
      keywords: ['replagal', 'agalsidase', 'fabry disease', 'enzyme replacement', 'genetic']
    },
    {
      id: 7,
      name: 'Cerdelga (Eliglustat)',
      category: 'Rare Diseases',
      price: '₹4,50,000',
      originalPrice: '₹4,80,000',
      image: '💊',
      rating: 4.7,
      reviews: 22,
      availability: 'In Stock',
      description: 'For Gaucher Disease Type 1',
      prescription: true,
      rare: true,
      keywords: ['cerdelga', 'eliglustat', 'gaucher disease', 'genetic disorder', 'enzyme']
    },
    {
      id: 8,
      name: 'Opdivo (Nivolumab)',
      category: 'Oncology',
      price: '₹2,10,000',
      originalPrice: '₹2,35,000',
      image: '🎗️',
      rating: 4.8,
      reviews: 67,
      availability: 'In Stock',
      description: 'Immunotherapy for melanoma, lung cancer',
      prescription: true,
      rare: false,
      keywords: ['opdivo', 'nivolumab', 'cancer', 'melanoma', 'lung cancer', 'immunotherapy']
    }
  ];

  // Search and filter functionality
  interface Medicine {
    id: number;
    name: string;
    category: string;
    price: string;
    originalPrice: string;
    image: string;
    rating: number;
    reviews: number;
    availability: string;
    description: string;
    prescription: boolean;
    rare: boolean;
    keywords: string[];
  }

  type CategoryId = string;

  const searchMedicines = (
    medicines: Medicine[],
    term: string,
    category: CategoryId
  ): Medicine[] => {
    let filtered = medicines;

    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter(medicine => 
        medicine.category.toLowerCase().includes(category.toLowerCase()) ||
        medicine.keywords.some(keyword => keyword.includes(category.toLowerCase()))
      );
    }

    // Filter by search term
    if (term.trim() !== '') {
      const searchLower = term.toLowerCase();
      filtered = filtered.filter(medicine => 
        medicine.name.toLowerCase().includes(searchLower) ||
        medicine.description.toLowerCase().includes(searchLower) ||
        medicine.keywords.some(keyword => keyword.includes(searchLower)) ||
        medicine.category.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  };

  // Update filtered medicines when search term or category changes
  React.useEffect(() => {
    const filtered = searchMedicines(featuredMedicines, searchTerm, selectedCategory);
    setFilteredMedicines(filtered);
  }, [searchTerm, selectedCategory]);

  // Initialize filtered medicines
  React.useEffect(() => {
    setFilteredMedicines(featuredMedicines);
  }, []);

  const addToCart = (medicine) => {
    const existingItem = cartItems.find(item => item.id === medicine.id);
    
    if (existingItem) {
      // If item already exists, increase quantity
      setCartItems(cartItems.map(item => 
        item.id === medicine.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      // Add new item with quantity 1
      setCartItems([...cartItems, { ...medicine, quantity: 1 }]);
    }
  };

  const removeFromCart = (medicineId) => {
    setCartItems(cartItems.filter(item => item.id !== medicineId));
  };

  const updateQuantity = (medicineId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(medicineId);
    } else {
      setCartItems(cartItems.map(item => 
        item.id === medicineId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[₹,]/g, '')) || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Authentication functions
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login - in real app, you'd call an API
    if (formData.email && formData.password) {
      const userData = {
        id: 1,
        email: formData.email,
        firstName: formData.firstName || 'John',
        lastName: formData.lastName || 'Doe',
        phone: formData.phone || '+91 9876543210',
        avatar: '👤'
      };
      setUser(userData);
      setShowAuthModal(false);
      setFormData({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
        confirmPassword: ''
      });
      alert('Login successful!');
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Validate form
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      alert('Please fill in all required fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    // Simulate signup - in real app, you'd call an API
    const userData = {
      id: Date.now(),
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      avatar: '👤'
    };
    setUser(userData);
    setShowAuthModal(false);
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      confirmPassword: ''
    });
    alert('Account created successfully!');
  };

  const handleLogout = () => {
    setUser(null);
    setShowUserMenu(false);
    setCartItems([]); // Clear cart on logout
    alert('Logged out successfully!');
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  M
                </div>
                <span className="text-2xl font-bold text-gray-900">MediRare</span>
              </div>
            </div>
            
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search rare medicines, treatments, diseases..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
              {searchTerm && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-10 max-h-60 overflow-y-auto">
                  {filteredMedicines.length > 0 ? (
                    <div className="p-2">
                      <div className="text-sm text-gray-600 px-3 py-2 border-b">
                        {filteredMedicines.length} medicine(s) found
                      </div>
                      {filteredMedicines.slice(0, 5).map((medicine) => (
                        <div
                          key={medicine.id}
                          className="flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer rounded-lg"
                          onClick={() => {
                            setSearchTerm(medicine.name);
                            // You can add navigation to medicine detail page here
                          }}
                        >
                          <div className="text-2xl">{medicine.image}</div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">{medicine.name}</div>
                            <div className="text-sm text-gray-600">{medicine.category}</div>
                            <div className="text-sm text-blue-600 font-semibold">{medicine.price}</div>
                          </div>
                        </div>
                      ))}
                      {filteredMedicines.length > 5 && (
                        <div className="text-center text-sm text-gray-500 py-2">
                          And {filteredMedicines.length - 5} more...
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      <Search className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                      <p>No medicines found for "{searchTerm}"</p>
                      <p className="text-sm">Try searching for conditions, medicine names, or categories</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-blue-600 relative">
                <Heart className="h-6 w-6" />
              </button>
              <button 
                className="p-2 text-gray-600 hover:text-blue-600 relative"
                onClick={() => setShowCart(true)}
              >
                <ShoppingCart className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
              
              {/* User Authentication */}
              {user ? (
                <div className="relative">
                  <button 
                    className="flex items-center space-x-2 p-2 text-gray-600 hover:text-blue-600"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                    </div>
                    <span className="hidden md:block font-medium">{user.firstName}</span>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{user.firstName} {user.lastName}</div>
                            <div className="text-sm text-gray-600">{user.email}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="py-2">
                        <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                          <UserCircle className="h-4 w-4" />
                          <span>My Profile</span>
                        </button>
                        <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                          <ShoppingCart className="h-4 w-4" />
                          <span>My Orders</span>
                        </button>
                        <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </button>
                      </div>
                      
                      <div className="border-t border-gray-100 py-2">
                        <button 
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center space-x-2"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => openAuthModal('login')}
                    className="px-4 py-2 text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => openAuthModal('signup')}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold">Shopping Cart ({getTotalItems()} items)</h2>
              <button 
                onClick={() => setShowCart(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 max-h-96 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                  <p className="text-gray-400">Add some medicines to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="text-3xl">{item.image}</div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-gray-600 text-sm">{item.category}</p>
                        <p className="text-blue-600 font-bold">{item.price}</p>
                        {item.prescription && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            Prescription Required
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {cartItems.length > 0 && (
              <div className="border-t p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold">Total: ₹{getTotalPrice().toLocaleString('en-IN')}</span>
                  <span className="text-gray-600">{getTotalItems()} items</span>
                </div>
                
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                    Proceed to Checkout
                  </button>
                  <button 
                    onClick={() => setShowCart(false)}
                    className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold">
                {authMode === 'login' ? 'Login to MediRare' : 'Create Account'}
              </h2>
              <button 
                onClick={() => setShowAuthModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              <form onSubmit={authMode === 'login' ? handleLogin : handleSignup} className="space-y-4">
                {authMode === 'signup' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="John"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </>
                )}
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {authMode === 'signup' && (
                    <p className="text-xs text-gray-600 mt-1">Password must be at least 6 characters</p>
                  )}
                </div>
                
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                )}
                
                {authMode === 'signup' && (
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700">
                      I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                    </label>
                  </div>
                )}
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  {authMode === 'login' ? 'Login' : 'Create Account'}
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  {authMode === 'login' ? "Don't have an account?" : "Already have an account?"}
                  <button
                    onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                    className="ml-2 text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    {authMode === 'login' ? 'Sign Up' : 'Login'}
                  </button>
                </p>
              </div>
              
              {authMode === 'login' && (
                <div className="mt-4 text-center">
                  <button className="text-blue-600 hover:text-blue-700 text-sm">
                    Forgot your password?
                  </button>
                </div>
              )}
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center text-sm text-gray-600 mb-4">Or continue with</div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-xl mr-2">🔍</span>
                    Google
                  </button>
                  <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-xl mr-2">📱</span>
                    OTP
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Rare & Specialty Medicines
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Access hard-to-find medications with verified prescriptions and expert guidance
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                <Shield className="h-5 w-5" />
                <span>Verified Medicines</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                <Truck className="h-5 w-5" />
                <span>Cold Chain Delivery</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                <Clock className="h-5 w-5" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Specialty Medicine Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg border ${
                  selectedCategory === category.id 
                    ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-500' 
                    : 'bg-gray-50 hover:bg-blue-50 hover:border-blue-200'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.count} medicines</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Medicines */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {searchTerm ? `Search Results for "${searchTerm}"` : 
                 selectedCategory !== 'all' ? `${categories.find(c => c.id === selectedCategory)?.name} Medicines` :
                 'Featured Rare Medicines'}
              </h2>
              <p className="text-gray-600 mt-2">
                {filteredMedicines.length} medicine(s) {searchTerm || selectedCategory !== 'all' ? 'found' : 'available'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {(searchTerm || selectedCategory !== 'all') && (
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="text-blue-600 hover:text-blue-700 font-semibold flex items-center"
                >
                  Clear Filters <X className="ml-1 h-4 w-4" />
                </button>
              )}
              <button className="flex items-center text-blue-600 hover:text-blue-700 font-semibold">
                View All <ChevronRight className="ml-1 h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMedicines.length > 0 ? (
              filteredMedicines.map((medicine) => (
                <div key={medicine.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-4xl">{medicine.image}</div>
                      {medicine.rare && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-semibold">
                          RARE
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-bold text-lg mb-2 text-gray-900">{medicine.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{medicine.category}</p>
                    <p className="text-sm text-gray-500 mb-4">{medicine.description}</p>
                    
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(medicine.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">({medicine.reviews})</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">{medicine.price}</span>
                        {medicine.originalPrice && (
                          <span className="ml-2 text-sm text-gray-500 line-through">{medicine.originalPrice}</span>
                        )}
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        medicine.availability === 'In Stock' ? 'bg-green-100 text-green-800' :
                        medicine.availability === 'Limited Stock' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {medicine.availability}
                      </span>
                    </div>
                    
                    {medicine.prescription && (
                      <div className="mb-4 p-2 bg-blue-50 rounded-lg">
                        <p className="text-xs text-blue-800 font-semibold">⚠️ Prescription Required</p>
                      </div>
                    )}
                    
                    <button 
                      onClick={() => addToCart(medicine)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                      disabled={medicine.availability === 'Out of Stock' || !user}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>
                        {!user ? 'Login to Add' :
                         cartItems.find(item => item.id === medicine.id) 
                          ? `In Cart (${cartItems.find(item => item.id === medicine.id)?.quantity})` 
                          : 'Add to Cart'
                        }
                      </span>
                    </button>
                    
                    {!user && (
                      <p className="text-xs text-center text-gray-500 mt-2">
                        <button 
                          onClick={() => openAuthModal('login')}
                          className="text-blue-600 hover:underline"
                        >
                          Login
                        </button> required to purchase medicines
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No medicines found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search terms or browse our categories
                </p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
                >
                  Show All Medicines
                </button>
              </div>
            )}
          </div>
        </div>
      </section>



      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Why Choose MediRare?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Verified & Authentic</h3>
              <p className="text-gray-600">All medicines are sourced from licensed manufacturers and verified for authenticity.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Cold Chain Delivery</h3>
              <p className="text-gray-600">Temperature-controlled delivery ensures medicine efficacy and safety.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">24/7 Expert Support</h3>
              <p className="text-gray-600">Our pharmacists and medical experts are available round the clock for guidance.</p>
            </div>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                  M
                </div>
                <span className="text-xl font-bold">MediRare</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted partner in accessing rare and specialty medicines with verified prescriptions and expert care.
              </p>
              <div className="flex space-x-4">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">+91 1800-123-4567</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">How It Works</a></li>
                <li><a href="#" className="hover:text-white">Prescription Upload</a></li>
                <li><a href="#" className="hover:text-white">Track Order</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Rare Diseases</a></li>
                <li><a href="#" className="hover:text-white">Oncology</a></li>
                <li><a href="#" className="hover:text-white">Orphan Drugs</a></li>
                <li><a href="#" className="hover:text-white">Gene Therapy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MediRare. All rights reserved. Licensed pharmacy with regulatory compliance.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MedicineMarketplace;