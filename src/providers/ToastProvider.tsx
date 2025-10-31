'use client';

import { Toaster } from 'react-hot-toast';

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        // Default options
        duration: 4000,
        style: {
          background: '#fff',
          color: '#1A1A1A',
          padding: '16px 24px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: '500',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        },
        // Success
        success: {
          iconTheme: {
            primary: '#D4AF37',
            secondary: '#fff',
          },
          style: {
            border: '2px solid #D4AF37',
          },
        },
        // Error
        error: {
          iconTheme: {
            primary: '#E74C3C',
            secondary: '#fff',
          },
          style: {
            border: '2px solid #E74C3C',
          },
        },
        // Loading
        loading: {
          iconTheme: {
            primary: '#D4AF37',
            secondary: '#fff',
          },
        },
      }}
    />
  );
}

