import React from 'react';

export interface CardProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'featured' | 'glass';
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
  const baseStyles = 'rounded-xl p-6 border transition-all duration-300';

  const variantStyles = {
    default: 'bg-surface-800/60 border-surface-700/50 shadow-md',
    featured: 'bg-surface-800/80 border-primary-400/30 shadow-lg glow-cyan',
    glass: 'glass',
  };

  const hoverStyles = hover
    ? 'card-hover cursor-pointer hover:border-primary-400/30'
    : '';

  const classes = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${hoverStyles}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={classes} onClick={onClick}>
      {icon && (
        <div className="w-12 h-12 bg-primary-400/10 border border-primary-400/20 rounded-lg flex items-center justify-center mb-4">
          {icon}
        </div>
      )}
      
      {title && (
        <h4 className="text-xl font-semibold text-neutral-50 mb-2">
          {title}
        </h4>
      )}
      
      {description && (
        <p className="text-neutral-400 mb-4">
          {description}
        </p>
      )}
      
      {children}
    </div>
  );
};

export default Card;
