import React from 'react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import AnimatedSection from '@/components/common/AnimatedSection';
import Card from '@/components/common/Card';
import { Microscope } from 'lucide-react';

const Research: React.FC = () => {
  return (
    <div>
      <section className="section-spacing">
        <div className="container-custom">
          <Breadcrumbs items={[{ label: 'Research & Development' }]} className="mb-8" />
          
          <AnimatedSection animation="fadeInUp">
            <h1 className="text-4xl font-bold text-neutral-50 mb-6">
              Research & Development
            </h1>
            <p className="text-lg text-neutral-400 mb-12">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <AnimatedSection key={i} animation="fadeInUp" delay={i * 0.1}>
                <Card
                  icon={<Microscope className="w-6 h-6 text-primary-400" />}
                  title={`Research Area ${i}`}
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Research;
