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
