import React from 'react';

interface BreadcrumbsProps {
  project?: string;
  sprint?: string;
  title: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ project, sprint, title }) => {
  return (
    <nav className="text-sm text-text-secondary dark:text-text-secondary-dark">
      <ol className="list-none p-0 inline-flex items-center">
        {project && (
            <>
                <li className="flex items-center">
                    <a href="#" className="hover:underline">{project}</a>
                </li>
                <li className="mx-2">/</li>
            </>
        )}
        {sprint && (
             <>
                <li className="flex items-center">
                    <a href="#" className="hover:underline">{sprint}</a>
                </li>
                <li className="mx-2">/</li>
            </>
        )}
        <li className="text-text-main dark:text-text-main-dark font-medium">{title}</li>
      </ol>
    </nav>
  );
};
