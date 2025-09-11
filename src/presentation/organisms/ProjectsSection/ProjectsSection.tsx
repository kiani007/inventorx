'use client';

import React from 'react';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    badge: 'Live Auction',
    category: 'Medical Tech',
    likes: 1247,
    title: 'AI Diagnostic System',
    description: 'Revolutionary AI-powered diagnostic tool for early disease detection with 99.8% accuracy',
    inventor: {
      name: 'Dr. Sarah Chen',
      location: 'Berlin, Germany',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=40',
    },
    target: '€4.2M',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400',
  },
  {
    id: 2,
    badge: 'New',
    category: 'Clean Energy',
    likes: 892,
    title: 'Solar Glass Technology',
    description: 'Transparent solar panels integrated into architectural glass for sustainable buildings',
    inventor: {
      name: 'João Silva',
      location: 'Lisbon, Portugal',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40',
    },
    target: '€2.8M',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400',
  },
  {
    id: 3,
    badge: 'Trending',
    category: 'Robotics',
    likes: 2103,
    title: 'Autonomous Surgery Robot',
    description: 'Precision surgical robot with AI-guided operations for minimally invasive procedures',
    inventor: {
      name: 'Dr. Marie Laurent',
      location: 'Paris, France',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40',
    },
    target: '€6.5M',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400',
  },
];

export const ProjectsSection: React.FC = () => {
  return (
    <section className="py-[100px] bg-white">
      <div className="max-w-[1400px] mx-auto px-10">
        <h2 className="text-center text-[48px] font-extralight mb-5">Featured Innovations</h2>
        <p className="text-center text-[18px] text-[#666666] mb-[60px]">Discover groundbreaking projects seeking investment</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project) => (
            <div key={project.id} 
                 className="bg-white rounded-[30px] overflow-hidden transition-all duration-400 hover:-translate-y-[15px] hover:scale-[1.02] hover:shadow-[0_30px_80px_rgba(0,0,0,0.2)]"
                 style={{ boxShadow: 'var(--neo-shadow)' }}>
              <div className="h-[260px] relative overflow-hidden bg-gradient-to-br from-[#FFF8F0] to-white">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-600 hover:scale-110"
                />
                <span className="absolute top-5 right-5 px-5 py-2 bg-[#D4AF37] text-white rounded-[25px] text-[11px] font-semibold uppercase tracking-[1px] shadow-[0_5px_15px_rgba(212,175,55,0.3)]">
                  {project.badge}
                </span>
              </div>
              
              <div className="p-[35px]">
                <div className="flex justify-between items-center mb-5">
                  <span className="inline-block px-[15px] py-[6px] bg-[#D4AF37]/10 text-[#D4AF37] rounded-[20px] text-[11px] font-semibold uppercase tracking-[0.5px]">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-[5px] text-[#666666] text-[14px]">
                    <span className="text-[#E74C3C]">❤</span> {project.likes.toLocaleString()}
                  </div>
                </div>
                
                <h3 className="text-[20px] font-medium mb-3">{project.title}</h3>
                <p className="text-[14px] text-[#666666] leading-relaxed mb-[25px]">{project.description}</p>
                
                <div className="flex justify-between items-center pt-[25px] border-t border-[#FAFAFA]">
                  <div className="flex items-center gap-3">
                    <img 
                      src={project.inventor.avatar} 
                      alt={project.inventor.name}
                      className="w-9 h-9 rounded-full"
                    />
                    <div>
                      <div className="text-[14px] font-medium">{project.inventor.name}</div>
                      <div className="text-[12px] text-[#666666]">{project.inventor.location}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[20px] font-semibold text-[#D4AF37]">{project.target}</div>
                    <div className="text-[11px] text-[#666666] uppercase">Target</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};