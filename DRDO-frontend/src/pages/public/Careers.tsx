import React from 'react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import AnimatedSection from '@/components/common/AnimatedSection';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { Briefcase } from 'lucide-react';

const Careers: React.FC = () => {
  return (
    <div>
      <section className="section-spacing">
        <div className="container-custom">
          <Breadcrumbs items={[{ label: 'Careers' }]} className="mb-8" />
          
          <AnimatedSection animation="fadeInUp">
            <h1 className="text-4xl font-bold text-neutral-50 mb-6">
              Career Opportunities
            </h1>
            <p className="text-lg text-neutral-400 mb-12">
              Join our team of exceptional scientists and engineers.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <AnimatedSection key={i} animation="fadeInUp" delay={i * 0.1}>
                <Card
                  icon={<Briefcase className="w-6 h-6 text-primary-400" />}
                  title={`Position ${i}`}
                >
                  <p className="text-neutral-400 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <Button variant="accent" size="sm">
                    Apply Now
                  </Button>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
