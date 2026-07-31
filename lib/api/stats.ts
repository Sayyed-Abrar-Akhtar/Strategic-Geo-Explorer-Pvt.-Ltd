import type { Stat } from '@/lib/types';
import statsData from '@/data/stats.json';

export async function getStats(): Promise<Stat[]> {
  return statsData as Stat[];
}
