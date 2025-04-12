import React from 'react';
import { Calendar } from 'lucide-react';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  author: string;
  readTime: string;
  onClick: () => void;
}

export default function BlogCard({
  title,
  excerpt,
  date,
  imageUrl,
  author,
  readTime,
  onClick,
}: BlogCardProps) {
  return (
    <div 
      className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-[1.02]"
      onClick={onClick}
    >
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{date}</span>
          <span className="mx-2">•</span>
          <span>{readTime} read</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{excerpt}</p>
        <div className="flex items-center">
          <span className="text-sm text-gray-500">By {author}</span>
        </div>
      </div>
    </div>
  );
}