import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Car, DollarSign, PhoneCall, Recycle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              iCar Wreckers{" "}
              <span className="text-blue-600 dark:text-blue-400">Perth</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Get top cash for your unwanted vehicles. Fast, reliable, and
              environmentally responsible car removal service.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get a Quote
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white dark:bg-gray-700 border-none shadow-lg">
              <CardHeader>
                <DollarSign className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                <CardTitle>Best Cash Offers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Get the highest value for your vehicle, guaranteed.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-700 border-none shadow-lg">
              <CardHeader>
                <Car className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                <CardTitle>Free Car Removal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  We'll pick up your vehicle at no cost to you.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-700 border-none shadow-lg">
              <CardHeader>
                <PhoneCall className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                <CardTitle>24/7 Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Available around the clock for your convenience.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-700 border-none shadow-lg">
              <CardHeader>
                <Recycle className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                <CardTitle>Eco-Friendly</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Responsible recycling and disposal practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Sell Your Car?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get an instant quote and turn your unwanted vehicle into cash today.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
            Contact Us Now
          </Button>
        </div>
      </section>
    </div>
  );
}