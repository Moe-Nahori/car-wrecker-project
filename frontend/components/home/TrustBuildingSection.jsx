import React from 'react';
import { Star, Users, ThumbsUp, CheckCircle, Award, Shield, Leaf, Clock } from 'lucide-react';

const TrustBuildingSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Sydney",
      comment: "Fantastic service! Got $3,800 for my old Toyota that wasn't even running. They handled the pickup and paperwork professionally, and I had the money in my account that same day.",
      rating: 5,
      car: "Toyota Camry 2011"
    },
    {
      name: "Mike Thompson",
      location: "Melbourne",
      comment: "Quick, easy and hassle-free. The team was very professional and the payment was instant. They offered me $900 more than any other wrecker for my damaged Holden.",
      rating: 5,
      car: "Holden Commodore 2013"
    },
    {
      name: "Lisa Chen",
      location: "Brisbane",
      comment: "Best car wrecking service I've used. Fair price and excellent customer service. The entire process from quote to pickup took less than 24 hours.",
      rating: 5,
      car: "Mazda 3 2014"
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
      title: "25,000+ Customers",
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

  const certifications = [
    {
      name: "Australian Automotive Recyclers Association",
      icon: Shield
    },
    {
      name: "Environmental Protection Certified",
      icon: Leaf
    },
    {
      name: "15+ Years Industry Experience",
      icon: Award
    },
    {
      name: "Same Day Payment Guarantee",
      icon: Clock
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
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{indicator.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{indicator.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Certifications */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-16">
          {certifications.map((certification, index) => {
            const Icon = certification.icon;
            return (
              <div key={index} className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full border border-blue-100 dark:border-blue-800 flex items-center space-x-2">
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{certification.name}</span>
              </div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">"{testimonial.comment}"</p>
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{testimonial.car}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Ready to join our satisfied customers?
          </p>
          <a 
            href="/quote" 
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-colors duration-200"
          >
            Get Your Free Quote Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default TrustBuildingSection;