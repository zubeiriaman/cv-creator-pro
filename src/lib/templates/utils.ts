import { CVFormData } from '../cv-types';

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

export function renderCustomSections(data: CVFormData, sectionCmd: string = '\\section*'): string {
  if (!data.customSections || data.customSections.length === 0) return '';
  const e = escapeLatex;
  return data.customSections
    .filter(s => s.heading.trim() && s.content.trim())
    .map(s => `${sectionCmd}{${e(s.heading)}}\n${e(s.content)}`)
    .join('\n\n');
}

export function renderReferences(data: CVFormData): string {
  if (!data.references || !data.references.trim()) return '';
  const e = escapeLatex;
  // Split references by double newline
  const refs = data.references.split(/\n\s*\n/).filter(Boolean);
  if (refs.length === 0) return '';
  
  if (refs.length >= 2) {
    const formatRef = (ref: string) => {
      const lines = ref.split('\n').map(l => l.trim()).filter(Boolean);
      return lines.map((line, i) => {
        if (i === 0) return `\\textbf{${e(line)}}`;
        if (line.toLowerCase().startsWith('phone:')) return `\\faPhone\\ ${e(line.replace(/^phone:\s*/i, ''))}`;
        if (line.toLowerCase().startsWith('email:')) return `\\faEnvelope\\ \\href{mailto:${line.replace(/^email:\s*/i, '')}}{${e(line.replace(/^email:\s*/i, ''))}}`;
        return e(line);
      }).join('\\\\\n');
    };
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
  
  const lines = refs[0].split('\n').map(l => l.trim()).filter(Boolean);
  return lines.map((line, i) => {
    if (i === 0) return `\\textbf{${e(line)}}`;
    return e(line);
  }).join('\\\\\n');
}
