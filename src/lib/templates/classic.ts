import { CVFormData } from '../cv-types';
import { escapeLatex, isHidden, renderSectionContent, renderCustomSections, renderReferences } from './utils';

export function classicTemplate(data: CVFormData): string {
  const e = escapeLatex;
  const h = (k: string) => isHidden(data, k);
  const sc = (key: string, content: string, def: any[] = ['paragraph']) => renderSectionContent(data, key, content, def);

  const expBlocks = data.experience.map(exp => {
    return `\\textbf{${e(exp.company)}} \\hfill \\textbf{${e(exp.startDate)} -- ${e(exp.endDate)}}\\\\
\\textit{${e(exp.position)}}
\\begin{itemize}
${exp.details.map(d => `    \\item ${e(d)}`).join('\n')}
\\end{itemize}`;
  }).join('\n\n');

  const eduBlocks = data.education.map(edu => {
    return `\\textbf{${e(edu.degree)}} \\hfill \\textbf{${e(edu.startDate)}--${e(edu.endDate)}}\\\\
${e(edu.institution)}\\\\
\\textit{Activities: ${e(edu.activities)}}`;
  }).join('\\\\[3pt]\n\n');

  return `\\documentclass[9pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=0.5in]{geometry}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{titlesec}
\\usepackage{xcolor}
\\usepackage{fontawesome5}

\\definecolor{bffblue}{RGB}{0,102,204}
\\definecolor{darkblue}{RGB}{0,51,102}

\\hypersetup{colorlinks=true, linkcolor=darkblue, urlcolor=bffblue}
\\pagestyle{empty}

\\titleformat{\\section}{\\normalsize\\bfseries\\color{bffblue}}{}{0em}{}[\\titlerule]
\\titlespacing{\\section}{0pt}{4pt}{2pt}
\\titleformat{\\subsection}[runin]{\\small\\bfseries\\color{darkblue}}{}{0em}{}
\\titlespacing{\\subsection}{0pt}{2pt}{1pt}
\\setlength{\\parindent}{0pt}
\\setlist{nosep, leftmargin=1.2em, itemsep=1pt, topsep=1pt}

\\begin{document}

% Header
\\begin{center}
{\\large \\textbf{${e(data.name)}}}\\\\[2pt]
\\textbf{${e(data.title)}} | ${e(data.subtitle)}\\\\[2pt]
\\faPhone\\ ${e(data.phone)} \\quad \\faEnvelope\\ \\href{mailto:${data.email}}{${e(data.email)}} \\quad \\faMapMarker*\\ ${e(data.location)}\\\\[1pt]
\\faLinkedin\\ \\href{https://www.${data.portfolio}}{${e(data.portfolio)}}
\\end{center}

\\vspace{-2pt}

${!h('summary') ? `% Summary
\\section*{\\faUser\\ ${e(data.sectionHeadings.summary)}}
${sc('summary', data.summary)}` : ''}

${!h('football') ? `% Sports
\\section*{\\faFutbol\\ ${e(data.sectionHeadings.football)}}
${sc('football', data.football)}` : ''}

${!h('skills') ? `% Skills
\\section*{\\faTools\\ ${e(data.sectionHeadings.skills)}}
${sc('skills', data.skills, ['text'])}` : ''}

${!h('experience') ? `% Experience
\\section*{\\faBriefcase\\ ${e(data.sectionHeadings.experience)}}

${expBlocks}` : ''}

${!h('education') ? `% Education
\\section*{\\faGraduationCap\\ ${e(data.sectionHeadings.education)}}

${eduBlocks}` : ''}

${!h('achievements') ? `% Achievements
\\section*{\\faStar\\ ${e(data.sectionHeadings.achievements)}}
${sc('achievements', data.achievements, ['bullet'])}` : ''}

${!h('portfolio') ? `% Portfolio
\\section*{\\faAddressBook\\ ${e(data.sectionHeadings.portfolio)}}
${sc('portfolio', data.portfolioContent, ['bullet', 'hyperlink'])}` : ''}

${!h('personalAttributes') ? `% Personal Attributes
\\section*{\\faUserCircle\\ ${e(data.sectionHeadings.personalAttributes)}}
${sc('personalAttributes', data.personalAttributes)}` : ''}

${!h('languages') ? `% Languages
\\section*{\\faLanguage\\ ${e(data.sectionHeadings.languages)}}
${sc('languages', data.languages, ['text'])}` : ''}

${!h('references') ? `% References
\\section*{\\faAddressCard\\ ${e(data.sectionHeadings.references)}}

${renderReferences(data)}` : ''}

${renderCustomSections(data, '\\section*')}

\\end{document}`;
}
