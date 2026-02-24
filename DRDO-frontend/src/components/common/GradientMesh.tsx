import React from 'react';

export interface GradientMeshProps {
  variant?: 'default' | 'subtle' | 'hero';
  className?: string;
}

const GradientMesh: React.FC<GradientMeshProps> = ({ 
  variant = 'default',
  className = '' 
}) => {
  const variants = {
    default: (
      <>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/4 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/3 rounded-full blur-[100px]" />
      </>
    ),
    subtle: (
      <>
        <div className="absolute top-10 right-1/4 w-64 h-64 bg-primary-400/3 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-accent-500/2 rounded-full blur-3xl" />
      </>
    ),
    hero: (
      <>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-400/8 via-transparent to-accent-500/5" />
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-primary-400/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-accent-500/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/3 w-[300px] h-[300px] bg-primary-500/5 rounded-full blur-[80px]" />
      </>
    ),
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {variants[variant]}
    </div>
  );
};

export default GradientMesh;
