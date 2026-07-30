import type { Testimonial, ClientLogo } from '@/lib/types';
import testimonialsData from '@/data/testimonials.json';

export async function getTestimonials(): Promise<Testimonial[]> {
  return testimonialsData.testimonials as Testimonial[];
}

export async function getClientLogos(): Promise<ClientLogo[]> {
  return testimonialsData.clientLogos as ClientLogo[];
}
