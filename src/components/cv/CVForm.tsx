import { CVFormData, ExperienceEntry, EducationEntry, CustomSection, FieldType, LinkEntry } from '@/lib/cv-types';
import { Plus, X, Type, List, Link, FileText, Users, EyeOff, RotateCcw } from 'lucide-react';

interface CVFormProps {
  data: CVFormData;
  onChange: (data: CVFormData) => void;
}

const inputClass = "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors";
const textareaClass = inputClass + " min-h-[60px] resize-y";
const smallInputClass = "w-full rounded-md border border-border bg-background px-2 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors";

const CONFIGURABLE_TYPES: FieldType[] = ['paragraph', 'bullet', 'hyperlink', 'text'];

const ftConfig: Record<FieldType, { label: string; icon: React.ReactNode; inactive: string; active: string }> = {
  paragraph: { label: 'Paragraph', icon: <Type size={10} />, inactive: 'bg-blue-500/10 text-blue-400', active: 'bg-blue-500/20 text-blue-600 ring-1 ring-blue-500/30' },
  bullet: { label: 'Bullet Points', icon: <List size={10} />, inactive: 'bg-green-500/10 text-green-400', active: 'bg-green-500/20 text-green-600 ring-1 ring-green-500/30' },
  hyperlink: { label: 'Hyperlinks', icon: <Link size={10} />, inactive: 'bg-purple-500/10 text-purple-400', active: 'bg-purple-500/20 text-purple-600 ring-1 ring-purple-500/30' },
  text: { label: 'Text', icon: <Type size={10} />, inactive: 'bg-muted/50 text-muted-foreground/60', active: 'bg-muted text-muted-foreground ring-1 ring-border' },
  structured: { label: 'Structured', icon: <FileText size={10} />, inactive: 'bg-orange-500/10 text-orange-400', active: 'bg-orange-500/20 text-orange-600 ring-1 ring-orange-500/30' },
  references: { label: 'References', icon: <Users size={10} />, inactive: 'bg-rose-500/10 text-rose-400', active: 'bg-rose-500/20 text-rose-600 ring-1 ring-rose-500/30' },
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="mb-3">
    <label className="mb-1 block text-xs font-medium text-muted-foreground">{label}</label>
    {children}
  </div>
);

type HeadingKey = keyof CVFormData['sectionHeadings'];

