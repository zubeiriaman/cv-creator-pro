import { CVFormData, ExperienceEntry, EducationEntry } from '@/lib/cv-types';
import { Plus, X } from 'lucide-react';

interface CVFormProps {
  data: CVFormData;
  onChange: (data: CVFormData) => void;
}

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="mb-3">
    <label className="mb-1 block text-xs font-medium text-muted-foreground">{label}</label>
    {children}
  </div>
);

const inputClass = "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors";
const textareaClass = inputClass + " min-h-[60px] resize-y";
const smallInputClass = "w-full rounded-md border border-border bg-background px-2 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors";

const CVForm = ({ data, onChange }: CVFormProps) => {
  const set = <K extends keyof CVFormData>(key: K, value: CVFormData[K]) =>
    onChange({ ...data, [key]: value });

  const setHeading = (key: keyof CVFormData['sectionHeadings'], value: string) =>
    onChange({ ...data, sectionHeadings: { ...data.sectionHeadings, [key]: value } });

  const addExperience = () => {
    set('experience', [...data.experience, { position: '', company: '', startDate: '', endDate: '', details: [''] }]);
  };

  const updateExperience = (idx: number, field: keyof ExperienceEntry, val: string | string[]) => {
    const arr = [...data.experience];
    arr[idx] = { ...arr[idx], [field]: val };
    set('experience', arr);
  };

  const removeExperience = (idx: number) => {
    set('experience', data.experience.filter((_, i) => i !== idx));
  };

  const addEducation = () => {
    set('education', [...data.education, { degree: '', institution: '', startDate: '', endDate: '', activities: '' }]);
  };

  const updateEducation = (idx: number, field: keyof EducationEntry, val: string) => {
    const arr = [...data.education];
    arr[idx] = { ...arr[idx], [field]: val };
    set('education', arr);
  };

  const removeEducation = (idx: number) => {
    set('education', data.education.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-4">
      <Section title={data.sectionHeadings.personalInfo} headingKey="personalInfo" onHeadingChange={setHeading}>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Full Name *">
            <input className={inputClass} value={data.name} onChange={e => set('name', e.target.value)} />
          </Field>
          <Field label="Job Title *">
            <input className={inputClass} value={data.title} onChange={e => set('title', e.target.value)} />
          </Field>
        </div>
        <Field label="Subtitle">
          <input className={inputClass} value={data.subtitle} onChange={e => set('subtitle', e.target.value)} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Phone *">
            <input className={inputClass} value={data.phone} onChange={e => set('phone', e.target.value)} />
          </Field>
          <Field label="Email *">
            <input className={inputClass} value={data.email} onChange={e => set('email', e.target.value)} />
          </Field>
        </div>
        <Field label="Location *">
          <input className={inputClass} value={data.location} onChange={e => set('location', e.target.value)} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Portfolio URL">
            <input className={inputClass} value={data.portfolio} onChange={e => set('portfolio', e.target.value)} />
          </Field>
          <Field label="Social URL">
            <input className={inputClass} value={data.social} onChange={e => set('social', e.target.value)} />
          </Field>
        </div>
      </Section>

      <Section title={data.sectionHeadings.summary} headingKey="summary" onHeadingChange={setHeading}>
        <textarea className={textareaClass} rows={3} value={data.summary} onChange={e => set('summary', e.target.value)} />
      </Section>

      <Section title={data.sectionHeadings.experience} headingKey="experience" onHeadingChange={setHeading}>
        {data.experience.map((exp, idx) => (
          <div key={idx} className="mb-4 rounded-md border border-border/50 bg-background/50 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Experience {idx + 1}</span>
              <button onClick={() => removeExperience(idx)} className="rounded-md bg-destructive/20 px-2 py-0.5 text-destructive hover:bg-destructive/30 transition-colors">
                <X size={12} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <Field label="Position">
                <input className={inputClass} value={exp.position} placeholder="Job Title" onChange={e => updateExperience(idx, 'position', e.target.value)} />
              </Field>
              <Field label="Company">
                <input className={inputClass} value={exp.company} placeholder="Company Name" onChange={e => updateExperience(idx, 'company', e.target.value)} />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <Field label="Start Date">
                <input className={smallInputClass} value={exp.startDate} placeholder="Jan 2023" onChange={e => updateExperience(idx, 'startDate', e.target.value)} />
              </Field>
              <Field label="End Date">
                <input className={smallInputClass} value={exp.endDate} placeholder="Jul 2023" onChange={e => updateExperience(idx, 'endDate', e.target.value)} />
              </Field>
            </div>
            <Field label="Details (one per line)">
              <textarea
                className={textareaClass}
                rows={3}
                value={exp.details.join('\n')}
                onChange={e => updateExperience(idx, 'details', e.target.value.split('\n'))}
              />
            </Field>
          </div>
        ))}
        <button onClick={addExperience} className="flex items-center gap-1 rounded-md bg-success/20 px-3 py-1.5 text-xs font-medium text-success hover:bg-success/30 transition-colors">
          <Plus size={12} /> Add Experience
        </button>
      </Section>

      <Section title={data.sectionHeadings.education} headingKey="education" onHeadingChange={setHeading}>
        {data.education.map((edu, idx) => (
          <div key={idx} className="mb-4 rounded-md border border-border/50 bg-background/50 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Education {idx + 1}</span>
              <button onClick={() => removeEducation(idx)} className="rounded-md bg-destructive/20 px-2 py-0.5 text-destructive hover:bg-destructive/30 transition-colors">
                <X size={12} />
              </button>
            </div>
            <Field label="Degree">
              <input className={inputClass} value={edu.degree} placeholder="Degree Name" onChange={e => updateEducation(idx, 'degree', e.target.value)} />
            </Field>
            <Field label="Institution">
              <input className={inputClass} value={edu.institution} placeholder="University Name" onChange={e => updateEducation(idx, 'institution', e.target.value)} />
            </Field>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <Field label="Start Year">
                <input className={smallInputClass} value={edu.startDate} placeholder="2024" onChange={e => updateEducation(idx, 'startDate', e.target.value)} />
              </Field>
              <Field label="End Year">
                <input className={smallInputClass} value={edu.endDate} placeholder="2026" onChange={e => updateEducation(idx, 'endDate', e.target.value)} />
              </Field>
            </div>
            <Field label="Activities">
              <input className={inputClass} value={edu.activities} placeholder="Relevant activities" onChange={e => updateEducation(idx, 'activities', e.target.value)} />
            </Field>
          </div>
        ))}
        <button onClick={addEducation} className="flex items-center gap-1 rounded-md bg-success/20 px-3 py-1.5 text-xs font-medium text-success hover:bg-success/30 transition-colors">
          <Plus size={12} /> Add Education
        </button>
      </Section>

      <Section title={data.sectionHeadings.football} headingKey="football" onHeadingChange={setHeading}>
        <textarea className={textareaClass} rows={2} value={data.football} onChange={e => set('football', e.target.value)} />
      </Section>

      <Section title={data.sectionHeadings.achievements} headingKey="achievements" onHeadingChange={setHeading}>
        <textarea className={textareaClass} rows={3} value={data.achievements} onChange={e => set('achievements', e.target.value)} />
      </Section>

      <Section title={data.sectionHeadings.skills} headingKey="skills" onHeadingChange={setHeading}>
        <textarea className={textareaClass} rows={2} value={data.skills} onChange={e => set('skills', e.target.value)} />
      </Section>
    </div>
  );
};

const Section = ({ 
  title, 
  headingKey, 
  onHeadingChange, 
  children 
}: { 
  title: string; 
  headingKey: keyof CVFormData['sectionHeadings'];
  onHeadingChange: (key: keyof CVFormData['sectionHeadings'], value: string) => void;
  children: React.ReactNode;
}) => (
  <div className="rounded-lg border border-border bg-card p-4">
    <input
      className="mb-3 w-full border-b border-transparent bg-transparent text-sm font-semibold text-primary focus:border-primary focus:outline-none transition-colors"
      value={title}
      onChange={e => onHeadingChange(headingKey, e.target.value)}
    />
    {children}
  </div>
);

export default CVForm;
