
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`
      relative overflow-hidden
      bg-gradient-to-br from-gray-800 to-gray-900 
      rounded-xl shadow-lg border border-white/10
      transition-all duration-300 group
      hover:shadow-primary/20 hover:border-primary/30 hover:scale-[1.02]
      ${className}
    `}>
      <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
      <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-radial from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shine"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Card;
