import React from 'react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import AnimatedSection from '@/components/common/AnimatedSection';
import FormField from '@/components/common/FormField';
import Button from '@/components/common/Button';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div>
      <section className="section-spacing">
        <div className="container-custom">
          <Breadcrumbs items={[{ label: 'Contact Us' }]} className="mb-8" />
          
          <AnimatedSection animation="fadeInUp">
            <h1 className="text-4xl font-bold text-neutral-50 mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-neutral-400 mb-12">
              Get in touch with us for any inquiries or assistance.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <AnimatedSection animation="slideInLeft">
              <div className="bg-surface-800/60 rounded-xl p-8 border border-surface-700/50">
                <h2 className="text-2xl font-semibold text-neutral-50 mb-6">Send a Message</h2>
                <form className="space-y-4">
                  <FormField label="Full Name" name="name" type="text" required />
                  <FormField label="Email Address" name="email" type="email" required />
                  <FormField label="Subject" name="subject" type="text" required />
                  <FormField 
                    label="Message" 
                    name="message" 
                    type="textarea" 
                    rows={6}
                    required 
                  />
                  <Button variant="accent" size="lg" fullWidth type="submit">
                    Send Message
                  </Button>
                </form>
              </div>
            </AnimatedSection>

            {/* Contact Information */}
            <AnimatedSection animation="slideInRight">
              <div className="space-y-6">
                <div className="bg-surface-800/60 rounded-xl p-6 border border-surface-700/50 hover:border-primary-400/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-400/10 border border-primary-400/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-50 mb-2">Address</h3>
                      <p className="text-neutral-400">
                        DRDO Bhawan, Rajaji Marg<br />
                        New Delhi - 110011<br />
                        India
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-800/60 rounded-xl p-6 border border-surface-700/50 hover:border-accent-500/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent-500/10 border border-accent-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-accent-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-50 mb-2">Phone</h3>
                      <p className="text-neutral-400">
                        +91-11-2300-0000<br />
                        +91-11-2300-0001
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-800/60 rounded-xl p-6 border border-surface-700/50 hover:border-primary-400/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-400/10 border border-primary-400/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-50 mb-2">Email</h3>
                      <p className="text-neutral-400">
                        info@drdo.gov.in<br />
                        contact@drdo.gov.in
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
