import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { CheckCircle, Calendar, Truck, Phone, Home, FileText } from 'lucide-react';
import { getCompanyName, getContactInfo } from '../../utils/config';

const QuoteAcceptedPage = () => {
  const router = useRouter();
  const companyName = getCompanyName();
  const contactInfo = getContactInfo();
  
  const { ref, amount, make, model, year } = router.query;
  
  // Redirect to quote page if there's no reference number
  useEffect(() => {
    if (!router.isReady) return;
    
    if (!ref) {
      router.push('/quote');
    }
  }, [router.isReady, ref]);

  // Generate random future date for pickup (1-3 days from now)
  const getPickupDate = () => {
    const today = new Date();
    const daysToAdd = Math.floor(Math.random() * 3) + 1;
    const pickupDate = new Date(today);
    pickupDate.setDate(today.getDate() + daysToAdd);
    
    return pickupDate.toLocaleDateString('en-AU', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };

  if (!ref) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Quote Accepted | {companyName}</title>
        <meta name="description" content="Thank you for accepting your quote. Our team will be in touch shortly to arrange pickup of your vehicle." />
      </Head>
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center bg-green-100 dark:bg-green-900/30 p-3 rounded-full mb-4">
                  <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Quote Accepted!
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Thank you for accepting your quote. We'll be in touch shortly to arrange the pickup.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-750 p-6 rounded-lg mb-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Quote Details</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
                    <span className="text-gray-600 dark:text-gray-400">Reference Number:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{ref}</span>
                  </div>
                  
                  <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
                    <span className="text-gray-600 dark:text-gray-400">Vehicle:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{year} {make} {model}</span>
                  </div>
                  
                  <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
                    <span className="text-gray-600 dark:text-gray-400">Accepted Amount:</span>
                    <span className="font-bold text-green-600 dark:text-green-400">${amount}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Estimated Pickup:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{getPickupDate()}</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">What Happens Next?</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex">
                    <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">1. We'll Contact You</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Our team will call you within 24 hours to confirm details</p>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex">
                    <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">2. Schedule Pickup</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">We'll agree on a convenient time for vehicle collection</p>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex">
                    <Truck className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">3. Vehicle Pickup</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Our driver will arrive at the agreed time and location</p>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex">
                    <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">4. Payment</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Receive payment after paperwork is completed</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Documents to Prepare</h3>
                <ul className="text-gray-600 dark:text-gray-300 space-y-2 pl-5 list-disc">
                  <li>Vehicle registration documents or proof of ownership</li>
                  <li>Photo ID (driver's license or passport)</li>
                  <li>Any keys for the vehicle</li>
                  <li>Bank details for electronic payment (if preferred)</li>
                </ul>
              </div>
              
              <div className="text-center space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  Have any questions? Feel free to contact us:
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a 
                    href={`tel:${contactInfo.phone}`}
                    className="flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    {contactInfo.phone}
                  </a>
                  
                  <Link
                    href="/"
                    className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    Return to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuoteAcceptedPage;