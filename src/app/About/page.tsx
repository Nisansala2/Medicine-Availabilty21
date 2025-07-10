
"use client"
import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X, Star, Heart, Book, TrendingUp, Award, Users, ChevronLeft, ChevronRight } from 'lucide-react';

// Assuming you have an About component in the same directory
// app/about/page.js
export default function About() {
  return (
    <div>
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
    
  );
}