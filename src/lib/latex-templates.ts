import { CVFormData, TemplateName } from './cv-types';

function escapeLatex(str: string): string {
  return str
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/#/g, '\\#')
    .replace(/_/g, '\\_');
}

function safeParts(entry: string): [string, string, string] {
  const parts = entry.split('|').map(s => s.trim());
  return [parts[0] || 'Position', parts[1] || 'Organization', parts[2] || 'Date'];
}

const templates: Record<TemplateName, (data: CVFormData) => string> = {
  classic: (data) => `\\documentclass[10pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=0.6in]{geometry}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{titlesec}
\\usepackage{xcolor}

\\definecolor{bffblue}{RGB}{0,102,204}
\\definecolor{darkblue}{RGB}{0,51,102}

\\hypersetup{colorlinks=true, linkcolor=darkblue, urlcolor=bffblue}
\\pagestyle{empty}

\\titleformat{\\section}{\\normalsize\\bfseries\\color{bffblue}}{}{0em}{}[\\titlerule]
\\titlespacing{\\section}{0pt}{8pt}{4pt}

\\begin{document}

\\begin{center}
{\\Large \\textbf{${escapeLatex(data.name)}}}\\\\[4pt]
{\\large \\textbf{${escapeLatex(data.title)}}}\\\\[4pt]
${escapeLatex(data.phone)} \\quad 
\\href{mailto:${data.email}}{${escapeLatex(data.email)}} \\quad 
${escapeLatex(data.location)}
\\end{center}

\\section*{Professional Summary}
${escapeLatex(data.summary)}

\\section*{Professional Experience}
${data.experience.map(exp => {
    const [pos, comp, date] = safeParts(exp);
    return `\\textbf{${escapeLatex(pos)}} \\hfill ${escapeLatex(date)}\\\\
\\textit{${escapeLatex(comp)}}\\\\
\\begin{itemize}[noitemsep]
${data.experienceDetails.slice(0,3).map(d => `    \\item ${escapeLatex(d.replace('•','').trim())}`).join('\n')}
\\end{itemize}\n`;
}).join('\n')}

\\section*{Education}
${data.education.map(edu => {
    const [deg, inst, yr] = safeParts(edu);
    return `\\textbf{${escapeLatex(deg)}} \\hfill ${escapeLatex(yr)}\\\\
${escapeLatex(inst)}\n`;
}).join('\\\\[4pt]\n')}

\\section*{Key Achievements}
\\begin{itemize}[noitemsep]
${data.achievements.split('\n').map(a => a.trim() ? `    \\item ${escapeLatex(a.replace('•','').trim())}` : '').filter(Boolean).join('\n')}
\\end{itemize}

\\section*{Skills}
${escapeLatex(data.skills)}

\\end{document}`,

  modern: (data) => `\\documentclass[10pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=0.8in]{geometry}
\\usepackage{xcolor}
\\usepackage{enumitem}
\\usepackage{titlesec}
\\usepackage{multicol}
\\usepackage{hyperref}

\\definecolor{primaryblue}{RGB}{0,102,204}
\\definecolor{darkblue}{RGB}{0,51,102}

\\pagestyle{empty}
\\hypersetup{colorlinks=true, linkcolor=darkblue, urlcolor=primaryblue}

\\titleformat{\\section}{\\large\\bfseries\\color{primaryblue}}{}{0pt}{\\MakeUppercase}[\\titlerule]

\\begin{document}

\\begin{center}
{\\Huge \\textbf{${escapeLatex(data.name.toUpperCase())}}} \\\\[4pt]
{\\large \\textbf{${escapeLatex(data.title)}}}
\\end{center}

\\vspace{0.2cm}

{\\small
${escapeLatex(data.phone)} \\quad 
\\href{mailto:${data.email}}{${escapeLatex(data.email)}} \\quad 
${escapeLatex(data.location)}
}

\\vspace{0.5cm}

\\begin{multicols}{2}
\\section{Summary}
${escapeLatex(data.summary)}

\\section{Experience}
${data.experience.map(exp => {
    const [pos, comp, date] = safeParts(exp);
    return `\\textbf{${escapeLatex(pos)}} \\hfill \\textit{${escapeLatex(date)}} \\\\
\\textcolor{primaryblue}{\\textbf{${escapeLatex(comp)}}}\n`;
}).join('\n\n')}

\\columnbreak

\\section{Education}
${data.education.map(edu => {
    const [deg, inst, yr] = safeParts(edu);
    return `\\textbf{${escapeLatex(deg)}} \\\\
\\textit{${escapeLatex(yr)}} \\\\
${escapeLatex(inst)}\n`;
}).join('\n\n')}

\\section{Skills}
\\begin{itemize}[noitemsep]
${data.skills.split(',').map(s => `    \\item ${escapeLatex(s.trim())}`).join('\n')}
\\end{itemize}

\\end{multicols}

\\end{document}`,

  detailed: (data) => `\\documentclass[10pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=0.65in]{geometry}
\\usepackage{xcolor}
\\usepackage{enumitem}
\\usepackage{titlesec}
\\usepackage{multicol}
\\usepackage{hyperref}

\\definecolor{headercolor}{RGB}{69,90,100}

\\pagestyle{empty}

\\titleformat{\\section}{\\small\\bfseries\\color{headercolor}\\MakeUppercase}{}{0pt}{}[\\vspace{-2pt}\\textcolor{headercolor}{\\rule{\\linewidth}{0.6pt}}]

\\begin{document}

\\begin{center}
{\\LARGE \\textbf{${escapeLatex(data.name.toUpperCase())}}}\\\\[4pt]
{\\Large \\textbf{${escapeLatex(data.title.toUpperCase())}}}
\\end{center}

\\begin{multicols}{2}

\\section{Contact}
\\textbf{Phone:} ${escapeLatex(data.phone)} \\\\
\\textbf{Email:} \\href{mailto:${data.email}}{${escapeLatex(data.email)}} \\\\
\\textbf{Location:} ${escapeLatex(data.location)}

\\section{Summary}
${escapeLatex(data.summary)}

\\section{Education}
${data.education.map(edu => {
    const [deg, inst, yr] = safeParts(edu);
    return `\\textbf{${escapeLatex(deg)}} \\\\
${escapeLatex(inst)} \\hfill ${escapeLatex(yr)}`;
}).join('\n\n')}

\\columnbreak

\\section{Experience}
${data.experience.map(exp => {
    const [pos, comp, date] = safeParts(exp);
    return `\\textbf{${escapeLatex(pos)}} \\\\
\\textit{${escapeLatex(comp)}} \\hfill ${escapeLatex(date)} \\\\[2pt]
${data.experienceDetails.slice(0,2).map(d => escapeLatex(d.replace('•','').trim())).join('; ')}`;
}).join('\n\n')}

\\end{multicols}

\\section{Achievements}
${escapeLatex(data.achievements)}

\\end{document}`,

  executive1: (data) => `\\documentclass[10pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=0.7in]{geometry}
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

\\begin{document}

\\begin{center}
{\\Huge\\bfseries ${escapeLatex(data.name.toUpperCase())}}\\\\[4pt]
{\\LARGE\\bfseries\\textcolor{chelseablue}{${escapeLatex(data.title.toUpperCase())}}}\\\\[4pt]
{\\normalsize Communications \\& Sports Media Professional}
\\end{center}

\\vspace{8pt}

{\\small
${escapeLatex(data.phone)} \\quad
\\href{mailto:${data.email}}{${escapeLatex(data.email)}} \\quad
${escapeLatex(data.location)}
}

\\section{Professional Summary}
${escapeLatex(data.summary)}

\\section{Key Strengths}
\\begin{multicols}{3}
\\small
\\textbf{Core Skills}
\\begin{itemize}[noitemsep]
\\item Strategic Communications
\\item Content Creation
\\item Media Management
\\end{itemize}

\\columnbreak

\\textbf{Digital}
\\begin{itemize}[noitemsep]
\\item Social Media Strategy
\\item Community Building
\\item Brand Communications
\\end{itemize}

\\columnbreak

\\textbf{Professional}
\\begin{itemize}[noitemsep]
\\item Stakeholder Management
\\item Event Organization
\\item English/Bangla
\\end{itemize}
\\end{multicols}

\\section{Professional Experience}
${data.experience.map(exp => {
    const [pos, comp, date] = safeParts(exp);
    return `\\textbf{${escapeLatex(pos)}} \\hfill \\small ${escapeLatex(date)}\\\\
\\textit{${escapeLatex(comp)}}
\\begin{itemize}[noitemsep]
${data.experienceDetails.slice(0,3).map(d => `  \\item ${escapeLatex(d.replace('•','').trim())}`).join('\n')}
\\end{itemize}

\\vspace{4pt}`;
}).join('')}

\\section{Education}
${data.education.map(edu => {
    const [deg, inst, yr] = safeParts(edu);
    return `\\textbf{${escapeLatex(deg)}} \\hfill ${escapeLatex(yr)}\\\\
${escapeLatex(inst)}`;
}).join('\n\n')}

\\end{document}`,

  executive2: (data) => `\\documentclass[10pt,a4paper]{article}
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

\\titleformat{\\section}{\\small\\bfseries\\color{darkgray}\\uppercase}{}{0em}{}[\\vspace{-0.5em}\\textcolor{lightgray}{\\rule{\\linewidth}{0.4pt}}]

\\setlist[itemize]{nosep, leftmargin=1em}

\\begin{document}

\\noindent
{\\LARGE\\bfseries\\color{darkgray} ${escapeLatex(data.name.toUpperCase())}}\\\\[2pt]
{\\normalsize\\color{headergray} ${escapeLatex(data.title)} --- Communications \\& Sports Media Professional}\\\\[2pt]
{\\small\\color{headergray} 
${escapeLatex(data.phone)} \\quad 
\\href{mailto:${data.email}}{${escapeLatex(data.email)}} \\quad 
${escapeLatex(data.location)}}

\\vspace{4pt}

\\section{Summary}
${escapeLatex(data.summary)}

\\section{Experience}
${data.experience.map(exp => {
    const [pos, comp, date] = safeParts(exp);
    return `\\textbf{\\small ${escapeLatex(comp)}} \\hfill {\\scriptsize\\color{headergray} \\textbf{${escapeLatex(date)}}}\\\\
\\textit{\\small ${escapeLatex(pos)}}\\\\[2pt]
${data.experienceDetails.slice(0,4).map(d => escapeLatex(d.replace('•','').trim())).join('; ')}`;
}).join('\n\n')}

\\begin{multicols}{2}
\\section{Education}
${data.education.map(edu => {
    const [deg, inst, yr] = safeParts(edu);
    return `\\textbf{\\small ${escapeLatex(deg)}} \\hfill {\\tiny\\color{headergray} \\textbf{${escapeLatex(yr)}}}\\\\
{\\footnotesize ${escapeLatex(inst)}}`;
}).join('\n\n')}

\\section{Achievements}
${data.achievements.split('\n').slice(0,4).map(a => a.trim() ? `\\textbullet\\ ${escapeLatex(a.replace('•','').trim())}` : '').filter(Boolean).join('\n\n')}
\\end{multicols}

\\end{document}`
};

export function generateLatex(template: TemplateName, data: CVFormData): string {
  return templates[template](data);
}
