import type { TeamMember } from '@/lib/types';
import teamData from '@/data/team.json';

export async function getTeamMembers(): Promise<TeamMember[]> {
  const members = teamData as TeamMember[];
  return [...members].sort((a, b) => a.order - b.order);
}
