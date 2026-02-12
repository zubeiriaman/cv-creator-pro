import { CVFormData, FieldType, LinkEntry } from '../cv-types';

export function escapeLatex(str: string): string {
  return str
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/#/g, '\\#')
    .replace(/_/g, '\\_')
    .replace(/\$/g, '\\$')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');
}

export function bulletItems(text: string): string {
  return text
    .split('\n')
    .map(a => a.trim())
    .filter(Boolean)
    .map(a => `  \\item ${escapeLatex(a.replace(/^•\s*/, ''))}`)
    .join('\n');
}

export function isHidden(data: CVFormData, key: string): boolean {
  return (data.hiddenSections || []).includes(key);
}

export function renderSectionContent(
  data: CVFormData,
  sectionKey: string,
  content: string,
  defaultTypes: FieldType[] = ['paragraph']
): string {
  const types = data.sectionFieldTypes?.[sectionKey] || defaultTypes;
  const links = data.sectionLinks?.[sectionKey] || [];
  const e = escapeLatex;
  const parts: string[] = [];

  if (content.trim()) {
    if (types.includes('bullet')) {
      parts.push(`\\begin{itemize}\n${bulletItems(content)}\n\\end{itemize}`);
    } else {
      parts.push(e(content));
    }
  }

  if (types.includes('hyperlink') && links.length > 0) {
    const linkItems = links
      .filter(l => l.label.trim() && l.url.trim())
      .map(l => `  \\item \\href{${l.url}}{${e(l.label)}}`)
      .join('\n');
    if (linkItems) {
      parts.push(`\\begin{itemize}\n${linkItems}\n\\end{itemize}`);
    }
  }

  return parts.join('\n');
}

export function renderCustomSections(data: CVFormData, sectionCmd: string = '\\section*'): string {
  if (!data.customSections || data.customSections.length === 0) return '';
  const e = escapeLatex;
  return data.customSections
    .filter(s => s.heading.trim() && (s.content.trim() || (s.links && s.links.length > 0)))
    .map(s => {
      const types = s.fieldTypes || ['paragraph'];
      const links = s.links || [];
      const parts: string[] = [];

      if (s.content.trim()) {
        if (types.includes('bullet')) {
          parts.push(`\\begin{itemize}\n${bulletItems(s.content)}\n\\end{itemize}`);
        } else {
          parts.push(e(s.content));
        }
      }

      if (types.includes('hyperlink') && links.length > 0) {
        const linkItems = links
          .filter(l => l.label.trim() && l.url.trim())
          .map(l => `  \\item \\href{${l.url}}{${e(l.label)}}`)
          .join('\n');
        if (linkItems) parts.push(`\\begin{itemize}\n${linkItems}\n\\end{itemize}`);
      }

      return `${sectionCmd}{${e(s.heading)}}\n${parts.join('\n')}`;
    })
    .join('\n\n');
}

export function renderReferences(data: CVFormData): string {
  if (!data.references || !data.references.trim()) return '';
  const e = escapeLatex;
  const refs = data.references.split(/\n\s*\n/).filter(Boolean);
  if (refs.length === 0) return '';

  const formatRef = (ref: string) => {
    const lines = ref.split('\n').map(l => l.trim()).filter(Boolean);
    return lines.map((line, i) => {
      if (i === 0) return `\\textbf{${e(line)}}`;
      if (line.toLowerCase().startsWith('phone:')) return `\\faPhone\\ ${e(line.replace(/^phone:\s*/i, ''))}`;
      if (line.toLowerCase().startsWith('email:')) return `\\faEnvelope\\ \\href{mailto:${line.replace(/^email:\s*/i, '')}}{${e(line.replace(/^email:\s*/i, ''))}}`;
      return e(line);
    }).join('\\\\\n');
  };

  if (refs.length >= 2) {
    return `\\begin{minipage}[t]{0.48\\textwidth}
\\small
${formatRef(refs[0])}
\\end{minipage}
\\hfill
\\begin{minipage}[t]{0.48\\textwidth}
\\small
${formatRef(refs[1])}
\\end{minipage}`;
  }

  return formatRef(refs[0]);
}
