"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getPageMetadata } from '@/utils/metadata';

export default function DynamicMetadata() {
  const pathname = usePathname();
  
  useEffect(() => {
    const metadata = getPageMetadata(pathname);
    
    // تحديث عنوان الصفحة
    document.title = metadata.title;
    
    // تحديث meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', metadata.description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = metadata.description;
      document.head.appendChild(meta);
    }
    
    // تحديث Open Graph title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', metadata.title);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:title');
      meta.content = metadata.title;
      document.head.appendChild(meta);
    }
    
    // تحديث Open Graph description
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', metadata.description);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:description');
      meta.content = metadata.description;
      document.head.appendChild(meta);
    }
    
    // تحديث Twitter title
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', metadata.title);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'twitter:title';
      meta.content = metadata.title;
      document.head.appendChild(meta);
    }
    
    // تحديث Twitter description
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', metadata.description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'twitter:description';
      meta.content = metadata.description;
      document.head.appendChild(meta);
    }
  }, [pathname]);
  
  return null;
}
