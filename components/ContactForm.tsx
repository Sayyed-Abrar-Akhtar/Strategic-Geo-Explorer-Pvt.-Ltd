'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Icon } from './Icon';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Please enter your name'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Your message must be at least 10 characters long'),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: 'You must consent to the privacy policy to submit',
  }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      privacyConsent: false,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('loading');
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setSuccessMessage(result.message || 'Thank you! Your message was sent successfully.');
        reset();
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Contact submit error:', error);
      setSubmitStatus('error');
      setErrorMessage('Unable to connect to server. Please verify your connection and try again.');
    }
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg border border-slate-100 sm:p-8">
      <h3 className="text-xl font-bold text-slate-900 mb-6">
        Send Us a Message
      </h3>

      {submitStatus === 'success' && (
        <div className="mb-6 rounded-md bg-teal-50 border border-teal-200 p-4 flex gap-3 text-teal-800 text-sm">
          <Icon name="check-circle" className="h-5 w-5 text-teal-600 shrink-0" />
          <div>
            <p className="font-semibold">Message Dispatched</p>
            <p className="mt-1">{successMessage}</p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 rounded-md bg-red-50 border border-red-200 p-4 flex gap-3 text-red-800 text-sm">
          <Icon name="alert-triangle" className="h-5 w-5 text-red-600 shrink-0" />
          <div>
            <p className="font-semibold">Error Submitting Form</p>
            <p className="mt-1">{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            placeholder="John Doe"
            disabled={submitStatus === 'loading'}
            {...register('name')}
            className={`w-full rounded-md border px-4 py-2.5 text-sm text-slate-900 transition-colors bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 ${
              errors.name ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-teal-500'
            }`}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs font-semibold text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="john.doe@example.com"
            disabled={submitStatus === 'loading'}
            {...register('email')}
            className={`w-full rounded-md border px-4 py-2.5 text-sm text-slate-900 transition-colors bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 ${
              errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-teal-500'
            }`}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs font-semibold text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Message Input */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Describe your technical request or project scope..."
            disabled={submitStatus === 'loading'}
            {...register('message')}
            className={`w-full rounded-md border px-4 py-2.5 text-sm text-slate-900 transition-colors bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 ${
              errors.message ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-teal-500'
            }`}
          />
          {errors.message && (
            <p className="mt-1.5 text-xs font-semibold text-red-600">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Privacy Consent Checkbox */}
        <div className="relative flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="privacyConsent"
              type="checkbox"
              disabled={submitStatus === 'loading'}
              {...register('privacyConsent')}
              className="h-4.5 w-4.5 rounded border-slate-300 text-teal-600 focus:ring-teal-500 transition-colors cursor-pointer"
            />
          </div>
          <div className="ml-3 text-xs leading-5 text-slate-600">
            <label htmlFor="privacyConsent" className="cursor-pointer select-none">
              I consent to the collection and processing of my details in accordance with the{' '}
              <a href="/privacy-policy" target="_blank" className="font-semibold text-teal-600 hover:underline">
                Privacy Policy
              </a>
              . <span className="text-red-500">*</span>
            </label>
            {errors.privacyConsent && (
              <p className="mt-1 text-xs font-semibold text-red-600">
                {errors.privacyConsent.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={submitStatus === 'loading'}
            className="flex w-full items-center justify-center rounded-md bg-teal-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
          >
            {submitStatus === 'loading' ? (
              <span className="flex items-center gap-2">
                <Icon name="loader" className="h-4.5 w-4.5 animate-spin" />
                Sending Message...
              </span>
            ) : (
              'Submit Inquiry'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
