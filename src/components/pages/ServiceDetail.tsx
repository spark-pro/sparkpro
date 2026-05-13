'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Building2, Users, Cog, LineChart, Shield, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

export function ServiceDetail() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const serviceId = params?.id;

  const servicesData: Record<string, any> = {
    foundation: {
      id: 'foundation',
      title: 'Business & People Foundation Setup',
      subtitle: 'Building Structured, Compliant & Scalable HR Infrastructure',
      description: 'A strong organization begins with a strong foundation. Without structured HR frameworks, clear documentation, and compliant systems, businesses face operational confusion, legal exposure, and growth bottlenecks.',
      tagline: 'Spark Pro establishes complete HR foundations that are digitally aligned and ready to scale.',
      icon: Building2,
      scope: [
        {
          title: 'HR Policy & Governance Frameworks',
          items: [
            'Comprehensive HR policy manuals',
            'Employee handbook design',
            'Leave, attendance, and workplace conduct policies',
            'Code of ethics and disciplinary procedures',
          ],
        },
        {
          title: 'Employment Documentation Architecture',
          items: [
            'Offer letters and appointment letters',
            'Employment contracts & agreements',
            'Confidentiality & NDA documentation',
            'Exit and full & final settlement frameworks',
          ],
        },
        {
          title: 'Payroll & Compensation Structuring',
          items: [
            'Salary structure design (CTC structuring)',
            'Statutory compliance components',
            'Incentive & performance-linked pay frameworks',
            'Payroll process mapping',
          ],
        },
        {
          title: 'Employee Lifecycle Design',
          items: [
            'Recruitment-to-exit process mapping',
            'Onboarding and confirmation cycles',
            'Performance review cycles',
            'Exit management systems',
          ],
        },
        {
          title: 'Digital Documentation Systems',
          items: [
            'Secure cloud-based record management',
            'Digital employee file systems',
            'Structured approval workflows',
          ],
        },
      ],
      impact: [
        'Operational clarity',
        'Reduced compliance risk',
        'Professional HR governance',
        'Scalable infrastructure for future growth',
      ],
      image: 'https://images.unsplash.com/photo-1758873268663-5a362616b5a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NzEyMDQ3Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    talent: {
      id: 'talent',
      title: 'Talent Acquisition & Workforce Enablement',
      subtitle: 'Strategic Hiring & Workforce Optimization Systems',
      description: 'Hiring is not transactional — it is strategic. Spark Pro designs structured, technology-enabled recruitment systems that improve hiring accuracy, reduce turnaround time, and enhance workforce performance.',
      tagline: '',
      icon: Users,
      scope: [
        {
          title: 'Recruitment Process Engineering',
          items: [
            'Structured hiring workflows',
            'Competency-based interview frameworks',
            'Hiring SLAs and process governance',
            'Candidate evaluation scorecards',
          ],
        },
        {
          title: 'Technology-Enabled Recruitment',
          items: [
            'Applicant Tracking System (ATS) setup',
            'Automated resume screening systems',
            'Interview scheduling workflows',
            'Recruitment analytics dashboards',
          ],
        },
        {
          title: 'Employer Branding Advisory',
          items: [
            'Employer Value Proposition (EVP) development',
            'Career page strategy',
            'Candidate communication frameworks',
          ],
        },
        {
          title: 'Digital Onboarding & Enablement',
          items: [
            'Structured onboarding programs',
            'Automated onboarding workflows',
            'Induction & role clarity documentation',
            'Performance goal-setting frameworks',
          ],
        },
        {
          title: 'Workforce Development Frameworks',
          items: [
            'Skill gap analysis',
            'Training need identification',
            'Competency mapping',
            'Learning pathway structuring',
          ],
        },
      ],
      impact: [
        'Faster hiring cycles',
        'Improved talent quality',
        'Structured onboarding experience',
        'Performance-driven workforce culture',
      ],
      image: 'https://images.unsplash.com/photo-1758518730384-be3d205838e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhhbmRzaGFrZXxlbnwxfHx8fDE3NzEzMTA5NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    operations: {
      id: 'operations',
      title: 'HR Operations, Automation & Digitalization',
      subtitle: 'Modernizing HR Through Workflow Engineering & Automation',
      description: 'Manual HR operations slow productivity and create data inconsistencies. Spark Pro transforms HR operations through automation, digital systems, and structured workflow architecture.',
      tagline: '',
      icon: Cog,
      scope: [
        {
          title: 'HR Process Re-Engineering',
          items: [
            'SOP creation and documentation',
            'HR workflow mapping',
            'Operational bottleneck identification',
            'Process optimization planning',
          ],
        },
        {
          title: 'Automation Framework Design',
          items: [
            'Leave & attendance automation',
            'Payroll workflow automation',
            'Employee approval workflows',
            'Exit clearance automation',
          ],
        },
        {
          title: 'HRMS Configuration & Optimization',
          items: [
            'System implementation support',
            'Module configuration',
            'Employee self-service portals',
            'Workflow-based approvals',
          ],
        },
        {
          title: 'Workforce Analytics & Reporting',
          items: [
            'Real-time HR dashboards',
            'Attrition and retention analytics',
            'Headcount forecasting reports',
            'Productivity monitoring systems',
          ],
        },
        {
          title: 'Digital Record & Data Governance',
          items: [
            'Secure digital document storage',
            'Access control protocols',
            'Data security alignment',
          ],
        },
      ],
      impact: [
        'Reduced administrative workload',
        'Improved operational efficiency',
        'Real-time workforce visibility',
        'Data-backed HR decision-making',
      ],
      image: 'https://images.unsplash.com/photo-1762330464415-e971f55ae0b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIUiUyMHRlY2hub2xvZ3klMjBkaWdpdGFsJTIwdHJhbnNmb3JtYXRpb258ZW58MXx8fHwxNzcxMzEwOTU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    software: {
      id: 'software',
      title: 'HR Software, Web Apps & People Platforms',
      subtitle: 'Architecting Integrated HR Technology Ecosystems',
      description: 'HR technology must align with business objectives — not complicate them. Spark Pro supports organizations in selecting, implementing, and integrating HR technology platforms that centralize and streamline people management.',
      tagline: '',
      icon: LineChart,
      scope: [
        {
          title: 'HRMS Advisory & Implementation',
          items: [
            'Software evaluation and selection',
            'Vendor comparison and advisory',
            'Deployment and configuration',
            'Workflow customization',
          ],
        },
        {
          title: 'Custom HR Web Applications',
          items: [
            'Employee portals',
            'Internal HR dashboards',
            'Performance management platforms',
            'Recruitment tracking systems',
          ],
        },
        {
          title: 'Cloud-Based Workforce Platforms',
          items: [
            'Multi-location workforce systems',
            'Remote workforce enablement tools',
            'Mobile-enabled HR applications',
          ],
        },
        {
          title: 'System Integration & API Connectivity',
          items: [
            'HRMS integration with payroll systems',
            'HRMS + ERP connectivity',
            'Attendance device integration',
            'Cross-platform data synchronization',
          ],
        },
        {
          title: 'Technology Governance & Security',
          items: [
            'Access management frameworks',
            'Compliance tracking systems',
            'System audit readiness support',
          ],
        },
      ],
      impact: [
        'Centralized HR technology infrastructure',
        'Improved transparency',
        'Secure and scalable digital workforce systems',
        'Seamless integration with enterprise tools',
      ],
      image: 'https://images.unsplash.com/photo-1758611972613-3afe657c3249?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB3b3JrcGxhY2UlMjBjdWx0dXJlfGVufDF8fHx8MTc3MTMxMDk1N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    compliance: {
      id: 'compliance',
      title: 'HR Audits, Compliance & Advisory',
      subtitle: 'Governance, Risk Management & Regulatory Alignment',
      description: 'Compliance is a critical pillar of workforce management. Spark Pro provides structured HR audits and advisory services to ensure regulatory adherence, documentation accuracy, and risk mitigation.',
      tagline: '',
      icon: Shield,
      scope: [
        {
          title: 'HR Compliance Audits',
          items: [
            'Policy compliance review',
            'Documentation audit',
            'Payroll statutory compliance review',
            'Employment contract validation',
          ],
        },
        {
          title: 'Labor Law & Regulatory Advisory',
          items: [
            'Employment law guidance',
            'Statutory compliance mapping',
            'Regulatory update advisory',
            'Contractual risk assessment',
          ],
        },
        {
          title: 'Gap Analysis & Risk Assessment',
          items: [
            'HR process gap identification',
            'Compliance exposure assessment',
            'Remediation action planning',
          ],
        },
        {
          title: 'Governance Framework Development',
          items: [
            'Internal control structures',
            'HR governance policies',
            'Leadership compliance accountability systems',
          ],
        },
        {
          title: 'Ongoing Advisory Support',
          items: [
            'Retainer-based HR advisory',
            'Compliance monitoring support',
            'HR transformation consulting',
          ],
        },
      ],
      impact: [
        'Reduced legal and compliance risk',
        'Audit-ready HR documentation',
        'Strengthened governance frameworks',
        'Leadership confidence in workforce compliance',
      ],
      image: 'https://images.unsplash.com/photo-1704969724221-8b7361b61f75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbXBsaWFuY2UlMjBhdWRpdHxlbnwxfHx8fDE3NzEzMTA5NThdfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  };

  useEffect(() => {
    if (!serviceId || !servicesData[serviceId]) {
      router.replace('/services');
    }
  }, [serviceId, router]);

  if (!serviceId || !servicesData[serviceId]) {
    return null;
  }

  const service = servicesData[serviceId];
  const Icon = service.icon;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Services
          </Link>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl mb-6">
            <Icon className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">{service.title}</h1>
          <p className="text-2xl text-blue-100 mb-6">{service.subtitle}</p>
          <p className="text-xl text-blue-50 max-w-4xl">{service.description}</p>
          {service.tagline && (
            <p className="text-xl text-white font-semibold mt-6 max-w-4xl">
              {service.tagline}
            </p>
          )}
        </div>
      </section>

      {/* Image Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Scope Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Scope Includes
          </h2>

          <div className="space-y-8">
            {service.scope.map((area: any, index: number) => (
              <div key={index} className="bg-white p-8 rounded-lg border border-gray-200">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {area.title}
                </h3>
                <ul className="grid md:grid-cols-2 gap-3">
                  {area.items.map((item: string, itemIndex: number) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Impact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Business Impact
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.impact.map((item: string, index: number) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-100"
              >
                <CheckCircle className="h-8 w-8 text-blue-600 mb-3" />
                <p className="text-lg font-semibold text-gray-900">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss how this service can transform your HR operations and support your business growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-blue-600 text-white px-10 py-5 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Schedule a Consultation
              <ArrowRight className="ml-2 h-6 w-6" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center border-2 border-white text-white px-10 py-5 rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
