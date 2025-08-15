import React from "react";

interface ImageUploadProps {
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  return (
    <div className="border-2 border-dashed border-blue-300 rounded-2xl p-12 text-center bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300">
      <div className="mx-auto h-16 w-16 text-blue-400 mb-6 text-5xl animate-bounce">
        📁
      </div>
      <label className="cursor-pointer">
        <span className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
          Upload your UI mockup
        </span>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={onImageUpload}
        />
      </label>
      <p className="text-gray-500 mt-3 text-lg">PNG, JPG, or GIF up to 10MB</p>
      <div className="mt-6 flex justify-center space-x-4">
        <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
          Drag & Drop
        </div>
        <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
          Click to Browse
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
