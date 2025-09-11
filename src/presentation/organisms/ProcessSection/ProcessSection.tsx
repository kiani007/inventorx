'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/shared/utils/cn';

const processSteps = [
  {
    icon: '🔬',
    title: 'Submit Innovation',
    description: 'Upload your project with detailed documentation and visuals',
    color: '#D4AF37',
    gradient: 'from-[#D4AF37] to-[#E5C558]',
    delay: 0,
  },
  {
    icon: '🔍',
    title: 'Expert Validation',
    description: 'Our expert team reviews and validates your innovation',
    color: '#27AE60',
    gradient: 'from-[#27AE60] to-[#52C77E]',
    delay: 200,
  },
  {
    icon: '🤝',
    title: 'Smart Connect',
    description: 'Match with verified investors interested in your field',
    color: '#3498DB',
    gradient: 'from-[#3498DB] to-[#5DADE2]',
    delay: 400,
  },
  {
    icon: '🚀',
    title: 'Launch & Scale',
    description: 'Secure funding and bring your innovation to market',
    color: '#E74C3C',
    gradient: 'from-[#E74C3C] to-[#EC7063]',
    delay: 600,
  },
];

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-[150px] bg-gradient-to-br from-[#FAFAFA] via-white to-[#FFF8F0] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-[300px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-[#E5C558]/5 rounded-full blur-[120px] animate-pulse" 
             style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/3 rounded-full blur-[150px] animate-pulse" 
             style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-10 relative z-10">
        <div className="text-center mb-20">
          <h2 className={cn(
            "text-[56px] font-extralight mb-6 text-[#1A1A1A]",
            "opacity-0 animate-in fade-in slide-in-from-bottom-10 duration-1000",
            isVisible && "opacity-100"
          )}>
            Your Journey to 
            <span className="font-normal bg-gradient-to-r from-[#D4AF37] to-[#E5C558] bg-clip-text text-transparent"> Success</span>
          </h2>
          <p className={cn(
            "text-[20px] text-[#666666] max-w-[600px] mx-auto",
            "opacity-0 animate-in fade-in slide-in-from-bottom-10 duration-1000",
            isVisible && "opacity-100"
          )} style={{ animationDelay: '200ms' }}>
            A revolutionary platform connecting brilliant minds with visionary investors
          </p>
        </div>
        
        <div className="relative">
          {/* Animated Progress Bar */}
          <div className="absolute top-[60px] left-[10%] right-[10%] h-[4px] bg-[#F0F0F0] rounded-full overflow-hidden hidden lg:block">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#D4AF37] to-[#E5C558] rounded-full transition-all duration-3000 ease-linear"
              style={{ 
                width: `${((activeStep + 1) / processSteps.length) * 100}%`,
                boxShadow: '0 0 20px rgba(212, 175, 55, 0.6)'
              }}
            />
            {/* Glowing dot at the end */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#D4AF37] rounded-full transition-all duration-3000 ease-linear"
              style={{ 
                left: `calc(${((activeStep + 1) / processSteps.length) * 100}% - 8px)`,
                boxShadow: '0 0 30px rgba(212, 175, 55, 0.8), 0 0 60px rgba(212, 175, 55, 0.4)'
              }}
            />
          </div>
          
          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {processSteps.map((step, index) => (
              <div 
                key={index} 
                className={cn(
                  "relative group",
                  "opacity-0 animate-in fade-in slide-in-from-bottom-10 duration-1000",
                  isVisible && "opacity-100"
                )}
                style={{ animationDelay: `${step.delay}ms` }}
              >
                {/* Connection Line on Mobile */}
                {index < processSteps.length - 1 && (
                  <div className="absolute top-[60px] left-[50%] w-full h-[2px] bg-gradient-to-r from-[#D4AF37]/20 to-transparent hidden md:block lg:hidden" />
                )}
                
                {/* Card Container */}
                <div 
                  className={cn(
                    "relative bg-white rounded-[30px] p-8 transition-all duration-500 cursor-pointer",
                    "hover:-translate-y-4 hover:scale-105",
                    activeStep === index && "scale-105 -translate-y-2"
                  )}
                  style={{
                    boxShadow: activeStep === index 
                      ? `0 30px 60px -20px ${step.color}40, 0 10px 40px -10px rgba(0,0,0,0.1)` 
                      : '0 10px 40px -10px rgba(0,0,0,0.08)',
                    border: activeStep === index ? `2px solid ${step.color}30` : '2px solid transparent'
                  }}
                  onMouseEnter={() => setActiveStep(index)}
                >
                  {/* Step Number Badge */}
                  <div 
                    className={cn(
                      "absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center",
                      "text-white font-bold text-lg transition-all duration-500",
                      `bg-gradient-to-br ${step.gradient}`,
                      activeStep === index && "scale-125 rotate-12"
                    )}
                    style={{
                      boxShadow: activeStep === index 
                        ? `0 10px 30px -5px ${step.color}60` 
                        : '0 5px 15px -3px rgba(0,0,0,0.2)'
                    }}
                  >
                    {index + 1}
                  </div>
                  
                  {/* Icon Container with Animation */}
                  <div className="relative mb-6">
                    <div 
                      className={cn(
                        "w-[100px] h-[100px] mx-auto rounded-[25px] flex items-center justify-center",
                        "transition-all duration-500 relative overflow-hidden",
                        `bg-gradient-to-br ${step.gradient}`,
                        activeStep === index && "animate-pulse"
                      )}
                      style={{
                        boxShadow: `0 20px 40px -10px ${step.color}30`
                      }}
                    >
                      {/* Animated Background Pattern */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" 
                             style={{
                               backgroundImage: `radial-gradient(circle at 20% 20%, transparent 20%, ${step.color}10 20.5%, ${step.color}10 30%, transparent 30.5%)`,
                               backgroundSize: '20px 20px',
                               animation: activeStep === index ? 'movePattern 20s linear infinite' : 'none'
                             }} />
                      </div>
                      <span className={cn(
                        "text-[40px] relative z-10 transition-transform duration-500",
                        activeStep === index && "scale-110 rotate-12"
                      )}>
                        {step.icon}
                      </span>
                    </div>
                    
                    {/* Ripple Effect */}
                    {activeStep === index && (
                      <>
                        <div className="absolute inset-0 rounded-[25px] animate-ping" 
                             style={{ 
                               background: `${step.color}20`,
                               animationDuration: '2s'
                             }} />
                        <div className="absolute inset-0 rounded-[25px] animate-ping" 
                             style={{ 
                               background: `${step.color}10`,
                               animationDuration: '2s',
                               animationDelay: '0.5s'
                             }} />
                      </>
                    )}
                  </div>
                  
                  {/* Content */}
                  <h3 className={cn(
                    "text-[20px] font-semibold mb-3 text-[#1A1A1A] transition-colors duration-300",
                    activeStep === index && "text-transparent bg-gradient-to-r bg-clip-text",
                    activeStep === index && step.gradient
                  )}>
                    {step.title}
                  </h3>
                  <p className="text-[15px] text-[#666666] leading-relaxed">
                    {step.description}
                  </p>
                  
                  {/* Learn More Link */}
                  <div className={cn(
                    "mt-4 flex items-center gap-2 text-[14px] font-medium transition-all duration-300",
                    "opacity-0 group-hover:opacity-100",
                    activeStep === index && "opacity-100"
                  )}
                       style={{ color: step.color }}>
                    <span>Learn more</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <button className={cn(
            "px-12 py-4 bg-gradient-to-r from-[#D4AF37] to-[#E5C558] text-white rounded-full",
            "text-[16px] font-semibold uppercase tracking-[1px]",
            "shadow-[0_20px_40px_-10px_rgba(212,175,55,0.4)]",
            "hover:shadow-[0_25px_50px_-10px_rgba(212,175,55,0.5)]",
            "hover:-translate-y-1 transition-all duration-300",
            "opacity-0 animate-in fade-in slide-in-from-bottom-10 duration-1000",
            isVisible && "opacity-100"
          )} style={{ animationDelay: '800ms' }}>
            Start Your Journey Today
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes movePattern {
          0% { transform: translate(0, 0); }
          100% { transform: translate(20px, 20px); }
        }
      `}</style>
    </section>
  );
};