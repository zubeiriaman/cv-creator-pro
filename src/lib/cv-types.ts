export interface ExperienceEntry {
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  details: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  activities: string;
}

export interface CustomSection {
  heading: string;
  content: string;
}

export interface CVFormData {
  name: string;
  title: string;
  subtitle: string;
  phone: string;
  email: string;
  location: string;
  portfolio: string;
  social: string;
  summary: string;
  football: string;
  achievements: string;
  skills: string;
  portfolioContent: string;
  personalAttributes: string;
  languages: string;
  references: string;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  customSections: CustomSection[];
  sectionHeadings: {
    personalInfo: string;
    summary: string;
    experience: string;
    education: string;
    football: string;
    achievements: string;
    skills: string;
    portfolio: string;
    personalAttributes: string;
    languages: string;
    references: string;
  };
}

export type TemplateName = 'classic' | 'modern' | 'detailed' | 'executive1' | 'executive2';

export const defaultFormData: CVFormData = {
  name: 'James Richardson',
  title: 'Marketing Manager',
  subtitle: 'Digital Strategy & Brand Communications',
  phone: '+44 7700 900123',
  email: 'james.richardson@example.com',
  location: 'London, UK',
  portfolio: 'behance.net/jamesrichardson',
  social: 'linkedin.com/in/jamesrichardson',
  summary: 'Results-driven Marketing Manager with 8+ years of experience in digital strategy, brand communications, and campaign management. Proven track record in growing engagement across social media platforms by 150%. Skilled in content creation, analytics, SEO, and cross-functional team leadership. Passionate about innovative storytelling and data-driven decision making.',
  football: 'Organised annual charity football tournament raising £5,000+ for local youth programmes. Active member of the London Corporate Football League.',
  achievements: '• Increased brand social media following by 200% in 12 months\n• Led rebranding campaign resulting in 35% uplift in customer engagement\n• Won "Best Digital Campaign" at the UK Marketing Awards 2024\n• Managed £500K+ annual marketing budget',
  skills: 'Content Strategy, Social Media Management, SEO & SEM, Brand Communications, Data Analytics, Campaign Management, Team Leadership, CRM Tools',
  portfolioContent: '• Digital Campaigns: portfolio.example.com/campaigns\n• Design Work: behance.net/jamesrichardson\n• Writing Samples: Available upon request\n• Case Studies: Detailed ROI reports available',
  personalAttributes: 'Creative and detail-oriented professional with strong communication skills. Thrives in fast-paced environments. Proven ability to lead cross-functional teams and deliver projects on time. Flexible and adaptable to changing priorities.',
  languages: 'English (Native), French (Conversational), Spanish (Basic)',
  references: 'Sarah Thompson\nHead of Marketing, Acme Corp\nPhone: +44 7700 900456\nEmail: s.thompson@acme.example.com\n\nDr. Michael Chen\nSenior Lecturer, University of London\nPhone: +44 7700 900789\nEmail: m.chen@uol.example.com',
  experience: [
    {
      position: 'Senior Marketing Executive',
      company: 'Acme Corp',
      startDate: 'Mar 2021',
      endDate: 'Present',
      details: [
        'Developed and executed multi-channel marketing campaigns across digital and print',
        'Managed a team of 5 content creators and designers',
        'Increased website traffic by 120% through SEO and content strategy',
        'Coordinated with PR agencies for product launches and media events',
      ],
    },
    {
      position: 'Marketing Coordinator',
      company: 'Bright Media Ltd',
      startDate: 'Jun 2018',
      endDate: 'Feb 2021',
      details: [
        'Created content and graphics for social media campaigns',
        'Managed email marketing with 40% average open rate',
        'Assisted in organising industry events and trade shows',
      ],
    },
  ],
  education: [
    {
      degree: 'MSc Digital Marketing',
      institution: 'University of London, UK',
      startDate: '2022',
      endDate: '2024',
      activities: 'Digital analytics, consumer behaviour, brand strategy',
    },
    {
      degree: 'BA Business Administration',
      institution: 'University of Manchester, UK',
      startDate: '2014',
      endDate: '2018',
      activities: 'Marketing, Business Communication, Media Studies',
    },
  ],
  customSections: [],
  sectionHeadings: {
    personalInfo: 'Personal Information',
    summary: 'Professional Summary',
    experience: 'Professional Experience',
    education: 'Education',
    football: 'Sports & Activities',
    achievements: 'Key Achievements',
    skills: 'Core Competencies',
    portfolio: 'Portfolio',
    personalAttributes: 'Personal Attributes',
    languages: 'Languages',
    references: 'References',
  },
};
