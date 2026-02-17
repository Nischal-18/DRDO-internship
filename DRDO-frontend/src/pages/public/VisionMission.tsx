import React from 'react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import AnimatedSection from '@/components/common/AnimatedSection';

const VisionMission: React.FC = () => {
  return (
    <div>
      <section className="section-spacing">
        <div className="container-custom">
          <Breadcrumbs items={[{ label: 'Vision & Mission' }]} className="mb-8" />
          
          <AnimatedSection animation="fadeInUp">
            <h1 className="text-4xl font-bold text-primary-800 mb-6">
              Vision & Mission
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white rounded-xl p-8 shadow-md border border-neutral-200">
                <h2 className="text-2xl font-semibold text-primary-700 mb-4">Our Vision</h2>
                <p className="text-neutral-600 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-md border border-neutral-200">
                <h2 className="text-2xl font-semibold text-primary-700 mb-4">Our Mission</h2>
                <p className="text-neutral-600 leading-relaxed">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
                  aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default VisionMission;
