"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MessageCircle,
  Sparkles,
  Zap,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl text-gray-900">ChatAI</span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/chat"
                className="text-gray-700 hover:text-indigo-600 font-medium transition"
              >
                Chat
              </Link>
              <Link href="/login">
                <button className="px-4 py-2 text-gray-700 font-medium hover:text-indigo-600 transition">
                  Log in
                </button>
              </Link>
              <Link href="/signup">
                <button className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium rounded-xl hover:shadow-lg transform hover:scale-105 transition">
                  Sign up
                </button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-6 space-y-4">
              <Link href="/chat" className="block text-gray-700 font-medium">
                Chat
              </Link>
              <Link href="/login" className="block">
                <button className="w-full text-left px-4 py-2 text-gray-700 font-medium">
                  Log in
                </button>
              </Link>
              <Link href="/signup" className="block">
                <button className="w-full px-5 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium rounded-xl">
                  Sign up
                </button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Powered by advanced AI
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Chat with Intelligence
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              Like Never Before
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Experience natural, fast, and intelligent conversations. Ask
            anything, create content, solve problems — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <button className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-lg rounded-2xl hover:shadow-xl transform hover:scale-105 transition flex items-center justify-center">
                Start Chatting Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
              </button>
            </Link>
            <Link href="/chat">
              <button className="px-8 py-4 bg-white text-gray-800 font-semibold text-lg rounded-2xl border-2 border-gray-300 hover:border-indigo-500 hover:shadow-md transition">
                Try Demo
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8 text-indigo-600" />,
                title: "Lightning Fast",
                desc: "Get instant responses with cutting-edge AI models.",
              },
              {
                icon: <MessageCircle className="w-8 h-8 text-violet-600" />,
                title: "Natural Conversations",
                desc: "Chat like you're talking to a real expert.",
              },
              {
                icon: <Sparkles className="w-8 h-8 text-pink-600" />,
                title: "Creative & Smart",
                desc: "Generate ideas, code, stories, and more.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 hover:shadow-lg transition"
              >
                <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 px-4 bg-gradient-to-t from-indigo-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to explore the future of AI?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands already chatting smarter.
          </p>
          <Link href="/signup">
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-lg rounded-2xl hover:shadow-2xl transform hover:scale-105 transition">
              Get Started Now
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm">© 2025 ChatAI. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
