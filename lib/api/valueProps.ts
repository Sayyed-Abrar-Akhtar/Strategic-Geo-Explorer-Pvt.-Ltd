import type { ValueProp } from '@/lib/types';
import valuePropsData from '@/data/valueProps.json';

export async function getValueProps(): Promise<ValueProp[]> {
  return valuePropsData as ValueProp[];
}
