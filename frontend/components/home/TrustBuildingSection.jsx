import React from 'react';
import { Star, Users, ThumbsUp, CheckCircle } from 'lucide-react';

const TrustBuildingSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Sydney",
      comment: "Fantastic service! Got a great price for my old Toyota and they handled everything professionally.",
      rating: 5
    },
    {
      name: "Mike Thompson",
      location: "Melbourne",
      comment: "Quick, easy and hassle-free. The team was very professional and the payment was instant.",
      rating: 5
    },
    {
      name: "Lisa Chen",
      location: "Brisbane",
      comment: "Best car wrecking service I've used. Fair price and excellent customer service.",
      rating: 5
    }
  ];

  const trustIndicators = [
    {
      icon: Star,
      title: "4.9/5 Rating",
      description: "From over 10,000 verified reviews"
    },
    {
      icon: Users,
      title: "20,000+ Customers",
      description: "Trusted by thousands across Australia"
    },
    {
      icon: ThumbsUp,
      title: "Best Price Guarantee",
      description: "We match or beat any legitimate quote"
    },
    {
      icon: CheckCircle,
      title: "Licensed & Insured",
      description: "Fully compliant with regulations"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Join our satisfied customers who've experienced our premium car wrecking service
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustIndicators.map((indicator, index) => {
            const Icon = indicator.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <div className="flex items-center space-x-4">
                  <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{indicator.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{indicator.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">"{testimonial.comment}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBuildingSection;