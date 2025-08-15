import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-black py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-300 to-pink-300 rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-2xl">⚡</span>
            </div>
          </div>
          <h3 className="text-3xl font-bold text-white mb-4">
            Built with a few cups of tea and a dash of AI magic.
          </h3>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Open source, free forever. Because great tools should be accessible
            to everyone.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <a
            href="https://github.com/ashwani3011/skeleton-loader-generator"
            className="flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all hover:scale-105"
          >
            <span className="mr-2">⭐</span> Star on GitHub
          </a>
          <a
            href="https://twitter.com/intent/tweet?text=Transform%20your%20UI%20mockups%20into%20production-ready%20skeleton%20loaders%20in%20seconds!%20No%20coding%20required.%20Check%20out%20this%20awesome%20tool%20at%20https://skeleton-loader-generator-ashwani.vercel.app/"
            className="flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all hover:scale-105"
          >
            <span className="mr-2">🐦</span> Share on Twitter
          </a>
          <a
            href="https://www.linkedin.com/sharing/share-offsite/?url=https://skeleton-loader-generator-ashwani.vercel.app/"
            className="flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all hover:scale-105"
          >
            <span className="mr-2">💼</span> Share on LinkedIn
          </a>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-400">
            Made by{" "}
            <span className="text-yellow-300 font-semibold">
              {" "}
              <a
                href="https://www.linkedin.com/in/ashwani3011/"
                target="_blank"
              >
                Ashwani Kumar Jha
              </a>
            </span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
