import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: 'You must accept the privacy policy',
  }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request payload using zod
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, message } = result.data;

    // Log submitted form fields
    console.log('--- New Contact Form Submission ---');
    console.log(`From: ${name} <${email}>`);
    console.log(`Message: ${message}`);
    console.log('-----------------------------------');

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We will get back to you shortly.',
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
