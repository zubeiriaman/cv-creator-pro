import { CVFormData } from '../cv-types';
import { escapeLatex, isHidden, renderSectionContent, renderCustomSections, renderReferences } from './utils';

export function executive1Template(data: CVFormData): string {
  const e = escapeLatex;
  const h = (k: string) => isHidden(data, k);
  const sc = (key: string, content: string, def: any[] = ['paragraph']) => renderSectionContent(data, key, content, def);

  const expBlocks = data.experience.map(exp => {
    return `\\textbf{${e(exp.position)}} \\hfill \\small ${e(exp.startDate)} -- ${e(exp.endDate)}\\\\
\\textit{${e(exp.company)}}
\\begin{itemize}
${exp.details.map(d => `  \\item ${e(d)}`).join('\n')}
\\end{itemize}`;
  }).join('\n\n');

  return `\\documentclass[10pt,a4paper]{article}

\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage[
  left=18mm,
  right=18mm,
  top=18mm,
  bottom=18mm
]{geometry}

\\usepackage{xcolor}
\\usepackage{fontawesome5}
\\usepackage{hyperref}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{tikz}
\\usepackage{ragged2e}
\\usepackage{multicol}

\\definecolor{chelseablue}{RGB}{0,51,160}
\\definecolor{chelseabluelight}{RGB}{0,102,204}
\\definecolor{darkgray}{RGB}{50,50,50}
\\definecolor{lightgray}{RGB}{245,245,245}

\\hypersetup{colorlinks=true, urlcolor=chelseabluelight, linkcolor=chelseabluelight}

\\pagestyle{empty}
\\setlength{\\parindent}{0pt}
\\setlength{\\parskip}{0pt}

% Section style
\\titleformat{\\section}
  {\\large\\bfseries\\color{chelseablue}\\MakeUppercase}
  {}{0em}{}
  [\\vspace{2pt}\\color{chelseablue}\\rule{\\linewidth}{1.4pt}]
\\titlespacing{\\section}{0pt}{10pt}{4pt}

% Subsection style
\\titleformat{\\subsection}
  {\\normalsize\\bfseries\\color{darkgray}}
  {}{0em}{}
\\titlespacing{\\subsection}{0pt}{6pt}{2pt}

% Tight lists
\\setlist[itemize]{nosep, leftmargin=1.4em, itemsep=0.8pt, topsep=1pt, parsep=0pt}

\\begin{document}

% ==============================================
%               HEADER + PHOTO
% ==============================================

\\begin{minipage}[t]{0.68\\textwidth}
  \\vspace{-4mm}
  {\\Huge\\bfseries ${e(data.name.toUpperCase())}}\\\\[3pt]
  {\\LARGE\\bfseries\\textcolor{chelseablue}{${e(data.title.toUpperCase())}}}\\\\[4pt]
  {\\normalsize ${e(data.subtitle)}}\\\\[6pt]

  \\small
  \\faPhone\\ ${e(data.phone)} \\quad
  \\faEnvelope\\ \\href{mailto:${data.email}}{${e(data.email)}} \\quad
  \\faMapMarker*\\ ${e(data.location)} \\\\[3pt]
  \\faGlobe\\ \\href{https://www.${data.portfolio}}{${e(data.portfolio)}}
\\end{minipage}%
\\hfill
\\begin{minipage}[t]{0.28\\textwidth}
  \\vspace{-6mm}
  \\begin{center}
    \\begin{tikzpicture}
      \\node[draw=chelseabluelight, line width=1.8pt, minimum width=3.5cm, minimum height=4.5cm,
            fill=lightgray, text=darkgray, align=center, font=\\footnotesize\\itshape,
            inner sep=4pt] (photo) {Passport\\\\photo\\\\35 × 45 mm};
    \\end{tikzpicture}
  \\end{center}
\\end{minipage}

\\vspace{10pt}

${!h('summary') ? `\\section{${e(data.sectionHeadings.summary)}}
\\RaggedRight
${sc('summary', data.summary)}

\\vspace{8pt}` : ''}

${!h('skills') ? `\\section{${e(data.sectionHeadings.skills)}}
${sc('skills', data.skills, ['text'])}

\\vspace{8pt}` : ''}

${!h('experience') ? `\\section{${e(data.sectionHeadings.experience)}}

${expBlocks}

\\vspace{8pt}` : ''}

${!h('football') ? `\\section{${e(data.sectionHeadings.football)}}
${sc('football', data.football)}

\\vspace{8pt}` : ''}

${!h('education') ? `\\section{${e(data.sectionHeadings.education)}}

${data.education.map(edu => {
  return `\\textbf{${e(edu.degree)}} \\hfill ${e(edu.startDate)}--${e(edu.endDate)}\\\\
${e(edu.institution)}`;
}).join('\n\n')}

\\vspace{6pt}` : ''}

${!h('achievements') ? `\\section{${e(data.sectionHeadings.achievements)}}
${sc('achievements', data.achievements, ['bullet'])}

\\vspace{6pt}` : ''}

${!h('portfolio') ? `\\section{${e(data.sectionHeadings.portfolio)}}
${sc('portfolio', data.portfolioContent, ['bullet', 'hyperlink'])}

\\vspace{6pt}` : ''}

${!h('personalAttributes') ? `\\section{${e(data.sectionHeadings.personalAttributes)}}
${sc('personalAttributes', data.personalAttributes)}

\\vspace{6pt}` : ''}

${!h('languages') ? `\\section{${e(data.sectionHeadings.languages)}}
${sc('languages', data.languages, ['text'])}

\\vspace{8pt}` : ''}

${!h('references') ? `\\section{${e(data.sectionHeadings.references)}}

${renderReferences(data)}` : ''}

${renderCustomSections(data, '\\section')}

\\end{document}`;
}
