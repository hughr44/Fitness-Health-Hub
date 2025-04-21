import React from 'react';

type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
};

const CTAButton: React.FC<CTAButtonProps> = ({ 
  href, 
  children, 
  variant = 'primary',
  size = 'medium'
}) => {
  const baseStyles = "inline-block font-bold rounded-full transition-all duration-300 transform hover:scale-105 text-center shadow-md";
  
  const variantStyles = {
    primary: "bg-yellow-500 hover:bg-yellow-400 text-gray-900",
    secondary: "bg-blue-600 hover:bg-blue-500 text-white"
  };
  
  const sizeStyles = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg"
  };
  
  const className = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`;
  
  return (
    <a 
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default CTAButton;
