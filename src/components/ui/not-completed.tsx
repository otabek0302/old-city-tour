"use client";

import { Button } from './button'
import { Mail, Phone } from 'lucide-react'

export const NotCompleted = ({ title = "Content Not Available", message = "This page is currently under development or experiencing issues. Please contact us for assistance." }: { title?: string; message?: string }) => {
  return (
    <section className="p-6">
      <div className="min-h-[calc(100vh-50px)] flex items-center justify-center relative w-full h-full rounded-3xl overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 bg-primary-dark z-10"></div>

        <div className="relative z-20 max-w-2xl mx-auto p-6">
          <h2 className="text-2xl font-bold text-copy-white mb-4">{title}</h2>
          <p className="text-copy-white mb-8 leading-relaxed">{message}</p>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-copy-white text-sm">Email: info@oldcitytours.com</p>
            <p className="text-copy-white text-sm">Phone: +998901234567</p>
          </div>
        </div>
      </div>
    </section>
  );
};
