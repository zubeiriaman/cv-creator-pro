import { CVFormData, ExperienceEntry, EducationEntry, CustomSection } from '@/lib/cv-types';
import { Plus, X, GripVertical, Type, List, Link, FileText, Users } from 'lucide-react';

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

type FieldType = 'paragraph' | 'bullet' | 'hyperlink' | 'structured' | 'text' | 'references';

const fieldTypeBadge: Record<FieldType, { label: string; icon: React.ReactNode; color: string }> = {
  paragraph: { label: 'Paragraph', icon: <Type size={10} />, color: 'bg-blue-500/15 text-blue-600' },
  bullet: { label: 'Bullet Points', icon: <List size={10} />, color: 'bg-green-500/15 text-green-600' },
  hyperlink: { label: 'Hyperlinks', icon: <Link size={10} />, color: 'bg-purple-500/15 text-purple-600' },
  structured: { label: 'Structured', icon: <FileText size={10} />, color: 'bg-orange-500/15 text-orange-600' },
  text: { label: 'Text', icon: <Type size={10} />, color: 'bg-muted text-muted-foreground' },
  references: { label: 'References', icon: <Users size={10} />, color: 'bg-rose-500/15 text-rose-600' },
};

const Badge = ({ type, hint }: { type: FieldType; hint?: string }) => {
  const b = fieldTypeBadge[type];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${b.color}`} title={hint}>
      {b.icon} {b.label}
    </span>
  );
};

type HeadingKey = keyof CVFormData['sectionHeadings'];

const CVForm = ({ data, onChange }: CVFormProps) => {
  const set = <K extends keyof CVFormData>(key: K, value: CVFormData[K]) =>
    onChange({ ...data, [key]: value });

  const setHeading = (key: HeadingKey, value: string) =>
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

  const addCustomSection = () => {
    set('customSections', [...data.customSections, { heading: 'New Section', content: '' }]);
  };

  const updateCustomSection = (idx: number, field: keyof CustomSection, val: string) => {
    const arr = [...data.customSections];
    arr[idx] = { ...arr[idx], [field]: val };
    set('customSections', arr);
  };

  const removeCustomSection = (idx: number) => {
    set('customSections', data.customSections.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-4">
      {/* Personal Info */}
      <Section title={data.sectionHeadings.personalInfo} headingKey="personalInfo" onHeadingChange={setHeading} badges={<><Badge type="text" hint="Plain text fields" /> <Badge type="hyperlink" hint="Portfolio & Social URLs become clickable links in CV" /></>}>
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
          <Field label="Portfolio URL 🔗">
            <input className={inputClass} value={data.portfolio} onChange={e => set('portfolio', e.target.value)} placeholder="https://behance.net/yourname" />
          </Field>
          <Field label="Social URL 🔗">
            <input className={inputClass} value={data.social} onChange={e => set('social', e.target.value)} placeholder="https://linkedin.com/in/yourname" />
          </Field>
        </div>
      </Section>

      {/* Summary */}
      <Section title={data.sectionHeadings.summary} headingKey="summary" onHeadingChange={setHeading} badges={<Badge type="paragraph" hint="Write as a continuous paragraph" />}>
        <p className="mb-2 text-[10px] text-muted-foreground italic">Write as a continuous paragraph. Use **bold** by wrapping text in double asterisks.</p>
        <textarea className={textareaClass} rows={3} value={data.summary} onChange={e => set('summary', e.target.value)} />
      </Section>

      {/* Experience */}
      <Section title={data.sectionHeadings.experience} headingKey="experience" onHeadingChange={setHeading} badges={<><Badge type="structured" hint="Structured fields with dates" /> <Badge type="bullet" hint="Details rendered as bullet points" /></>}>
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
                <input className={smallInputClass} value={exp.endDate} placeholder="Present" onChange={e => updateExperience(idx, 'endDate', e.target.value)} />
              </Field>
            </div>
            <Field label="Details (one bullet point per line)">
              <p className="mb-1 text-[10px] text-muted-foreground italic">Each line becomes a • bullet point in the CV</p>
              <textarea
                className={textareaClass}
                rows={3}
                value={exp.details.join('\n')}
                onChange={e => updateExperience(idx, 'details', e.target.value.split('\n'))}
              />
            </Field>
          </div>
        ))}
        <button onClick={addExperience} className="flex items-center gap-1 rounded-md bg-primary/20 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/30 transition-colors">
          <Plus size={12} /> Add Experience
        </button>
      </Section>

      {/* Education */}
      <Section title={data.sectionHeadings.education} headingKey="education" onHeadingChange={setHeading} badges={<Badge type="structured" hint="Structured fields with separate year boxes" />}>
        {data.education.map((edu, idx) => (
          <div key={idx} className="mb-4 rounded-md border border-border/50 bg-background/50 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Education {idx + 1}</span>
              <button onClick={() => removeEducation(idx)} className="rounded-md bg-destructive/20 px-2 py-0.5 text-destructive hover:bg-destructive/30 transition-colors">
                <X size={12} />
              </button>
            </div>
            <Field label="Degree">
              <input className={inputClass} value={edu.degree} placeholder="MSc Marketing" onChange={e => updateEducation(idx, 'degree', e.target.value)} />
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
              <input className={inputClass} value={edu.activities} placeholder="Relevant courses, activities" onChange={e => updateEducation(idx, 'activities', e.target.value)} />
            </Field>
          </div>
        ))}
        <button onClick={addEducation} className="flex items-center gap-1 rounded-md bg-primary/20 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/30 transition-colors">
          <Plus size={12} /> Add Education
        </button>
      </Section>

      {/* Skills */}
      <Section title={data.sectionHeadings.skills} headingKey="skills" onHeadingChange={setHeading} badges={<Badge type="text" hint="Comma-separated list of skills" />}>
        <p className="mb-2 text-[10px] text-muted-foreground italic">Comma-separated list of skills</p>
        <textarea className={textareaClass} rows={2} value={data.skills} onChange={e => set('skills', e.target.value)} placeholder="Content Strategy, Social Media, SEO..." />
      </Section>

      {/* Football / Sports */}
      <Section title={data.sectionHeadings.football} headingKey="football" onHeadingChange={setHeading} badges={<Badge type="paragraph" hint="Free-form paragraph" />}>
        <p className="mb-2 text-[10px] text-muted-foreground italic">Write as a paragraph or short description</p>
        <textarea className={textareaClass} rows={2} value={data.football} onChange={e => set('football', e.target.value)} />
      </Section>

      {/* Achievements */}
      <Section title={data.sectionHeadings.achievements} headingKey="achievements" onHeadingChange={setHeading} badges={<Badge type="bullet" hint="Each line starting with • becomes a bullet point" />}>
        <p className="mb-2 text-[10px] text-muted-foreground italic">Start each line with • for bullet points</p>
        <textarea className={textareaClass} rows={3} value={data.achievements} onChange={e => set('achievements', e.target.value)} placeholder="• Won Best Campaign Award 2024&#10;• Increased engagement by 200%" />
      </Section>

      {/* Portfolio */}
      <Section title={data.sectionHeadings.portfolio} headingKey="portfolio" onHeadingChange={setHeading} badges={<><Badge type="bullet" hint="Bullet list format" /> <Badge type="hyperlink" hint="URLs become clickable hyperlinks in the CV" /></>}>
        <p className="mb-2 text-[10px] text-muted-foreground italic">Each line becomes a bullet. Include URLs — they'll be rendered as clickable hyperlinks.</p>
        <textarea className={textareaClass} rows={3} value={data.portfolioContent} onChange={e => set('portfolioContent', e.target.value)} placeholder="• Design Work: https://behance.net/yourname&#10;• Writing Samples: Available upon request" />
      </Section>

      {/* Personal Attributes */}
      <Section title={data.sectionHeadings.personalAttributes} headingKey="personalAttributes" onHeadingChange={setHeading} badges={<Badge type="paragraph" hint="Continuous paragraph" />}>
        <p className="mb-2 text-[10px] text-muted-foreground italic">Write as a continuous paragraph describing your attributes</p>
        <textarea className={textareaClass} rows={2} value={data.personalAttributes} onChange={e => set('personalAttributes', e.target.value)} />
      </Section>

      {/* Languages */}
      <Section title={data.sectionHeadings.languages} headingKey="languages" onHeadingChange={setHeading} badges={<Badge type="text" hint="Comma-separated with proficiency levels" />}>
        <p className="mb-2 text-[10px] text-muted-foreground italic">Comma-separated, e.g. English (Native), French (Conversational)</p>
        <input className={inputClass} value={data.languages} onChange={e => set('languages', e.target.value)} placeholder="English (Native), French (Conversational)" />
      </Section>

      {/* References */}
      <Section title={data.sectionHeadings.references} headingKey="references" onHeadingChange={setHeading} badges={<Badge type="references" hint="Separate each reference with a blank line" />}>
        <p className="mb-2 text-[10px] text-muted-foreground italic">Each reference: Name on first line, then title, phone, email. Separate references with a blank line.</p>
        <textarea className={textareaClass} rows={4} value={data.references} onChange={e => set('references', e.target.value)} placeholder={"John Smith\nDirector, Acme Corp\nPhone: +44 7700 900456\nEmail: j.smith@acme.com\n\nJane Doe\nProfessor, University of London\nPhone: +44 7700 900789\nEmail: j.doe@uol.ac.uk"} />
      </Section>

      {/* Custom Sections */}
      {data.customSections.map((section, idx) => (
        <div key={idx} className="rounded-lg border border-border bg-card p-4">
          <div className="mb-1 flex items-center gap-2">
            <GripVertical size={14} className="text-muted-foreground" />
            <input
              className="flex-1 border-b border-transparent bg-transparent text-sm font-semibold text-primary focus:border-primary focus:outline-none transition-colors"
              value={section.heading}
              onChange={e => updateCustomSection(idx, 'heading', e.target.value)}
              placeholder="Section Heading"
            />
            <Badge type="paragraph" hint="Free-form content" />
            <button onClick={() => removeCustomSection(idx)} className="rounded-md bg-destructive/20 px-2 py-0.5 text-destructive hover:bg-destructive/30 transition-colors">
              <X size={12} />
            </button>
          </div>
          <p className="mb-2 text-[10px] text-muted-foreground italic ml-6">Custom section — rendered as a paragraph in the CV</p>
          <textarea
            className={textareaClass}
            rows={3}
            value={section.content}
            onChange={e => updateCustomSection(idx, 'content', e.target.value)}
            placeholder="Section content..."
          />
        </div>
      ))}

      {/* Add Custom Section Button */}
      <button
        onClick={addCustomSection}
        className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border py-3 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors"
      >
        <Plus size={16} /> Add Custom Section
      </button>
    </div>
  );
};

const Section = ({
  title,
  headingKey,
  onHeadingChange,
  badges,
  children,
}: {
  title: string;
  headingKey: HeadingKey;
  onHeadingChange: (key: HeadingKey, value: string) => void;
  badges?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="rounded-lg border border-border bg-card p-4">
    <div className="mb-3 flex items-center gap-2 flex-wrap">
      <input
        className="flex-1 min-w-[120px] border-b border-transparent bg-transparent text-sm font-semibold text-primary focus:border-primary focus:outline-none transition-colors"
        value={title}
        onChange={e => onHeadingChange(headingKey, e.target.value)}
      />
      {badges && <div className="flex items-center gap-1 flex-wrap">{badges}</div>}
    </div>
    {children}
  </div>
);

export default CVForm;
