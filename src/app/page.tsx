
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";
import Navbar from "./navbar";
export default function Home() {
  return (
       <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
       <Navbar />
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-8 animate-pulse">
            Turn Your Images Into Memes
            <br />
            With AI Magic
          </h1>
          <p className="max-w-2xl mx-auto text-xl sm:text-2xl text-gray-300 mb-12">
            Upload any image and let our AI analyze it to create hilarious, context-aware memes instantly.
          </p>
          <Button
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-2xl"
          >
            Create Your Meme
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Powered by Advanced AI
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our cutting-edge technology combines computer vision, natural language processing, and meme culture knowledge
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Smart OCR Technology</h3>
              <p className="text-gray-400">Our AI reads and understands the content in your images to create contextually relevant memes.</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Instant Generation</h3>
              <p className="text-gray-400">Get your memes generated in seconds with our advanced AI processing pipeline.</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Customizable Results</h3>
              <p className="text-gray-400">Fine-tune the generated memes to match your style and preferences.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-gray-900/50">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-600">
            How It Works
          </h2>
          <p className="text-xl text-gray-300">
            Creating viral memes has never been easier
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              1
            </div>
            <h3 className="text-lg font-semibold mb-2">Upload Image</h3>
            <p className="text-gray-400 text-sm">Choose any image from your device or paste a URL</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              2
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Analysis</h3>
            <p className="text-gray-400 text-sm">Our AI analyzes the image content and context</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              3
            </div>
            <h3 className="text-lg font-semibold mb-2">Meme Generation</h3>
            <p className="text-gray-400 text-sm">Multiple meme options are generated instantly</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              4
            </div>
            <h3 className="text-lg font-semibold mb-2">Share & Enjoy</h3>
            <p className="text-gray-400 text-sm">Download or share your hilarious creations</p>
          </div>
        </div>
      </div>

      {/* Example Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-600">
            Meme Examples
          </h2>
          <p className="text-xl text-gray-300">
            See what our AI can create from ordinary images
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-gray-800/50 border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="aspect-square bg-gradient-to-br from-purple-400 to-pink-600 p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🐱</div>
                <p className="text-white font-bold text-lg">"When you realize it's Monday"</p>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-gray-400 text-sm">From: Cat sitting by window</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-600 p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🍕</div>
                <p className="text-white font-bold text-lg">"Me at 3 AM"</p>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-gray-400 text-sm">From: Pizza on kitchen counter</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="aspect-square bg-gradient-to-br from-green-400 to-blue-600 p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">💻</div>
                <p className="text-white font-bold text-lg">"Code works on my machine"</p>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-gray-400 text-sm">From: Laptop with code editor</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-gray-900/50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-purple-400 mb-2">50K+</div>
            <p className="text-gray-300">Memes Created</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-pink-400 mb-2">10K+</div>
            <p className="text-gray-300">Happy Users</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-400 mb-2">99.9%</div>
            <p className="text-gray-300">Uptime</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-400 mb-2">2.5s</div>
            <p className="text-gray-300">Avg. Generation Time</p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            What People Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-bold">JS</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">John Smith</h4>
                  <p className="text-gray-400 text-sm">Content Creator</p>
                </div>
              </div>
              <p className="text-gray-300">"This tool has revolutionized my social media game. The AI is incredibly smart at understanding context!"</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-bold">MJ</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Maria Johnson</h4>
                  <p className="text-gray-400 text-sm">Marketing Manager</p>
                </div>
              </div>
              <p className="text-gray-300">"My team uses this daily for our campaigns. The memes are always on point and save us hours of brainstorming."</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-bold">AL</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Alex Lee</h4>
                  <p className="text-gray-400 text-sm">Influencer</p>
                </div>
              </div>
              <p className="text-gray-300">"I was skeptical at first, but the quality is amazing. My followers love the memes I create with this!"</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="text-center bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-3xl p-12 border border-purple-500/20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Ready to Go Viral?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already using AI to make their content more engaging and shareable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105">
              Start Creating Now
              <ArrowUp className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="px-8 py-4 text-lg font-semibold rounded-full border-purple-500 text-purple-400 hover:bg-purple-500/10">
              Watch Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
              AI Meme Generator
            </h3>
            <p className="text-gray-400 mb-6">
              Creating viral content with artificial intelligence
            </p>
            <div className="flex justify-center space-x-6 text-gray-400">
              <a href="#" className="hover:text-purple-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Support</a>
              <a href="#" className="hover:text-purple-400 transition-colors">API</a>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800">
              <p className="text-gray-500 text-sm">
                © 2024 AI Meme Generator. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
