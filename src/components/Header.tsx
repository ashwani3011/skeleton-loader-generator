import React from "react";

const Header: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <span className="text-3xl">⚡</span>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              Skeleton Loader
            </span>
            <br />
            <span className="text-white">Generator</span>
          </h1>

          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your UI mockups into production-ready skeleton loaders in
            seconds.
            <span className="text-yellow-300 font-semibold">
              No coding required!
            </span>
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white">
              <span className="mr-2">🎨</span> Visual Editor
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white">
              <span className="mr-2">⚡</span> Instant Code
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white">
              <span className="mr-2">🚀</span> Production Ready
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white">
              <span className="mr-2">🎯</span> Pixel Perfect
            </div>
          </div>

          <button
            onClick={() =>
              document
                .getElementById("generator")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-purple-700 bg-gradient-to-r from-yellow-300 to-pink-300 rounded-full shadow-2xl hover:shadow-yellow-300/25 transform hover:scale-105 transition-all duration-300"
          >
            <span className="relative z-10">Start Creating Now</span>
            <span className="ml-2 text-xl group-hover:translate-x-1 transition-transform">
              →
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      <div className="absolute top-20 left-10 w-4 h-4 bg-yellow-300 rounded-full animate-bounce opacity-70"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-pink-300 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute bottom-20 left-20 w-5 h-5 bg-blue-300 rounded-full animate-ping opacity-50"></div>
    </div>
  );
};

export default Header;
