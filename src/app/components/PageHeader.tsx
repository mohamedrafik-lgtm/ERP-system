"use client";

import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
}

export default function PageHeader({ 
  title, 
  description, 
  breadcrumbs = [], 
  actions 
}: PageHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4 rtl:space-x-reverse">
            <Link href="/" className="flex items-center hover:text-gray-700">
              <HomeIcon className="w-4 h-4" />
            </Link>
            {breadcrumbs.map((breadcrumb, index) => (
              <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                <ChevronRightIcon className="w-4 h-4" />
                {breadcrumb.href ? (
                  <Link 
                    href={breadcrumb.href} 
                    className="hover:text-gray-700 transition-colors"
                  >
                    {breadcrumb.label}
                  </Link>
                ) : (
                  <span className="text-gray-900 font-medium">
                    {breadcrumb.label}
                  </span>
                )}
              </div>
            ))}
          </nav>
        )}

        {/* Header Content */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {description && (
              <p className="mt-1 text-sm text-gray-600">{description}</p>
            )}
          </div>
          
          {actions && (
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
