import React from 'react';

export interface CardProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'featured';
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  description,
  icon,
  variant = 'default',
  hover = true,
  className = '',
  onClick,
}) => {
  const baseStyles = 'bg-white rounded-xl p-6 shadow-md border border-neutral-200';
  const hoverStyles = hover ? 'card-hover cursor-pointer' : '';
  const variantStyles = {
    default: '',
    featured: 'ring-2 ring-accent-400 shadow-lg',
  };

  const classes = `
    ${baseStyles}
    ${hoverStyles}
    ${variantStyles[variant]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={classes} onClick={onClick}>
      {icon && (
        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
          {icon}
        </div>
      )}
      
      {title && (
        <h4 className="text-xl font-semibold text-primary-800 mb-2">
          {title}
        </h4>
      )}
      
      {description && (
        <p className="text-neutral-600 mb-4">
          {description}
        </p>
      )}
      
      {children}
    </div>
  );
};

export default Card;
