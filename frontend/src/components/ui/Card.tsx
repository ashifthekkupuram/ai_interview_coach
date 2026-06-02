import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card: React.FC<CardProps> = ({ children, className = "", ...props }) => {
  return (
    <div 
      className={`bg-white border border-black p-8 sm:p-10 flex flex-col backdrop-blur-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
