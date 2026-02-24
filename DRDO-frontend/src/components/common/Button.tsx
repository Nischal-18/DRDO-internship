import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'accent' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  as?: 'button' | 'link';
  to?: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  as = 'button',
  to,
  href,
  type = 'button',
  onClick,
  className = '',
}) => {
  // Base styles - dark theme
  const baseStyles = `
    inline-flex items-center justify-center gap-2 font-semibold rounded-xl
    transition-all duration-300 ease-out
    focus-ring
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    active:scale-[0.97]
  `.trim().replace(/\s+/g, ' ');

  // Variant styles - dark theme with glows
  const variantStyles = {
    primary: `
      bg-gradient-to-r from-primary-500 to-primary-400 text-surface-950
      hover:shadow-glow-cyan hover:brightness-110
      shadow-md
    `.trim().replace(/\s+/g, ' '),
    accent: `
      bg-gradient-to-r from-accent-500 to-accent-400 text-white
      hover:shadow-glow-orange hover:brightness-110
      shadow-md
    `.trim().replace(/\s+/g, ' '),
    secondary: `
      bg-surface-800 text-neutral-100 border border-surface-600
      hover:border-primary-400/50 hover:bg-surface-700 hover:text-primary-300
    `.trim().replace(/\s+/g, ' '),
    ghost: `
      text-neutral-300 hover:text-primary-400 hover:bg-surface-800/60
    `.trim().replace(/\s+/g, ' '),
    danger: `
      bg-error-500/20 text-error-400 border border-error-500/30
      hover:bg-error-500/30 hover:border-error-400/50
    `.trim().replace(/\s+/g, ' '),
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  // Combine classes
  const classes = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  // Content with optional loading spinner
  const content = (
    <>
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </>
  );

  // Render as Link (React Router)
  if (as === 'link' && to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  // Render as anchor tag (external link)
  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  // Render as button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
    >
      {content}
    </button>
  );
};

export default Button;
