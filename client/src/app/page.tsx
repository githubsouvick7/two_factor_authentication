"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Shield, Smartphone, Users, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/constent/header";
import Link from "next/link";
import Footer from "@/components/constent/footer";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("authenticated");
    setIsAuthenticated(authStatus === "true");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary to-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(40deg,transparent_25%,rgba(155,135,245,0.2)_50%,transparent_75%)] animate-float"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6 animate-fade-in">
            Stay Connected with ChatApp
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 animate-fade-in">
            Simple, reliable, private messaging and calling for free, available
            on all devices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <Link href={isAuthenticated ? "/chat" : "/auth"}>
                {isAuthenticated ? "Open Chat" : "Get Started"}
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary/10"
              asChild
            >
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Choose ChatApp
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform provides a seamless communication experience with all
              the features you need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Simple Messaging</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Send messages to friends and family instantly, with real-time
                  delivery and read receipts.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Group Chats</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Create group chats with up to 100 people. Share updates and
                  coordinate with everyone at once.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Secure & Private</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Your messages are secured with end-to-end encryption. Your
                  privacy is guaranteed.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Cross-Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Access your chats from any device - mobile, tablet, or
                  desktop, with perfect sync.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="px-6 py-12 sm:p-12 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to get started?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join millions of users and experience the best chat platform
                available today.
              </p>
              <div className="space-y-4 sm:space-y-0 sm:flex sm:justify-center sm:space-x-4">
                <Button asChild size="lg">
                  <Link href={isAuthenticated ? "/chat" : "/auth"}>
                    {isAuthenticated ? "Open Chat" : "Sign Up Now"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Everything you need in one app
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                ChatApp combines all the features you love in a messaging
                platform with a clean, intuitive interface.
              </p>

              <div className="space-y-4">
                {[
                  "Real-time messaging with read receipts",
                  "Voice and video calls",
                  "File and media sharing",
                  "Group chats with admin controls",
                  "End-to-end encryption for all communications",
                  "Cloud backup and chat history",
                  "Cross-platform availability",
                  "Low data usage mode for limited connectivity",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <Check className="h-6 w-6 text-primary" />
                    </div>
                    <p className="ml-3 text-base text-gray-700">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 lg:mt-0 lg:pl-8">
              <div className="bg-primary/10 rounded-xl p-8 relative overflow-hidden">
                <div className="relative">
                  <div className="text-center mb-6">
                    <div className="inline-block rounded-full p-3 bg-primary/20 mb-4">
                      <MessageSquare className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold">Download ChatApp</h3>
                    <p className="text-gray-600 mt-2">
                      Available on all platforms
                    </p>
                  </div>

                  <div className="flex flex-col space-y-3">
                    <Button variant="secondary" className="w-full">
                      <Smartphone className="mr-2 h-5 w-5" /> App Store
                    </Button>
                    <Button variant="secondary" className="w-full">
                      <Smartphone className="mr-2 h-5 w-5" /> Google Play
                    </Button>
                    <Button variant="secondary" className="w-full">
                      <Smartphone className="mr-2 h-5 w-5" /> Web App
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default App;
