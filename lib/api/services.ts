import type { Service } from '@/lib/types';
import servicesData from '@/data/services.json';

export async function getServices(): Promise<Service[]> {
  return servicesData as Service[];
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  const services = await getServices();
  return services.find((s) => s.slug === slug);
}
