import type { PageContent, PageKey } from '@/lib/types';
import pagesData from '@/data/pages.json';

export async function getPageContent(pageKey: PageKey): Promise<PageContent> {
  const content = (pagesData as Record<string, PageContent>)[pageKey];
  if (!content) {
    throw new Error(`No page content found for key: ${pageKey}`);
  }
  return content;
}
