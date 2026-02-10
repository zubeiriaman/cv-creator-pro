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
  experience: ExperienceEntry[];
  education: EducationEntry[];
  sectionHeadings: {
    personalInfo: string;
    summary: string;
    experience: string;
    education: string;
    football: string;
    achievements: string;
    skills: string;
  };
}

export type TemplateName = 'classic' | 'modern' | 'detailed' | 'executive1' | 'executive2';

export const defaultFormData: CVFormData = {
  name: 'Zubeiri Aman Taha',
  title: 'Media Executive',
  subtitle: 'Communications & Sports Media Professional',
  phone: '+447884354192',
  email: 'zat.ukwork@gmail.com',
  location: 'Luton, UK',
  portfolio: 'behance.net/zubeiriaman',
  social: 'youtube.com/playlist?list=PLqxFDwhgZcjwpNRIiwumEuEh8ieyKrX7y',
  summary: 'Dedicated Media Executive with 18 years as Chelsea FC supporter and 16 years active football participation. Professional FIFA champion (AIUB Winner, 4× FIFA Pro Club Bangladesh Champion), TV football analyst, and strategic communications professional. Managed Chelsea Fans Supporters of Bangladesh official page and Football Lovers Club Bangladesh page, posting regular football content and graphics. Extensive background in sports event management, content creation, news writing, and community management. Skilled in press releases, media coordination, editing, and digital publishing. Experienced with government and official sports organizations. Recently attended Stamford Bridge (Chelsea vs Benfica) and Emirates Stadium (Brazil vs Senegal).',
  football: 'Professional FIFA Esports champion (AIUB Winner, 4× FIFA Pro Club Bangladesh Champion), TV football analyst, and community page manager.',
  achievements: '• AIUB Inter FIFA Competition Winner\n• 4× FIFA Pro Club Bangladesh Champion\n• Featured football analyst on Bangladeshi sports TV\n• Stadium visits: Stamford Bridge & Emirates Stadium',
  skills: 'Content Writing, Social Media Management, Sports Event Management, Press Releases, Media Coordination, Brand Communications',
  experience: [
    {
      position: 'Executive - Employee Engagement & Media Activities',
      company: 'foodpanda Bangladesh',
      startDate: 'Jan 2023',
      endDate: 'Jul 2023',
      details: [
        'Drafted, edited, and published press releases, news articles, and announcements',
        'Led media operations for Annual Summit 2022 (500+ attendees)',
        'Arranged foodpanda football tournament with full media coverage',
        'Managed content across social media platforms and corporate websites',
      ],
    },
    {
      position: 'Employer Branding',
      company: 'foodpanda Bangladesh',
      startDate: 'May 2022',
      endDate: 'Dec 2022',
      details: [
        'Created content and graphics for social media campaigns',
        'Managed employee engagement activities and internal communications',
        'Conducted brand reputation research and analysis',
      ],
    },
  ],
  education: [
    {
      degree: 'MSc Strategic Marketing & Digital Media Management',
      institution: 'University of Hertfordshire, UK',
      startDate: '2024',
      endDate: '2026',
      activities: 'Digital content strategy, media management, brand communications',
    },
    {
      degree: 'BBA',
      institution: 'East West University, Bangladesh',
      startDate: '2017',
      endDate: '2021',
      activities: 'Marketing Communications, Business Writing, Digital Media',
    },
  ],
  sectionHeadings: {
    personalInfo: 'Personal Information',
    summary: 'Professional Summary',
    experience: 'Experience',
    education: 'Education',
    football: 'Football / Sports',
    achievements: 'Achievements',
    skills: 'Skills',
  },
};
