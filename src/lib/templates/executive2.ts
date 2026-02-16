import { CVFormData } from '../cv-types';
import { escapeLatex, isHidden, renderSectionContent, renderCustomSections, renderReferences, bulletItems } from './utils';

export function executive2Template(data: CVFormData): string {
  const e = escapeLatex;
  const h = (k: string) => isHidden(data, k);
  const sc = (key: string, content: string, def: any[] = ['paragraph']) => renderSectionContent(data, key, content, def);

  return `\\documentclass[9pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=0.5in, top=0.4in, bottom=0.4in]{geometry}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{titlesec}
\\usepackage{xcolor}
\\usepackage{fontawesome5}
\\usepackage{graphicx}
\\usepackage{tabularx}
\\usepackage{ragged2e}
\\usepackage{array}
\\usepackage{multicol}
\\usepackage{wrapfig}
\\usepackage{parskip}

% Colors
\\definecolor{headergray}{RGB}{128,128,128}
\\definecolor{lightgray}{RGB}{200,200,200}
\\definecolor{textgray}{RGB}{80,80,80}
\\definecolor{darkgray}{RGB}{60,60,60}
\\definecolor{accentgray}{RGB}{100,100,100}

\\hypersetup{colorlinks=true, linkcolor=darkgray, urlcolor=darkgray}
\\pagestyle{empty}

% Section formatting
\\titleformat{\\section}{\\small\\bfseries\\color{darkgray}\\uppercase}{}{0em}{}[\\vspace{-0.5em}\\textcolor{lightgray}{\\rule{\\linewidth}{0.4pt}}]
\\titlespacing{\\section}{0pt}{6pt}{3pt}

\\titleformat{\\subsection}{\\small\\bfseries\\color{darkgray}}{}{0em}{}
\\titlespacing{\\subsection}{0pt}{3pt}{1pt}

\\setlist[itemize]{nosep, leftmargin=1em, itemsep=0pt, topsep=1pt, parsep=0pt, label=\\textbullet}

\\setlength{\\parindent}{0pt}
\\setlength{\\parskip}{0pt}

\\begin{document}

% Header with passport photo
\\noindent
\\begin{minipage}[c]{0.15\\textwidth}
    \\centering
    \\fbox{\\rule{2.5cm}{3.2cm}}\\\\
    \\vspace{2pt}
    
\\end{minipage}%
\\hfill
\\begin{minipage}[c]{0.82\\textwidth}
    {\\LARGE\\bfseries\\color{darkgray} ${e(data.name.toUpperCase())}}\\\\[2pt]
    {\\normalsize\\color{headergray} ${e(data.title)} --- ${e(data.subtitle)}}\\\\[3pt]
    {\\small\\color{headergray} 
    \\faPhone\\ ${e(data.phone)} \\quad 
    \\faEnvelope\\ \\href{mailto:${data.email}}{${e(data.email)}} \\quad 
    \\faIcon{globe} \\href{https://www.${data.portfolio}}{${e(data.portfolio)}} \\quad 
    \\faMapMarker*\\ ${e(data.location)}}
\\end{minipage}

\\vspace{4pt}

${!h('summary') ? `% Summary
\\section{${e(data.sectionHeadings.summary)}}
{\\footnotesize\\color{textgray}
\\textbf{${e(data.title)} --- ${e(data.subtitle)}.} ${sc('summary', data.summary)}
}` : ''}

${!h('football') ? `% Football / Sports
\\section{${e(data.sectionHeadings.football)}}
{\\footnotesize\\color{textgray}
${sc('football', data.football)}
}` : ''}

${!h('skills') ? `% Core Competencies
\\section{${e(data.sectionHeadings.skills)}}
{\\footnotesize\\color{textgray}
${sc('skills', data.skills, ['text'])}
}` : ''}

${!h('experience') ? `% Professional Experience
\\section{${e(data.sectionHeadings.experience)}}

${data.experience.map((exp, i) => {
  return `${i > 0 ? '\\vspace{2pt}\n' : ''}\\textbf{\\small ${e(exp.company)}} \\hfill {\\scriptsize\\color{headergray} \\textbf{${e(exp.startDate)} -- ${e(exp.endDate)}}}\\\\
\\textit{\\small ${e(exp.position)}}
{\\footnotesize\\color{textgray}
\\begin{itemize}
${exp.details.map(d => `    \\item ${e(d)}`).join('\n')}
\\end{itemize}
}`;
}).join('\n\n')}` : ''}

% Education & Achievements
\\vspace{-2pt}
\\begin{multicols}{2}

${!h('education') ? `\\section{${e(data.sectionHeadings.education)}}
${data.education.map(edu => {
  return `\\textbf{\\small ${e(edu.degree)}} \\hfill {\\tiny\\color{headergray} \\textbf{${e(edu.startDate)}--${e(edu.endDate)}}}\\\\
{\\footnotesize ${e(edu.institution)}}\\\\
{\\footnotesize\\textit{Activities: ${e(edu.activities)}}}`;
}).join('\n\n\\vspace{2pt}\n')}` : ''}

${!h('achievements') ? `\\section{${e(data.sectionHeadings.achievements)}}
{\\footnotesize\\color{textgray}
${sc('achievements', data.achievements, ['bullet'])}
}` : ''}

\\end{multicols}

${!h('portfolio') ? `% Portfolio
\\vspace{-4pt}
\\section{${e(data.sectionHeadings.portfolio)}}
{\\footnotesize\\color{textgray}
${sc('portfolio', data.portfolioContent, ['bullet', 'hyperlink'])}
}` : ''}

${!h('personalAttributes') ? `% Personal Attributes
\\vspace{-2pt}
\\section{${e(data.sectionHeadings.personalAttributes)}}
{\\footnotesize\\color{textgray}
${sc('personalAttributes', data.personalAttributes)}
}` : ''}

${!h('languages') ? `% Languages
\\vspace{-2pt}
\\section{${e(data.sectionHeadings.languages)}}
{\\footnotesize\\color{textgray}
${sc('languages', data.languages, ['text'])}
}` : ''}

${!h('references') ? `% References
\\vspace{-2pt}
\\section{${e(data.sectionHeadings.references)}}

\\vspace{-2pt}
${renderReferences(data)}` : ''}

${renderCustomSections(data, '\\section')}

\\end{document}`;
}
