import { CVFormData } from '@/lib/cv-types';
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

const CVForm = ({ data, onChange }: CVFormProps) => {
  const set = <K extends keyof CVFormData>(key: K, value: CVFormData[K]) =>
    onChange({ ...data, [key]: value });

  const addListItem = (key: 'experience' | 'education') => {
    set(key, [...data[key], '']);
  };

  const updateListItem = (key: 'experience' | 'education', idx: number, val: string) => {
    const arr = [...data[key]];
    arr[idx] = val;
    set(key, arr);
  };

  const removeListItem = (key: 'experience' | 'education', idx: number) => {
    set(key, data[key].filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-4">
      <Section title="👤 Personal Information">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Full Name *">
            <input className={inputClass} value={data.name} onChange={e => set('name', e.target.value)} />
          </Field>
          <Field label="Job Title *">
            <input className={inputClass} value={data.title} onChange={e => set('title', e.target.value)} />
          </Field>
        </div>
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

      <Section title="📝 Professional Summary">
        <textarea className={textareaClass} rows={3} value={data.summary} onChange={e => set('summary', e.target.value)} />
      </Section>

      <Section title="💼 Experience">
        <DynamicList
          items={data.experience}
          placeholder="Job Title | Company | Date Range"
          onUpdate={(idx, val) => updateListItem('experience', idx, val)}
          onRemove={(idx) => removeListItem('experience', idx)}
          onAdd={() => addListItem('experience')}
        />
        <Field label="Experience Details (bullet points)">
          <textarea
            className={textareaClass}
            rows={4}
            value={data.experienceDetails.join('\n')}
            onChange={e => set('experienceDetails', e.target.value.split('\n'))}
          />
        </Field>
      </Section>

      <Section title="🎓 Education">
        <DynamicList
          items={data.education}
          placeholder="Degree | Institution | Year"
          onUpdate={(idx, val) => updateListItem('education', idx, val)}
          onRemove={(idx) => removeListItem('education', idx)}
          onAdd={() => addListItem('education')}
        />
      </Section>

      <Section title="⚽ Football / Sports">
        <textarea className={textareaClass} rows={2} value={data.football} onChange={e => set('football', e.target.value)} />
      </Section>

      <Section title="⭐ Achievements">
        <textarea className={textareaClass} rows={3} value={data.achievements} onChange={e => set('achievements', e.target.value)} />
      </Section>

      <Section title="🛠️ Skills (comma separated)">
        <textarea className={textareaClass} rows={2} value={data.skills} onChange={e => set('skills', e.target.value)} />
      </Section>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-lg border border-border bg-card p-4">
    <h3 className="mb-3 text-sm font-semibold text-primary">{title}</h3>
    {children}
  </div>
);

const DynamicList = ({
  items,
  placeholder,
  onUpdate,
  onRemove,
  onAdd,
}: {
  items: string[];
  placeholder: string;
  onUpdate: (idx: number, val: string) => void;
  onRemove: (idx: number) => void;
  onAdd: () => void;
}) => (
  <div className="mb-3 space-y-2">
    {items.map((item, idx) => (
      <div key={idx} className="flex gap-2">
        <input
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
          value={item}
          placeholder={placeholder}
          onChange={e => onUpdate(idx, e.target.value)}
        />
        <button
          onClick={() => onRemove(idx)}
          className="flex-shrink-0 rounded-md bg-destructive/20 px-2 text-destructive hover:bg-destructive/30 transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    ))}
    <button
      onClick={onAdd}
      className="flex items-center gap-1 rounded-md bg-success/20 px-3 py-1.5 text-xs font-medium text-success hover:bg-success/30 transition-colors"
    >
      <Plus size={12} /> Add
    </button>
  </div>
);

export default CVForm;
