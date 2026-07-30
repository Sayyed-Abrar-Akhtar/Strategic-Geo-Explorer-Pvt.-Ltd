import type { CommunityInitiative } from '@/lib/types';
import communityData from '@/data/community.json';

export async function getCommunityInitiatives(): Promise<CommunityInitiative[]> {
  return communityData as CommunityInitiative[];
}