const CVForm = ({ data, onChange }: CVFormProps) => {
  const set = <K extends keyof CVFormData>(key: K, value: CVFormData[K]) =>
    onChange({ ...data, [key]: value });

  const setHeading = (key: HeadingKey, value: string) =>
    onChange({ ...data, sectionHeadings: { ...data.sectionHeadings, [key]: value } });

  const hideSection = (key: string) =>
    set('hiddenSections', [...(data.hiddenSections || []), key]);

  const restoreSection = (key: string) =>
    set('hiddenSections', (data.hiddenSections || []).filter(k => k !== key));

  const getFieldTypes = (key: string): FieldType[] =>
    data.sectionFieldTypes?.[key] || ['paragraph'];

  const toggleFieldType = (sectionKey: string, ft: FieldType) => {
    const current = getFieldTypes(sectionKey);
    const updated = current.includes(ft) ? current.filter(t => t !== ft) : [...current, ft];
    set('sectionFieldTypes', { ...data.sectionFieldTypes, [sectionKey]: updated.length ? updated : ['paragraph'] });
  };

  const getLinks = (key: string): LinkEntry[] => data.sectionLinks?.[key] || [];

  const setLinks = (key: string, links: LinkEntry[]) =>
    set('sectionLinks', { ...data.sectionLinks, [key]: links });

  const addLink = (key: string) => setLinks(key, [...getLinks(key), { label: '', url: '' }]);

  const updateLink = (key: string, idx: number, field: keyof LinkEntry, val: string) => {
    const links = [...getLinks(key)];
    links[idx] = { ...links[idx], [field]: val };
    setLinks(key, links);
  };

  const removeLink = (key: string, idx: number) =>
    setLinks(key, getLinks(key).filter((_, i) => i !== idx));

  const hidden = (key: string) => (data.hiddenSections || []).includes(key);

  // Experience
  const addExperience = () => set('experience', [...data.experience, { position: '', company: '', startDate: '', endDate: '', details: [''] }]);
  const updateExperience = (idx: number, field: keyof ExperienceEntry, val: string | string[]) => {
    const arr = [...data.experience]; arr[idx] = { ...arr[idx], [field]: val }; set('experience', arr);
  };
  const removeExperience = (idx: number) => set('experience', data.experience.filter((_, i) => i !== idx));

  // Education
  const addEducation = () => set('education', [...data.education, { degree: '', institution: '', startDate: '', endDate: '', activities: '' }]);
  const updateEducation = (idx: number, field: keyof EducationEntry, val: string) => {
    const arr = [...data.education]; arr[idx] = { ...arr[idx], [field]: val }; set('education', arr);
  };
  const removeEducation = (idx: number) => set('education', data.education.filter((_, i) => i !== idx));

  // Custom sections
  const addCustomSection = () => set('customSections', [...data.customSections, { heading: 'New Section', content: '', fieldTypes: ['paragraph'], links: [] }]);
  const updateCustomSection = (idx: number, updates: Partial<CustomSection>) => {
    const arr = [...data.customSections]; arr[idx] = { ...arr[idx], ...updates }; set('customSections', arr);
  };
  const removeCustomSection = (idx: number) => set('customSections', data.customSections.filter((_, i) => i !== idx));
  const toggleCustomFT = (idx: number, ft: FieldType) => {
    const s = data.customSections[idx];
    const current = s.fieldTypes || ['paragraph'];
    const updated = current.includes(ft) ? current.filter(t => t !== ft) : [...current, ft];
    updateCustomSection(idx, { fieldTypes: updated.length ? updated : ['paragraph'] });
  };

  const FieldTypeSelector = ({ sectionKey, types = CONFIGURABLE_TYPES }: { sectionKey: string; types?: FieldType[] }) => (
    <div className="mb-2 flex flex-wrap gap-1">
      {types.map(ft => {
        const active = getFieldTypes(sectionKey).includes(ft);
        const cfg = ftConfig[ft];
        return (
          <button key={ft} type="button" onClick={() => toggleFieldType(sectionKey, ft)}
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium transition-all cursor-pointer ${active ? cfg.active : cfg.inactive}`}>
            {cfg.icon} {cfg.label}
          </button>
        );
      })}
    </div>
  );

  const LinkEntries = ({ sectionKey }: { sectionKey: string }) => {
    if (!getFieldTypes(sectionKey).includes('hyperlink')) return null;
    const links = getLinks(sectionKey);
    return (
      <div className="mt-2 space-y-2">
        <label className="text-[10px] font-medium text-purple-600">🔗 Links</label>
        {links.map((link, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input className={smallInputClass} placeholder="Label" value={link.label} onChange={e => updateLink(sectionKey, i, 'label', e.target.value)} />
            <input className={smallInputClass} placeholder="https://..." value={link.url} onChange={e => updateLink(sectionKey, i, 'url', e.target.value)} />
            <button type="button" onClick={() => removeLink(sectionKey, i)} className="text-destructive hover:text-destructive/80"><X size={12} /></button>
          </div>
        ))}
        <button type="button" onClick={() => addLink(sectionKey)} className="flex items-center gap-1 text-[10px] font-medium text-purple-600 hover:text-purple-700">
          <Plus size={10} /> Add Link
        </button>
      </div>
    );
  };

  const CustomLinkEntries = ({ sIdx }: { sIdx: number }) => {
    const s = data.customSections[sIdx];
    if (!(s.fieldTypes || []).includes('hyperlink')) return null;
    const links = s.links || [];
    return (
      <div className="mt-2 space-y-2">
        <label className="text-[10px] font-medium text-purple-600">🔗 Links</label>
        {links.map((link, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input className={smallInputClass} placeholder="Label" value={link.label} onChange={e => {
              const newLinks = [...links]; newLinks[i] = { ...newLinks[i], label: e.target.value };
              updateCustomSection(sIdx, { links: newLinks });
            }} />
            <input className={smallInputClass} placeholder="https://..." value={link.url} onChange={e => {
              const newLinks = [...links]; newLinks[i] = { ...newLinks[i], url: e.target.value };
              updateCustomSection(sIdx, { links: newLinks });
            }} />
            <button type="button" onClick={() => updateCustomSection(sIdx, { links: links.filter((_, li) => li !== i) })} className="text-destructive hover:text-destructive/80"><X size={12} /></button>
          </div>
        ))}
        <button type="button" onClick={() => updateCustomSection(sIdx, { links: [...links, { label: '', url: '' }] })} className="flex items-center gap-1 text-[10px] font-medium text-purple-600 hover:text-purple-700">
          <Plus size={10} /> Add Link
        </button>
      </div>
    );
  };

  const SectionHeader = ({ headingKey, title, onRemove }: { headingKey: HeadingKey; title: string; onRemove?: () => void }) => (
    <div className="mb-2 flex items-center gap-2">
      <input
        className="flex-1 min-w-[120px] border-b border-transparent bg-transparent text-sm font-semibold text-primary focus:border-primary focus:outline-none transition-colors"
        value={title}
        onChange={e => setHeading(headingKey, e.target.value)}
      />
      {onRemove && (
        <button type="button" onClick={onRemove} className="rounded-md p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors" title="Remove section">
          <EyeOff size={14} />
        </button>
      )}
    </div>
  );

  const allSections: { key: string; headingKey: HeadingKey }[] = [
    { key: 'summary', headingKey: 'summary' },
    { key: 'experience', headingKey: 'experience' },
    { key: 'education', headingKey: 'education' },
    { key: 'skills', headingKey: 'skills' },
    { key: 'football', headingKey: 'football' },
    { key: 'achievements', headingKey: 'achievements' },
    { key: 'portfolio', headingKey: 'portfolio' },
    { key: 'personalAttributes', headingKey: 'personalAttributes' },
    { key: 'languages', headingKey: 'languages' },
    { key: 'references', headingKey: 'references' },
  ];

  const hiddenSections = allSections.filter(s => hidden(s.key));

  return (
    <div className="space-y-4">
      {/* Personal Info - always visible */}
      <div className="rounded-lg border border-border bg-card p-4">
        <SectionHeader headingKey="personalInfo" title={data.sectionHeadings.personalInfo} />
        <div className="mb-1 flex flex-wrap gap-1">
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${ftConfig.text.active}`}>{ftConfig.text.icon} Text</span>
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${ftConfig.hyperlink.active}`}>{ftConfig.hyperlink.icon} Hyperlinks</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Full Name *"><input className={inputClass} value={data.name} onChange={e => set('name', e.target.value)} /></Field>
          <Field label="Job Title *"><input className={inputClass} value={data.title} onChange={e => set('title', e.target.value)} /></Field>
        </div>
        <Field label="Subtitle"><input className={inputClass} value={data.subtitle} onChange={e => set('subtitle', e.target.value)} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Phone *"><input className={inputClass} value={data.phone} onChange={e => set('phone', e.target.value)} /></Field>
          <Field label="Email *"><input className={inputClass} value={data.email} onChange={e => set('email', e.target.value)} /></Field>
        </div>
        <Field label="Location *"><input className={inputClass} value={data.location} onChange={e => set('location', e.target.value)} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Portfolio URL 🔗"><input className={inputClass} value={data.portfolio} onChange={e => set('portfolio', e.target.value)} placeholder="behance.net/yourname" /></Field>
          <Field label="Social URL 🔗"><input className={inputClass} value={data.social} onChange={e => set('social', e.target.value)} placeholder="linkedin.com/in/yourname" /></Field>
        </div>
      </div>

      {/* Summary */}
      {!hidden('summary') && (
        <div className="rounded-lg border border-border bg-card p-4">
          <SectionHeader headingKey="summary" title={data.sectionHeadings.summary} onRemove={() => hideSection('summary')} />
          <FieldTypeSelector sectionKey="summary" />
          <textarea className={textareaClass} rows={3} value={data.summary} onChange={e => set('summary', e.target.value)} />
          <LinkEntries sectionKey="summary" />
        </div>
      )}

      {/* Experience */}
      {!hidden('experience') && (
        <div className="rounded-lg border border-border bg-card p-4">
          <SectionHeader headingKey="experience" title={data.sectionHeadings.experience} onRemove={() => hideSection('experience')} />
          <div className="mb-2 flex flex-wrap gap-1">
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${ftConfig.structured.active}`}>{ftConfig.structured.icon} Structured</span>
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${ftConfig.bullet.active}`}>{ftConfig.bullet.icon} Bullet Points</span>
          </div>
          {data.experience.map((exp, idx) => (
            <div key={idx} className="mb-4 rounded-md border border-border/50 bg-background/50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Experience {idx + 1}</span>
                <button type="button" onClick={() => removeExperience(idx)} className="rounded-md bg-destructive/20 px-2 py-0.5 text-destructive hover:bg-destructive/30 transition-colors"><X size={12} /></button>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <Field label="Position"><input className={inputClass} value={exp.position} placeholder="Job Title" onChange={e => updateExperience(idx, 'position', e.target.value)} /></Field>
                <Field label="Company"><input className={inputClass} value={exp.company} placeholder="Company Name" onChange={e => updateExperience(idx, 'company', e.target.value)} /></Field>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <Field label="Start Date"><input className={smallInputClass} value={exp.startDate} placeholder="Jan 2023" onChange={e => updateExperience(idx, 'startDate', e.target.value)} /></Field>
                <Field label="End Date"><input className={smallInputClass} value={exp.endDate} placeholder="Present" onChange={e => updateExperience(idx, 'endDate', e.target.value)} /></Field>
              </div>
              <Field label="Details (one per line → bullet points)">
                <textarea className={textareaClass} rows={3} value={exp.details.join('\n')} onChange={e => updateExperience(idx, 'details', e.target.value.split('\n'))} />
              </Field>
            </div>
          ))}
          <button type="button" onClick={addExperience} className="flex items-center gap-1 rounded-md bg-primary/20 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/30 transition-colors">
            <Plus size={12} /> Add Experience
          </button>
        </div>
      )}

      {/* Education */}
      {!hidden('education') && (
        <div className="rounded-lg border border-border bg-card p-4">
          <SectionHeader headingKey="education" title={data.sectionHeadings.education} onRemove={() => hideSection('education')} />
          <div className="mb-2">
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${ftConfig.structured.active}`}>{ftConfig.structured.icon} Structured</span>
          </div>
          {data.education.map((edu, idx) => (
            <div key={idx} className="mb-4 rounded-md border border-border/50 bg-background/50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Education {idx + 1}</span>
                <button type="button" onClick={() => removeEducation(idx)} className="rounded-md bg-destructive/20 px-2 py-0.5 text-destructive hover:bg-destructive/30 transition-colors"><X size={12} /></button>
              </div>
              <Field label="Degree"><input className={inputClass} value={edu.degree} placeholder="MSc Marketing" onChange={e => updateEducation(idx, 'degree', e.target.value)} /></Field>
              <Field label="Institution"><input className={inputClass} value={edu.institution} placeholder="University Name" onChange={e => updateEducation(idx, 'institution', e.target.value)} /></Field>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <Field label="Start Year"><input className={smallInputClass} value={edu.startDate} placeholder="2024" onChange={e => updateEducation(idx, 'startDate', e.target.value)} /></Field>
                <Field label="End Year"><input className={smallInputClass} value={edu.endDate} placeholder="2026" onChange={e => updateEducation(idx, 'endDate', e.target.value)} /></Field>
              </div>
              <Field label="Activities"><input className={inputClass} value={edu.activities} placeholder="Relevant courses, activities" onChange={e => updateEducation(idx, 'activities', e.target.value)} /></Field>
            </div>
          ))}
          <button type="button" onClick={addEducation} className="flex items-center gap-1 rounded-md bg-primary/20 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/30 transition-colors">
            <Plus size={12} /> Add Education
          </button>
        </div>
      )}

      {/* Skills */}
      {!hidden('skills') && (
        <div className="rounded-lg border border-border bg-card p-4">
          <SectionHeader headingKey="skills" title={data.sectionHeadings.skills} onRemove={() => hideSection('skills')} />
          <FieldTypeSelector sectionKey="skills" />
          <textarea className={textareaClass} rows={2} value={data.skills} onChange={e => set('skills', e.target.value)} placeholder="Content Strategy, Social Media, SEO..." />
          <LinkEntries sectionKey="skills" />
        </div>
      )}

      {/* Football / Sports */}
      {!hidden('football') && (
        <div className="rounded-lg border border-border bg-card p-4">
          <SectionHeader headingKey="football" title={data.sectionHeadings.football} onRemove={() => hideSection('football')} />
          <FieldTypeSelector sectionKey="football" />
          <textarea className={textareaClass} rows={2} value={data.football} onChange={e => set('football', e.target.value)} />
          <LinkEntries sectionKey="football" />
        </div>
      )}

      {/* Achievements */}
      {!hidden('achievements') && (
        <div className="rounded-lg border border-border bg-card p-4">
          <SectionHeader headingKey="achievements" title={data.sectionHeadings.achievements} onRemove={() => hideSection('achievements')} />
          <FieldTypeSelector sectionKey="achievements" />
          <p className="mb-2 text-[10px] text-muted-foreground italic">Start each line with • for bullet points</p>
          <textarea className={textareaClass} rows={3} value={data.achievements} onChange={e => set('achievements', e.target.value)} placeholder="• Won Best Campaign Award 2024&#10;• Increased engagement by 200%" />
          <LinkEntries sectionKey="achievements" />
        </div>
      )}

      {/* Portfolio */}
      {!hidden('portfolio') && (
        <div className="rounded-lg border border-border bg-card p-4">
          <SectionHeader headingKey="portfolio" title={data.sectionHeadings.portfolio} onRemove={() => hideSection('portfolio')} />
          <FieldTypeSelector sectionKey="portfolio" />
          <textarea className={textareaClass} rows={3} value={data.portfolioContent} onChange={e => set('portfolioContent', e.target.value)} placeholder="• Design Work: Available on portfolio&#10;• Writing Samples: Available upon request" />
          <LinkEntries sectionKey="portfolio" />
        </div>
      )}

      {/* Personal Attributes */}
      {!hidden('personalAttributes') && (
        <div className="rounded-lg border border-border bg-card p-4">
          <SectionHeader headingKey="personalAttributes" title={data.sectionHeadings.personalAttributes} onRemove={() => hideSection('personalAttributes')} />
          <FieldTypeSelector sectionKey="personalAttributes" />
          <textarea className={textareaClass} rows={2} value={data.personalAttributes} onChange={e => set('personalAttributes', e.target.value)} />
          <LinkEntries sectionKey="personalAttributes" />
        </div>
      )}

      {/* Languages */}
      {!hidden('languages') && (
        <div className="rounded-lg border border-border bg-card p-4">
          <SectionHeader headingKey="languages" title={data.sectionHeadings.languages} onRemove={() => hideSection('languages')} />
          <FieldTypeSelector sectionKey="languages" />
          <input className={inputClass} value={data.languages} onChange={e => set('languages', e.target.value)} placeholder="English (Native), French (Conversational)" />
          <LinkEntries sectionKey="languages" />
        </div>
      )}

      {/* References */}
      {!hidden('references') && (
        <div className="rounded-lg border border-border bg-card p-4">
          <SectionHeader headingKey="references" title={data.sectionHeadings.references} onRemove={() => hideSection('references')} />
          <div className="mb-2">
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${ftConfig.references.active}`}>{ftConfig.references.icon} References</span>
          </div>
          <p className="mb-2 text-[10px] text-muted-foreground italic">Name on first line, then title, Phone: ..., Email: .... Separate references with a blank line.</p>
          <textarea className={textareaClass} rows={4} value={data.references} onChange={e => set('references', e.target.value)} placeholder={"John Smith\nDirector, Acme Corp\nPhone: +44 7700 900456\nEmail: j.smith@acme.com\n\nJane Doe\nProfessor, University of London\nPhone: +44 7700 900789\nEmail: j.doe@uol.ac.uk"} />
        </div>
      )}

      {/* Hidden sections restore bar */}
      {hiddenSections.length > 0 && (
        <div className="rounded-lg border border-dashed border-border bg-muted/30 p-3">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Hidden Sections — click to restore</p>
          <div className="flex flex-wrap gap-2">
            {hiddenSections.map(s => (
              <button key={s.key} type="button" onClick={() => restoreSection(s.key)}
                className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/20 transition-colors">
                <RotateCcw size={10} /> {data.sectionHeadings[s.headingKey]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {data.customSections.map((section, idx) => (
        <div key={idx} className="rounded-lg border border-border bg-card p-4">
          <div className="mb-2 flex items-center gap-2">
            <input
              className="flex-1 min-w-[120px] border-b border-transparent bg-transparent text-sm font-semibold text-primary focus:border-primary focus:outline-none transition-colors"
              value={section.heading}
              onChange={e => updateCustomSection(idx, { heading: e.target.value })}
              placeholder="Section Heading"
            />
            <button type="button" onClick={() => removeCustomSection(idx)} className="rounded-md p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
              <X size={14} />
            </button>
          </div>
          <div className="mb-2 flex flex-wrap gap-1">
            {CONFIGURABLE_TYPES.map(ft => {
              const active = (section.fieldTypes || ['paragraph']).includes(ft);
              const cfg = ftConfig[ft];
              return (
                <button key={ft} type="button" onClick={() => toggleCustomFT(idx, ft)}
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium transition-all cursor-pointer ${active ? cfg.active : cfg.inactive}`}>
                  {cfg.icon} {cfg.label}
                </button>
              );
            })}
          </div>
          <textarea
            className={textareaClass}
            rows={3}
            value={section.content}
            onChange={e => updateCustomSection(idx, { content: e.target.value })}
            placeholder="Section content..."
          />
          <CustomLinkEntries sIdx={idx} />
        </div>
      ))}

      <button
        type="button"
        onClick={addCustomSection}
        className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border py-3 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors"
      >
        <Plus size={16} /> Add Custom Section
      </button>
    </div>
  );
};

export default CVForm;
