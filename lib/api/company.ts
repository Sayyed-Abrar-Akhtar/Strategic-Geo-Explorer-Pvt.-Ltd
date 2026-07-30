import type { CompanyInfo } from '@/lib/types';
import companyData from '@/data/company.json';

export async function getCompanyInfo(): Promise<CompanyInfo> {
  return companyData as CompanyInfo;
}
