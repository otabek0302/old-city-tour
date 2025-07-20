"use client";

import React from "react";

interface PageClientProps {
  locale: string;
}

const PageClient: React.FC<PageClientProps> = ({ locale }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About Old City</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are passionate about creating unforgettable travel experiences and connecting people with the world's most amazing destinations.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* Our Story Section */}
          <section className="mb-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                <p className="text-gray-700 mb-4">
                  Founded in 2010, Old City Tour Agency began with a simple mission: to make extraordinary travel experiences accessible to everyone. What started as a small local tour company has grown into a trusted name in international travel.
                </p>
                <p className="text-gray-700 mb-4">
                  Our founders, experienced travelers themselves, understood that the best trips aren't just about seeing new places—they're about experiencing new cultures, meeting new people, and creating memories that last a lifetime.
                </p>
                <p className="text-gray-700">
                  Today, we've helped thousands of travelers explore over 50 countries across 6 continents, always maintaining our commitment to quality, authenticity, and personalized service.
                </p>
              </div>
              <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center">
                <span className="text-gray-500 text-lg">Company Image</span>
              </div>
            </div>
          </section>

          {/* Our Mission Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                To inspire and enable people to explore the world through authentic, sustainable, and unforgettable travel experiences.
              </p>
            </div>
          </section>

          {/* Values Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-2xl">🌍</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Authenticity</h3>
                <p className="text-gray-700">
                  We believe in authentic experiences that connect travelers with local cultures and traditions.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-2xl">♻️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Sustainability</h3>
                <p className="text-gray-700">
                  We're committed to responsible tourism that preserves destinations for future generations.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 text-2xl">⭐</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
                <p className="text-gray-700">
                  We strive for excellence in every aspect of our service, from planning to execution.
                </p>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-gray-200 w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-500">Photo</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Sarah Johnson</h3>
                <p className="text-gray-600">Founder & CEO</p>
              </div>
              <div className="text-center">
                <div className="bg-gray-200 w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-500">Photo</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Michael Chen</h3>
                <p className="text-gray-600">Head of Operations</p>
              </div>
              <div className="text-center">
                <div className="bg-gray-200 w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-500">Photo</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Emma Rodriguez</h3>
                <p className="text-gray-600">Travel Specialist</p>
              </div>
              <div className="text-center">
                <div className="bg-gray-200 w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-500">Photo</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">David Kim</h3>
                <p className="text-gray-600">Customer Experience</p>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="mb-16">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Impact</h2>
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
                  <p className="text-gray-600">Happy Travelers</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
                  <p className="text-gray-600">Countries Visited</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
                  <p className="text-gray-600">Tours Organized</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-orange-600 mb-2">13</div>
                  <p className="text-gray-600">Years of Experience</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PageClient; 