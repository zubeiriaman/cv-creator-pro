export interface CVFormData {
  name: string;
  title: string;
  phone: string;
  email: string;
  location: string;
  portfolio: string;
  social: string;
  summary: string;
  football: string;
  achievements: string;
  skills: string;
  experience: string[];
  experienceDetails: string[];
  education: string[];
}

export type TemplateName = 'classic' | 'modern' | 'detailed' | 'executive1' | 'executive2';

export const defaultFormData: CVFormData = {
  name: 'Zubeiri Aman Taha',
  title: 'Media Executive',
  phone: '+447884354192',
  email: 'zat.ukwork@gmail.com',
  location: 'Luton, UK',
  portfolio: 'behance.net/zubeiriaman',
  social: 'youtube.com/playlist?list=PLqxFDwhgZcjwpNRIiwumEuEh8ieyKrX7y',
  summary: 'Dedicated Media Executive with 18 years as Chelsea FC supporter and 16 years active football participation. Professional FIFA champion, TV football analyst, and strategic communications professional.',
  football: 'Professional FIFA Esports champion (AIUB Winner, 4× FIFA Pro Club Bangladesh Champion), TV football analyst, and community page manager.',
  achievements: '• AIUB Inter FIFA Competition Winner\n• 4× FIFA Pro Club Bangladesh Champion\n• Featured football analyst on Bangladeshi sports TV\n• Stadium visits: Stamford Bridge & Emirates Stadium',
  skills: 'Content Writing, Social Media Management, Sports Event Management, Press Releases, Media Coordination, Brand Communications',
  experience: [
    'Executive - Employee Engagement | foodpanda Bangladesh | Jan 2023 -- Jul 2023',
    'Employer Branding | foodpanda Bangladesh | May 2022 -- Dec 2022',
  ],
  experienceDetails: [
    '• Drafted, edited, and published press releases, news articles, and announcements',
    '• Led media operations for Annual Summit 2022 (500+ attendees)',
    '• Arranged foodpanda football tournament with full media coverage',
    '• Managed content across social media platforms and corporate websites',
  ],
  education: [
    'MSc Strategic Marketing & Digital Media Management | University of Hertfordshire, UK | 2024--2026',
    'BBA | East West University, Bangladesh | 2017--2021',
  ],
};
