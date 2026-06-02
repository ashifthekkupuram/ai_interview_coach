import React from 'react';

interface PageWrapperProps extends React.HTMLAttributes<HTMLDivElement> {}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, className = "", ...props }) => {
  return (
    <div 
      className={`flex flex-col items-center w-full min-h-screen bg-white text-black p-4 sm:p-8 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
