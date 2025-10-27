'use client';

import React from 'react';
import { cn } from '@/shared/utils/cn';
import { useForm } from 'react-hook-form';
import { Button, Input, Textarea } from '@/presentation/atoms';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactFormSection: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    // Handle form submission (will be connected to backend later)
    console.log('Form submitted:', data);
  };

  return (
    <section className="py-[120px] bg-[#FAFAFA] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 left-10 w-[350px] h-[350px] bg-[#E5C558]/5 rounded-full blur-[100px] animate-pulse" 
             style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-10 relative z-10">
        <div className="max-w-[900px] mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-5 py-2 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-[13px] font-semibold uppercase tracking-[1px] mb-6">
              Get In Touch
            </div>
            
            <h2 className={cn(
              "text-[56px] font-extralight mb-8 text-[#1A1A1A]"
            )}>
              Let's
              <span className="font-normal bg-gradient-to-r from-[#D4AF37] to-[#E5C558] bg-clip-text text-transparent"> Connect</span>
            </h2>
            
            <p className="text-[20px] text-[#666666] max-w-[700px] mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-[40px] p-12 relative overflow-hidden"
               style={{ boxShadow: 'var(--neo-shadow-hover)' }}>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Input
                  {...register('name', { required: 'Name is required' })}
                  label="Name"
                  type="text"
                  placeholder="Your full name"
                  error={!!errors.name}
                  errorMessage={errors.name?.message}
                />

                <Input
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  label="Email"
                  type="email"
                  placeholder="your.email@example.com"
                  error={!!errors.email}
                  errorMessage={errors.email?.message}
                />
              </div>

              {/* Subject */}
              <Input
                {...register('subject', { required: 'Subject is required' })}
                label="Subject"
                type="text"
                placeholder="What's this about?"
                error={!!errors.subject}
                errorMessage={errors.subject?.message}
              />

              {/* Message */}
              <Textarea
                {...register('message', { required: 'Message is required' })}
                label="Message"
                rows={6}
                placeholder="Tell us more about your inquiry..."
                error={!!errors.message}
                errorMessage={errors.message?.message}
              />

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="primary"
                  size="full"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

