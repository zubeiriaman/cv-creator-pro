import { CVFormData, TemplateName } from './cv-types';

function escapeLatex(str: string): string {
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

function safeParts(entry: string): [string, string, string] {
  const parts = entry.split('|').map(s => s.trim());
  return [parts[0] || 'Position', parts[1] || 'Organization', parts[2] || 'Date'];
}

function bulletItems(text: string): string {
  return text
    .split('\n')
    .map(a => a.trim())
    .filter(Boolean)
    .map(a => `  \\item ${escapeLatex(a.replace(/^•\s*/, ''))}`)
    .join('\n');
}

const templates: Record<TemplateName, (data: CVFormData) => string> = {

  // ═══════════════════════════════════════════════
  // CLASSIC — Clean single-column, blue accents, comprehensive sections
  // ═══════════════════════════════════════════════
  classic: (data) => {
    const expBlocks = data.experience.map(exp => {
      const [pos, comp, date] = safeParts(exp);
      return `\\textbf{${escapeLatex(pos)}} \\hfill ${escapeLatex(date)}\\\\
\\textit{${escapeLatex(comp)}}
\\begin{itemize}[noitemsep, leftmargin=1.5em]
${data.experienceDetails.map(d => `  \\item ${escapeLatex(d.replace(/^•\s*/, ''))}`).join('\n')}
\\end{itemize}`;
    }).join('\n\\vspace{6pt}\n');

    const eduBlocks = data.education.map(edu => {
      const [deg, inst, yr] = safeParts(edu);
      return `\\textbf{${escapeLatex(deg)}} \\hfill ${escapeLatex(yr)}\\\\
${escapeLatex(inst)}`;
    }).join('\n\\vspace{4pt}\n');

    return `\\documentclass[10pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=0.6in]{geometry}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{titlesec}
\\usepackage{xcolor}
\\usepackage{multicol}

\\definecolor{bffblue}{RGB}{0,102,204}
\\definecolor{darkblue}{RGB}{0,51,102}

\\hypersetup{colorlinks=true, linkcolor=darkblue, urlcolor=bffblue}
\\pagestyle{empty}
\\setlength{\\parindent}{0pt}

\\titleformat{\\section}{\\normalsize\\bfseries\\color{bffblue}}{}{0em}{}[\\titlerule]
\\titlespacing{\\section}{0pt}{10pt}{5pt}

\\begin{document}

\\begin{center}
{\\Large \\textbf{${escapeLatex(data.name)}}}\\\\[4pt]
{\\large \\textbf{${escapeLatex(data.title)} --- Communications \\& Sports Media Professional}}\\\\[6pt]
{\\small ${escapeLatex(data.phone)} \\quad \\href{mailto:${data.email}}{${escapeLatex(data.email)}} \\quad ${escapeLatex(data.location)}}\\\\[2pt]
{\\small \\href{https://${data.portfolio}}{${escapeLatex(data.portfolio)}}}
\\end{center}

\\section*{Professional Summary}
${escapeLatex(data.summary)}

\\section*{Football Background \\& Engagement}
${escapeLatex(data.football)}

\\begin{itemize}[noitemsep, leftmargin=1.5em]
${bulletItems(data.achievements)}
\\end{itemize}

\\section*{Core Competencies}
\\begin{multicols}{2}
\\small
\\textbf{Content \\& Journalism}
\\begin{itemize}[noitemsep, leftmargin=1.5em]
${data.skills.split(',').slice(0, 3).map(s => `  \\item ${escapeLatex(s.trim())}`).join('\n')}
\\end{itemize}

\\columnbreak

\\textbf{Media \\& Digital Management}
\\begin{itemize}[noitemsep, leftmargin=1.5em]
${data.skills.split(',').slice(3).map(s => `  \\item ${escapeLatex(s.trim())}`).join('\n')}
\\end{itemize}
\\end{multicols}

\\section*{Professional Experience}
${expBlocks}

\\section*{Education}
${eduBlocks}

\\end{document}`;
  },

  // ═══════════════════════════════════════════════
  // MODERN TWO-COLUMN — Name at top, two-column body
  // ═══════════════════════════════════════════════
  modern: (data) => {
    const expBlocks = data.experience.map(exp => {
      const [pos, comp, date] = safeParts(exp);
      return `\\textbf{${escapeLatex(pos)}} \\\\
\\textit{${escapeLatex(date)}} \\\\
\\textcolor{primaryblue}{\\textbf{${escapeLatex(comp)}}}
\\begin{itemize}[noitemsep, leftmargin=1.5em]
${data.experienceDetails.map(d => `  \\item ${escapeLatex(d.replace(/^•\s*/, ''))}`).join('\n')}
\\end{itemize}`;
    }).join('\n\\vspace{6pt}\n');

    const eduBlocks = data.education.map(edu => {
      const [deg, inst, yr] = safeParts(edu);
      return `\\textbf{${escapeLatex(deg)}} \\\\
\\textit{${escapeLatex(yr)}} \\\\
${escapeLatex(inst)}`;
    }).join('\n\\vspace{6pt}\n');

    return `\\documentclass[10pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=0.7in]{geometry}
\\usepackage{xcolor}
\\usepackage{enumitem}
\\usepackage{titlesec}
\\usepackage{multicol}
\\usepackage{hyperref}

\\definecolor{primaryblue}{RGB}{0,102,204}
\\definecolor{darkblue}{RGB}{0,51,102}

\\pagestyle{empty}
\\setlength{\\parindent}{0pt}
\\hypersetup{colorlinks=true, linkcolor=darkblue, urlcolor=primaryblue}

\\titleformat{\\section}{\\large\\bfseries\\color{primaryblue}}{}{0pt}{\\MakeUppercase}[\\titlerule]
\\titlespacing{\\section}{0pt}{10pt}{5pt}

\\begin{document}

\\begin{center}
{\\Huge \\textbf{${escapeLatex(data.name.toUpperCase())}}}\\\\[4pt]
{\\large ${escapeLatex(data.title)} | Communications \\& Sports Media Professional}\\\\[6pt]
{\\small ${escapeLatex(data.phone)} \\quad \\href{mailto:${data.email}}{${escapeLatex(data.email)}} \\\\
${escapeLatex(data.location)} \\quad \\href{https://${data.portfolio}}{${escapeLatex(data.portfolio)}}}
\\end{center}

\\vspace{0.3cm}

\\begin{multicols}{2}

\\section{Summary}
${escapeLatex(data.summary)}

\\section{Key Achievements}
\\begin{itemize}[noitemsep, leftmargin=1.5em]
${bulletItems(data.achievements)}
\\end{itemize}

\\section{Experience}
${expBlocks}

\\columnbreak

\\section{Core Skills}
\\begin{itemize}[noitemsep, leftmargin=1.5em]
${data.skills.split(',').map(s => `  \\item ${escapeLatex(s.trim())}`).join('\n')}
\\end{itemize}

\\section{Education}
${eduBlocks}

\\section{Football Background}
${escapeLatex(data.football)}

\\section{Languages}
\\begin{itemize}[noitemsep, leftmargin=1.5em]
  \\item English: Professional/Fluent
  \\item Bangla: Native
\\end{itemize}

\\end{multicols}

\\end{document}`;
  },

  // ═══════════════════════════════════════════════
  // DETAILED MODERN — Two-column, gray header, comprehensive
  // ═══════════════════════════════════════════════
  detailed: (data) => {
    const expBlocks = data.experience.map(exp => {
      const [pos, comp, date] = safeParts(exp);
      return `\\textbf{${escapeLatex(comp)}}\\\\
\\textit{${escapeLatex(pos)}} \\hfill ${escapeLatex(date)}
\\begin{itemize}[noitemsep, leftmargin=1.5em]
${data.experienceDetails.map(d => `  \\item ${escapeLatex(d.replace(/^•\s*/, ''))}`).join('\n')}
\\end{itemize}`;
    }).join('\n\\vspace{6pt}\n');

    const eduBlocks = data.education.map(edu => {
      const [deg, inst, yr] = safeParts(edu);
      return `\\textbf{${escapeLatex(deg)}} \\hfill ${escapeLatex(yr)}\\\\
${escapeLatex(inst)}`;
    }).join('\n\\vspace{4pt}\n');

    return `\\documentclass[10pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=0.6in]{geometry}
\\usepackage{xcolor}
\\usepackage{enumitem}
\\usepackage{titlesec}
\\usepackage{multicol}
\\usepackage{hyperref}

\\definecolor{headercolor}{RGB}{69,90,100}
\\definecolor{accentblue}{RGB}{0,102,204}

\\pagestyle{empty}
\\setlength{\\parindent}{0pt}
\\hypersetup{colorlinks=true, linkcolor=headercolor, urlcolor=accentblue}

\\titleformat{\\section}{\\small\\bfseries\\color{headercolor}\\MakeUppercase}{}{0pt}{}[\\vspace{-2pt}\\textcolor{headercolor}{\\rule{\\linewidth}{0.6pt}}]
\\titlespacing{\\section}{0pt}{8pt}{4pt}

\\begin{document}

\\begin{center}
{\\LARGE \\textbf{${escapeLatex(data.name.toUpperCase())}}}\\\\[4pt]
{\\Large \\textbf{\\textcolor{headercolor}{${escapeLatex(data.title.toUpperCase())}}}}\\\\[2pt]
{\\normalsize Communications \\& Sports Media Professional}
\\end{center}

\\vspace{0.3cm}

\\begin{multicols}{2}

\\section{Contact}
\\textbf{Phone:} ${escapeLatex(data.phone)} \\\\
\\textbf{Email:} \\href{mailto:${data.email}}{${escapeLatex(data.email)}} \\\\
\\textbf{Portfolio:} \\href{https://${data.portfolio}}{${escapeLatex(data.portfolio)}} \\\\
\\textbf{Location:} ${escapeLatex(data.location)}

\\section{Professional Summary}
${escapeLatex(data.summary)}

\\section{Education}
${eduBlocks}

\\section{Core Competencies}
\\begin{itemize}[noitemsep, leftmargin=1.5em]
${data.skills.split(',').map(s => `  \\item ${escapeLatex(s.trim())}`).join('\n')}
\\end{itemize}

\\columnbreak

\\section{Professional Experience}
${expBlocks}

\\section{Key Achievements}
\\begin{itemize}[noitemsep, leftmargin=1.5em]
${bulletItems(data.achievements)}
\\end{itemize}

\\section{Football Background}
${escapeLatex(data.football)}

\\section{Languages}
English: Fluent \\quad | \\quad Bangla: Native

\\end{multicols}

\\end{document}`;
  },

  // ═══════════════════════════════════════════════
  // EXECUTIVE PRO V1 — Chelsea Blue header, 3-column skills, comprehensive
  // ═══════════════════════════════════════════════
  executive1: (data) => {
    const expBlocks = data.experience.map(exp => {
      const [pos, comp, date] = safeParts(exp);
      return `\\textbf{${escapeLatex(pos)}} \\hfill \\small ${escapeLatex(date)}\\\\
\\textit{${escapeLatex(comp)}}
\\begin{itemize}[noitemsep, leftmargin=1.5em]
${data.experienceDetails.map(d => `  \\item ${escapeLatex(d.replace(/^•\s*/, ''))}`).join('\n')}
\\end{itemize}
\\vspace{4pt}`;
    }).join('\n');

    const eduBlocks = data.education.map(edu => {
      const [deg, inst, yr] = safeParts(edu);
      return `\\textbf{${escapeLatex(deg)}} \\hfill ${escapeLatex(yr)}\\\\
${escapeLatex(inst)}`;
    }).join('\n\\vspace{4pt}\n');

    return `\\documentclass[10pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=0.65in]{geometry}
\\usepackage{xcolor}
\\usepackage{hyperref}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{multicol}

\\definecolor{chelseablue}{RGB}{0,51,160}
\\definecolor{chelseabluelight}{RGB}{0,102,204}
\\definecolor{darkgray}{RGB}{50,50,50}

\\hypersetup{colorlinks=true, urlcolor=chelseabluelight, linkcolor=chelseabluelight}
\\pagestyle{empty}
\\setlength{\\parindent}{0pt}

\\titleformat{\\section}{\\large\\bfseries\\color{chelseablue}\\MakeUppercase}{}{0em}{}[\\vspace{2pt}\\color{chelseablue}\\rule{\\linewidth}{1.4pt}]
\\titlespacing{\\section}{0pt}{10pt}{5pt}

\\begin{document}

\\begin{center}
{\\Huge\\bfseries ${escapeLatex(data.name.toUpperCase())}}\\\\[4pt]
{\\LARGE\\bfseries\\textcolor{chelseablue}{${escapeLatex(data.title.toUpperCase())}}}\\\\[4pt]
{\\normalsize Communications \\& Sports Media Professional}\\\\[8pt]
{\\small ${escapeLatex(data.phone)} \\quad \\href{mailto:${data.email}}{${escapeLatex(data.email)}} \\quad ${escapeLatex(data.location)}}\\\\[2pt]
{\\small \\href{https://${data.portfolio}}{${escapeLatex(data.portfolio)}}}
\\end{center}

\\section{Professional Summary}
${escapeLatex(data.summary)}

\\section{Key Strengths \\& Skills}
\\begin{multicols}{3}
\\small
\\textbf{Content \\& Journalism}
\\begin{itemize}[noitemsep, leftmargin=1em]
  \\item Sports Writing \\& Analysis
  \\item Press Releases \\& Articles
  \\item Editing \\& Proofreading
  \\item Digital Journalism
\\end{itemize}

\\columnbreak

\\textbf{Media \\& Digital}
\\begin{itemize}[noitemsep, leftmargin=1em]
  \\item Social Media Strategy
  \\item Sports Event Organisation
  \\item Media Coordination
  \\item Brand Communications
  \\item Community Building
\\end{itemize}

\\columnbreak

\\textbf{Professional}
\\begin{itemize}[noitemsep, leftmargin=1em]
  \\item Stakeholder Management
  \\item Event Organisation
  \\item English (Fluent)
  \\item Bangla (Native)
\\end{itemize}
\\end{multicols}

\\section{Professional Experience}
${expBlocks}

\\section{Football Background \\& Community Leadership}
${escapeLatex(data.football)}

\\begin{itemize}[noitemsep, leftmargin=1.5em]
${bulletItems(data.achievements)}
\\end{itemize}

\\section{Education}
${eduBlocks}

\\end{document}`;
  },

  // ═══════════════════════════════════════════════
  // EXECUTIVE PRO V2 — Grayscale, compact, professional
  // ═══════════════════════════════════════════════
  executive2: (data) => {
    const expBlocks = data.experience.map(exp => {
      const [pos, comp, date] = safeParts(exp);
      return `\\textbf{\\small ${escapeLatex(comp)}} \\hfill {\\scriptsize\\color{headergray} \\textbf{${escapeLatex(date)}}}\\\\
\\textit{\\small ${escapeLatex(pos)}}
\\begin{itemize}[noitemsep, leftmargin=1.5em]
${data.experienceDetails.map(d => `  \\item {\\small ${escapeLatex(d.replace(/^•\s*/, ''))}}`).join('\n')}
\\end{itemize}`;
    }).join('\n\\vspace{6pt}\n');

    const eduBlocks = data.education.map(edu => {
      const [deg, inst, yr] = safeParts(edu);
      return `\\textbf{\\small ${escapeLatex(deg)}} \\hfill {\\tiny\\color{headergray} \\textbf{${escapeLatex(yr)}}}\\\\
{\\footnotesize ${escapeLatex(inst)}}`;
    }).join('\n\\vspace{4pt}\n');

    return `\\documentclass[10pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=0.5in]{geometry}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{titlesec}
\\usepackage{xcolor}
\\usepackage{multicol}

\\definecolor{headergray}{RGB}{128,128,128}
\\definecolor{darkgray}{RGB}{60,60,60}

\\hypersetup{colorlinks=true, linkcolor=darkgray, urlcolor=darkgray}
\\pagestyle{empty}
\\setlength{\\parindent}{0pt}

\\titleformat{\\section}{\\small\\bfseries\\color{darkgray}\\uppercase}{}{0em}{}[\\vspace{-0.5em}\\textcolor{lightgray}{\\rule{\\linewidth}{0.4pt}}]
\\titlespacing{\\section}{0pt}{8pt}{4pt}

\\setlist[itemize]{nosep, leftmargin=1em}

\\begin{document}

{\\LARGE\\bfseries\\color{darkgray} ${escapeLatex(data.name.toUpperCase())}}\\\\[3pt]
{\\normalsize\\color{headergray} ${escapeLatex(data.title)} --- Communications \\& Sports Media Professional}\\\\[3pt]
{\\small\\color{headergray} 
${escapeLatex(data.phone)} \\quad 
\\href{mailto:${data.email}}{${escapeLatex(data.email)}} \\quad
\\href{https://${data.portfolio}}{${escapeLatex(data.portfolio)}} \\quad
${escapeLatex(data.location)}}

\\vspace{6pt}

\\section{Summary}
${escapeLatex(data.summary)}

\\section{Football Background \\& Engagement}
${escapeLatex(data.football)}

\\begin{itemize}[noitemsep]
${bulletItems(data.achievements)}
\\end{itemize}

\\section{Core Competencies}
\\begin{multicols}{2}
\\small
\\textbf{Content \\& Journalism}
\\begin{itemize}[noitemsep]
${data.skills.split(',').slice(0, 3).map(s => `  \\item ${escapeLatex(s.trim())}`).join('\n')}
\\end{itemize}

\\columnbreak

\\textbf{Media \\& Digital Management}
\\begin{itemize}[noitemsep]
${data.skills.split(',').slice(3).map(s => `  \\item ${escapeLatex(s.trim())}`).join('\n')}
\\end{itemize}
\\end{multicols}

\\section{Experience}
${expBlocks}

\\begin{multicols}{2}
\\section{Education}
${eduBlocks}

\\columnbreak

\\section{Languages}
English: Professional/Fluent \\\\
Bangla: Native
\\end{multicols}

\\end{document}`;
  },
};

export function generateLatex(template: TemplateName, data: CVFormData): string {
  return templates[template](data);
}
