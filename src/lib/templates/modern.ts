import { CVFormData } from '../cv-types';
import { escapeLatex, bulletItems, renderCustomSections, renderReferences } from './utils';

export function modernTemplate(data: CVFormData): string {
  const e = escapeLatex;

  const expBlocks = data.experience.map(exp => {
    return `\\jobtitle{${e(exp.position)}}{${e(exp.startDate)} -- ${e(exp.endDate)}}{${e(exp.company)}}
\\begin{itemize}[leftmargin=*, noitemsep, topsep=2pt]
${exp.details.map(d => `    \\item ${e(d)}`).join('\n')}
\\end{itemize}`;
  }).join('\n\n\\vspace{0.4cm}\n\n');

  return `\\documentclass[10pt,a4paper]{article}

% --- Packages ---
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage[margin=1cm]{geometry}
\\usepackage{xcolor}
\\usepackage{enumitem}
\\usepackage{titlesec}
\\usepackage{parskip}
\\usepackage{fontawesome5}
\\usepackage{tcolorbox}
\\usepackage{multicol}
\\usepackage{hyperref}
\\usepackage{tikz}

% --- Custom Colors ---
\\definecolor{primaryblue}{RGB}{0,102,204}
\\definecolor{darkblue}{RGB}{0,51,102}

% --- Layout Settings ---
\\pagestyle{empty}
\\setlength{\\columnsep}{1cm}
\\hypersetup{colorlinks=true, linkcolor=darkblue, urlcolor=primaryblue}

% --- Section Styling ---
\\titleformat{\\section}
  {\\large\\bfseries\\color{primaryblue}}
  {}{0pt}
  {\\MakeUppercase}
  [\\titlerule]
\\titlespacing{\\section}{0pt}{12pt}{8pt}

\\newcommand{\\jobtitle}[3]{
    \\textbf{#1} \\hfill \\textit{#2} \\\\
    \\textcolor{primaryblue}{\\textbf{#3}}
}

% --- Document Start ---
\\begin{document}

% Header
\\begin{minipage}[t]{0.70\\textwidth}
    {\\Huge \\textbf{${e(data.name.toUpperCase())}}} \\\\
    {\\large \\textbf{${e(data.title)}} | ${e(data.subtitle)}}
\\end{minipage}
\\begin{minipage}[t]{0.28\\textwidth}
    \\flushright
    
\\end{minipage}

\\vspace{0.2cm}

% Contact Info
\\begin{minipage}[t]{0.70\\textwidth}
    \\small
    \\faPhone \\ ${e(data.phone)} \\quad \\faEnvelope \\ \\href{mailto:${data.email}}{${e(data.email)}} \\\\
    \\faMapMarker* \\ ${e(data.location)} \\quad \\faLinkedin \\ \\href{https://www.${data.portfolio}}{${e(data.portfolio)}}
\\end{minipage}

\\vspace{0.8cm}

\\begin{multicols}{2}
\\columnseprule=0pt

% --- LEFT COLUMN ---
\\section{\\texorpdfstring{\\faUser}{Summary} ${e(data.sectionHeadings.summary)}}
${e(data.summary)}

\\section{\\texorpdfstring{\\faBriefcase}{Experience} ${e(data.sectionHeadings.experience)}}

${expBlocks}

\\section{\\texorpdfstring{\\faFutbol}{Sports} ${e(data.sectionHeadings.football)}}
${e(data.football)}

\\vfill\\null \\columnbreak % Switch to right column

% --- RIGHT COLUMN ---
\\section{\\texorpdfstring{\\faStar}{Achievements} ${e(data.sectionHeadings.achievements)}}
\\begin{itemize}[leftmargin=*, noitemsep]
${bulletItems(data.achievements)}
\\end{itemize}

\\section{\\texorpdfstring{\\faTools}{Skills} ${e(data.sectionHeadings.skills)}}
${e(data.skills)}

\\section{\\texorpdfstring{\\faGraduationCap}{Education} ${e(data.sectionHeadings.education)}}
${data.education.map(edu => {
  return `\\textbf{${e(edu.degree)}} \\\\
\\textit{${e(edu.startDate)}--${e(edu.endDate)}} \\\\
${e(edu.institution)}`;
}).join('\n\n\\vspace{0.2cm}\n')}

\\section{\\texorpdfstring{\\faUserCircle}{Attributes} ${e(data.sectionHeadings.personalAttributes)}}
${e(data.personalAttributes)}

\\section{\\texorpdfstring{\\faAddressCard}{References} ${e(data.sectionHeadings.references)}}
\\small
${renderReferences(data)}

\\section{\\texorpdfstring{\\faLanguage}{Languages} ${e(data.sectionHeadings.languages)}}
${e(data.languages)}

${renderCustomSections(data, '\\section')}

\\end{multicols}

\\end{document}`;
}
