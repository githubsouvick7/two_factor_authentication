"use client";

import { useState, useEffect } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Check authentication status
    const authStatus = localStorage.getItem("authenticated");
    setIsAuthenticated(authStatus === "true");

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    localStorage.removeItem("phoneNumber");
    setIsAuthenticated(false);

    toast("Logged out");

    navigate.push("/");
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-primary flex items-center"
            >
              ChatApp
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Home
            </Link>
            <a
              href="#features"
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Download
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Support
            </a>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Button asChild>
                  <Link href="/chat">Open Chat</Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut size={16} /> Logout
                </Button>
              </div>
            ) : (
              <Button asChild>
                <Link href="/auth">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg shadow-lg mt-2">
              <Link
                href="/"
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <a
                href="#features"
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Features
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Download
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Support
              </a>

              {isAuthenticated ? (
                <>
                  <Link
                    href="/chat"
                    className="block px-3 py-2 text-primary hover:bg-primary/10 font-medium rounded-md transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Open Chat
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                  >
                    <span className="flex items-center gap-2">
                      <LogOut size={16} /> Logout
                    </span>
                  </button>
                </>
              ) : (
                <Link
                  href="/auth"
                  className="block px-3 py-2 text-white bg-primary hover:bg-primary/90 rounded-md transition-colors duration-200 text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
