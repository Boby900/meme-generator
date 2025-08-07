"use client";
import React from 'react';
import Link from 'next/link';
import { User, Menu, X, Zap, History, Settings, LogIn } from 'lucide-react';
import { useSession } from "next-auth/react";
import { SignOut } from '@/components/signout-button';
import { Avatar } from '@/components/ui/avatar';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { data: session } = useSession();
  console.log('Session:', session?.user ? session.user.image : 'No user session');
  const authenticated = !!session?.user;
  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-purple-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              MemeAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/gallery" 
            className={`${
              authenticated ? 'text-gray-300 hover:text-white' : 'hidden'
            } transition-colors duration-200 font-medium`}
            >
              Gallery
            </Link>
            <Link 
              href="/history" 
              className={`${
                authenticated ? 'text-gray-300 hover:text-white' : 'hidden'
              } transition-colors duration-200 font-medium flex items-center space-x-1`}
            >
              <History className="h-4 w-4" />
              <span>My Memes</span>
            </Link>
            
            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <Link 
                href="/settings" 
                className={`${
                  authenticated ? 'text-gray-300 hover:text-white' : 'hidden'
                } transition-colors duration-200`}
              >
                <Settings className="h-5 w-5" />
              </Link>
              <Link 
                href="/profile" 
                className={`${
                  authenticated ? 'flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-full transition-colors duration-200' : 'hidden'
                }`}
              >
                <Avatar className="h-8 w-8">
                  {
                    session?.user?.image ? (
                      <img src={session.user.image} alt="Profile" className="h-8 w-8 rounded-full" />
                    ) : (
                      <User className="h-8 w-8 text-gray-400" />
                    )
                  }
                </Avatar>
                <span className="text-gray-300 text-sm font-medium">Profile</span>
              </Link>
            </div>

            {/* Sign In Button */}
            <div className="flex items-center cursor-pointer">
              {session?.user ? (
                  <SignOut />
              ) : (
                <Link href="/api/auth/signin">Sign In</Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-800">
              <Link
                href="/create"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Create Meme
              </Link>
              <Link
                href="/gallery"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link
                href="/history"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                My Memes
              </Link>
              <Link
                href="/settings"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Settings
              </Link>
              <Link
                href="/sign-in"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/profile"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};