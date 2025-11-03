
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-gray-800 rounded-lg shadow-md border border-gray-700 hover:border-primary/50 transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
