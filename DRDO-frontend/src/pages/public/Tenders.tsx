import React from 'react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import AnimatedSection from '@/components/common/AnimatedSection';
import Card from '@/components/common/Card';
import { FileText } from 'lucide-react';

const Tenders: React.FC = () => {
  return (
    <div>
      <section className="section-spacing">
        <div className="container-custom">
          <Breadcrumbs items={[{ label: 'Tenders' }]} className="mb-8" />
          
          <AnimatedSection animation="fadeInUp">
            <h1 className="text-4xl font-bold text-neutral-50 mb-6">
              Tenders & Procurement
            </h1>
            <p className="text-lg text-neutral-400 mb-12">
              Current tender opportunities and procurement information.
            </p>
          </AnimatedSection>

          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <AnimatedSection key={i} animation="fadeInUp" delay={i * 0.1}>
                <Card
                  icon={<FileText className="w-6 h-6 text-primary-400" />}
                  title={`Tender Notice ${i}`}
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Deadline: DD/MM/YYYY"
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tenders;
