import { TemplateName } from '@/lib/cv-types';

interface TemplateSelectorProps {
  selected: TemplateName;
  onSelect: (template: TemplateName) => void;
}

const templateOptions: { id: TemplateName; name: string; desc: string }[] = [
  { id: 'classic', name: 'Classic Minimal', desc: 'Clean & Professional' },
  { id: 'modern', name: 'Modern Two Column', desc: 'Contemporary Layout' },
  { id: 'detailed', name: 'Detailed Modern', desc: 'Comprehensive' },
  { id: 'executive1', name: 'Executive Pro V1', desc: 'Blue Header Style' },
  { id: 'executive2', name: 'Executive Pro V2', desc: 'Grayscale Professional' },
];

const TemplateSelector = ({ selected, onSelect }: TemplateSelectorProps) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {templateOptions.map(t => (
        <button
          key={t.id}
          onClick={() => onSelect(t.id)}
          className={`rounded-lg border-2 p-3 text-left transition-all ${
            selected === t.id
              ? 'border-primary bg-primary/10'
              : 'border-border bg-card hover:border-primary/50'
          }`}
        >
          <p className="text-sm font-semibold text-foreground">{t.name}</p>
          <p className="text-xs text-muted-foreground">{t.desc}</p>
        </button>
      ))}
    </div>
  );
};

export default TemplateSelector;
