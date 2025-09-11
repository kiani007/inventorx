"use client";

import React from 'react';
import BlogCard from '@/presentation/molecules/Card/BlogCard';
import Image from 'next/image';

const samplePosts = [
  { title: 'How AI is Transforming Microscopy', excerpt: 'A short overview of how machine learning models accelerate pathology workflows and improve diagnostic accuracy.', tag: 'AI', date: 'Sept 2025',image: '/blogs/ai-revolution.jpg' },
  { title: 'Designing Medical Devices for Scalability', excerpt: 'Lessons learned building hardware and software that scale in regulated environments.', tag: 'Design', date: 'Aug 2025', image: '' },
  { title: 'Investor Guide: Valuing Deep Tech', excerpt: 'A practical guide for investors evaluating deep-technology startups in medtech.', tag: 'Investor', date: 'July 2025', image: '' },
  { title: '3D Models in the Browser (Performance Tips)', excerpt: 'How to keep WebGL stable and performant when rendering complex models.', tag: '3D', date: 'June 2025', image: '' }
];

export const BlogSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-6">From the Articles</h2>
        {/* Bento layout: large featured card on the left, three smaller cards on the right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 items-start">
          <div>
            {/* Featured post */}
            <article className="bg-white rounded-[18px] p-8 mb-4" style={{ boxShadow: '24px 24px 60px rgba(16,24,40,0.08), -12px -12px 40px rgba(255,255,255,0.95)', border: '1px solid rgba(212,175,55,0.06)'}}>
              <div className="flex items-center justify-between mb-6">
                <Image src={samplePosts[0].image} alt={samplePosts[0].title} width={600} height={400} className="w-full h-auto rounded-[12px] mb-4 object-cover" />
                <div className="text-sm text-[#B8941F] font-medium">{samplePosts[0].tag}</div>
                <div className="text-xs text-gray-400">{samplePosts[0].date}</div>
              </div>
              <h3 className="text-2xl lg:text-3xl font-semibold text-[#111827] mb-3">{samplePosts[0].title}</h3>
              <p className="text-gray-600 mb-6">{samplePosts[0].excerpt}</p>
              <div className="flex items-center gap-4">
                <button className="px-4 py-2 bg-[#D4AF37] text-white rounded-[10px]">Read article</button>
                <div className="text-sm text-gray-500">5 min read</div>
              </div>
            </article>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {samplePosts.slice(1).map(p => (
              <BlogCard key={p.title} post={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
