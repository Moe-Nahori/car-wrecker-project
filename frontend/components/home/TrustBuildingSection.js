import React from 'react';
import { Star, Shield, Users, Award } from 'lucide-react';

function TrustBuildingSection() {
  const testimonials = [
    {
      text: "Quick, professional and hassle-free. Got a great price for my old Toyota and the pickup was done the same day. Highly recommended!",
      author: "Michael S.",
      location: "Perth",
      stars: 5
    },
    {
      text: "Best car selling experience ever. They matched competitor quotes and even arranged pickup within 2 hours. The payment was instant!",
      author: "Sarah M.",
      location: "Sydney",
      stars: 5
    },
    {
      text: "Needed to sell my damaged car quickly. They offered a fair price and handled everything professionally. Very satisfied with the service.",
      author: "David L.",
      location: "Melbourne",
      stars: 5
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Trust Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <Shield className="w-10 h-10 text-blue-600 mx-auto mb-4" />
            <div className="text-2xl font-bold text-gray-900 mb-2">Licensed & Insured</div>
            <p className="text-gray-600">All our wrecker partners are fully certified</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <Users className="w-10 h-10 text-blue-600 mx-auto mb-4" />
            <div className="text-2xl font-bold text-gray-900 mb-2">20,000+ Customers</div>
            <p className="text-gray-600">Trusted by thousands across Australia</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <Award className="w-10 h-10 text-blue-600 mx-auto mb-4" />
            <div className="text-2xl font-bold text-gray-900 mb-2">4.9/5 Rating</div>
            <p className="text-gray-600">Based on 15,000+ reviews</p>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted Across Australia
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who've chosen us for their car selling needs
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
              <div className="font-medium text-gray-900">
                - {testimonial.author} from {testimonial.location}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustBuildingSection;