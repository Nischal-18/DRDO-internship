import React from 'react';
import AnimatedSection from '@/components/common/AnimatedSection';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import { Rocket, Target, Users } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white section-spacing">
        <div className="container-custom">
          <AnimatedSection animation="fadeInUp">
            <div className="max-w-3xl">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white">
                Defence Research & Development Organisation
              </h1>
              <p className="text-xl text-primary-100 mb-8 leading-relaxed">
                Advancing India's defence capabilities through cutting-edge research, innovation, 
                and technological excellence.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="accent" size="lg" as="link" to="/about">
                  Learn More
                </Button>
                <Button variant="secondary" size="lg" as="link" to="/careers">
                  Career Opportunities
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Key Areas Section */}
      <section className="section-spacing bg-white">
        <div className="container-custom">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-primary-800 mb-4">
                Our Focus Areas
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Pioneering defence technology across multiple domains
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection animation="fadeInUp" delay={0.1}>
              <Card
                icon={<Rocket className="w-6 h-6 text-primary-600" />}
                title="Advanced Research"
                description="Cutting-edge research in aerospace, electronics, and missile systems."
              />
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={0.2}>
              <Card
                icon={<Target className="w-6 h-6 text-primary-600" />}
                title="Innovation Hub"
                description="Developing next-generation defence technologies and solutions."
              />
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={0.3}>
              <Card
                icon={<Users className="w-6 h-6 text-primary-600" />}
                title="Expert Teams"
                description="World-class scientists and engineers driving innovation."
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-accent-50">
        <div className="container-custom">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-primary-800 mb-4">
                Join Our Mission
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                Be part of India's premier defence research organization and contribute to national security.
              </p>
              <Button variant="accent" size="lg" as="link" to="/careers">
                Explore Opportunities
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Home;
