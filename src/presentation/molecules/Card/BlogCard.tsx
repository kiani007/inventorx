'use client';

import React from 'react';

interface BlogPost {
  title: string;
  excerpt: string;
  tag: string;
  date: string;
  image?: string;
}

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  return (
    <div className="bg-white rounded-[20px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1">
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-xs font-semibold">
          {post.tag}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">{post.title}</h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">{post.date}</span>
        <button className="text-[#D4AF37] text-sm font-medium hover:text-[#B8941F] transition-colors">
          Read More →
        </button>
      </div>
    </div>
  );
};

export default BlogCard;