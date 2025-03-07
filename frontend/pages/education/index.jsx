import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ChevronRight, Info, Recycle, DollarSign, FileText, BookOpen } from 'lucide-react';
import { getCompanyName } from '../../utils/config';

const EducationIndexPage = () => {
  const companyName = getCompanyName();
  
  // Educational resources categories
  const categories = [
    {
      title: "Car Wrecking Process",
      description: "Learn about the step-by-step process of car wrecking and recycling",
      icon: <Recycle className="w-12 h-12 text-blue-600" />,
      href: "/education/car-wrecking-process",
      articles: [
        { title: "The Complete Car Wrecking Process Explained", href: "/education/car-wrecking-process#complete-process" },
        { title: "Salvageable Parts: What Can Be Reused", href: "/education/car-wrecking-process#salvageable-parts" },
        { title: "Safe Disposal of Hazardous Materials", href: "/education/car-wrecking-process#hazardous-materials" }
      ]
    },
    {
      title: "Environmental Impact",
      description: "Discover how proper car recycling helps protect our environment",
      icon: <Info className="w-12 h-12 text-green-600" />,
      href: "/education/environmental-impact",
      articles: [
        { title: "How Car Recycling Reduces Carbon Footprint", href: "/education/environmental-impact#carbon-footprint" },
        { title: "Metal Recycling: Resource Conservation", href: "/education/environmental-impact#metal-recycling" },
        { title: "Preventing Toxic Leakage from Abandoned Vehicles", href: "/education/environmental-impact#toxic-leakage" }
      ]
    },
    {
      title: "Vehicle Value Assessment",
      description: "Understand how we determine your car's value",
      icon: <DollarSign className="w-12 h-12 text-yellow-600" />,
      href: "/education/value-assessment",
      articles: [
        { title: "Factors That Affect Your Car's Value", href: "/education/value-assessment#value-factors" },
        { title: "Understanding Scrap vs. Parts Value", href: "/education/value-assessment#scrap-vs-parts" },
        { title: "Market Trends in Car Recycling Industry", href: "/education/value-assessment#market-trends" }
      ]
    },
    {
      title: "FAQs & Resources",
      description: "Answers to common questions and helpful resources",
      icon: <FileText className="w-12 h-12 text-purple-600" />,
      href: "/education/faqs",
      articles: [
        { title: "Frequently Asked Questions", href: "/education/faqs" },
        { title: "Documents Needed to Sell Your Car", href: "/education/documents-needed" },
        { title: "Legal Requirements for Car Disposal", href: "/education/legal-requirements" }
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>Car Wrecking Education & Resources | {companyName}</title>
        <meta name="description" content="Learn about car wrecking, recycling, environmental impact, and how to get the best value for your end-of-life vehicle." />
      </Head>
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero section */}
        <div className="bg-blue-600 dark:bg-blue-800 py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Car Wrecking Education Center
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Knowledge resources to help you understand the car wrecking process, environmental benefits, and how to maximize your vehicle's value.
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-1/3 flex justify-center">
                <BookOpen className="w-24 h-24 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Why Education Matters
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  At {companyName}, we believe in transparent processes and educating our customers. 
                  Understanding how car wrecking works helps you make informed decisions about your 
                  end-of-life vehicle and appreciate the environmental benefits of proper recycling.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Browse our educational resources below to learn about all aspects of car wrecking and recycling.
                </p>
              </div>
            </div>
          </div>

          {/* Categories grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    {category.icon}
                    <h3 className="ml-4 text-xl font-bold text-gray-900 dark:text-white">
                      {category.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {category.description}
                  </p>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
                      Featured Articles:
                    </h4>
                    <ul className="space-y-2">
                      {category.articles.map((article, idx) => (
                        <li key={idx}>
                          <Link 
                            href={article.href}
                            className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
                          >
                            <ChevronRight className="w-4 h-4 mr-1 flex-shrink-0" />
                            <span>{article.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-6">
                    <Link 
                      href={category.href}
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                    >
                      View All Articles
                      <ChevronRight className="w-5 h-5 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* CTA section */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Sell Your Car?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Now that you understand the process, get an instant valuation for your vehicle and see how much it's worth.
            </p>
            <Link 
              href="/quote"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Get Your Free Quote
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EducationIndexPage;