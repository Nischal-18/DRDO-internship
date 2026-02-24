import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import AnimatedSection from '@/components/common/AnimatedSection';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { Briefcase } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { applicationsApi } from '@/services/api';

const Careers: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [applyingTo, setApplyingTo] = useState<number | null>(null);

  const handleApply = async (programId: number) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setApplyingTo(programId);
    try {
      await applicationsApi.submitApplication(programId);
      alert('Application submitted successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to submit application');
    } finally {
      setApplyingTo(null);
    }
  };

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
                  hover={false}
                >
                  <p className="text-neutral-400 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <Button
                    variant="accent"
                    size="sm"
                    onClick={() => handleApply(i)}
                    disabled={applyingTo === i}
                  >
                    {applyingTo === i ? 'Applying...' : 'Apply Now'}
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
