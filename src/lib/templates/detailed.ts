import { CVFormData } from '../cv-types';
import { escapeLatex, bulletItems, renderCustomSections, renderReferences } from './utils';

export function detailedTemplate(data: CVFormData): string {
  const e = escapeLatex;

  const expBlocks = data.experience.map(exp => {
    return `\\subsection{${e(exp.position)}}
\\textit{${e(exp.company)}} \\hfill ${e(exp.startDate)} -- ${e(exp.endDate)}
\\begin{itemize}
${exp.details.map(d => `\\item ${e(d)}`).join('\n')}
\\end{itemize}`;
  }).join('\n\n\\vspace{4pt}\n\n');

  return `\\documentclass[9pt,a4paper]{article}

\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage[left=0.65in,right=0.65in,top=0.5in,bottom=0.6in]{geometry}
\\usepackage{xcolor}
\\usepackage{enumitem}
\\usepackage{titlesec}
\\usepackage{hyperref}
\\usepackage{tikz}
\\usepackage{multicol}
\\usepackage{ragged2e}
\\usepackage{fontawesome5}

\\definecolor{headercolor}{RGB}{69,90,100}
\\definecolor{sectioncolor}{RGB}{100,100,100}
\\definecolor{textcolor}{RGB}{80,80,80}

\\pagestyle{empty}
\\setlength{\\parindent}{0pt}
\\setlength{\\parskip}{3pt}

\\hypersetup{colorlinks=true, urlcolor=headercolor}

\\titleformat{\\section}
  {\\small\\bfseries\\color{sectioncolor}\\MakeUppercase}
  {}{0pt}{}
  [\\vspace{-1pt}\\textcolor{sectioncolor}{\\rule{\\linewidth}{0.6pt}}]
\\titlespacing{\\section}{0pt}{7pt}{3pt}

\\titleformat{\\subsection}
  {\\small\\bfseries\\color{textcolor}}
  {}{0pt}{}
\\titlespacing{\\subsection}{0pt}{5pt}{2pt}

\\setlist[itemize]{nosep, leftmargin=1.1em, itemsep=0.8pt, topsep=1pt, parsep=0pt}

\\begin{document}

% ========== HEADER BANNER ==========
\\begin{tikzpicture}[remember picture,overlay]
    \\fill[headercolor] (current page.north west) rectangle ++(\\paperwidth,-4.7cm);
\\end{tikzpicture}

\\vspace*{0.2cm}

\\begin{center}
    {\\fontsize{27}{30}\\selectfont\\bfseries\\color{white}${e(data.name.toUpperCase())}}\\\\[5pt]
    
    {\\fontsize{15}{17}\\selectfont\\bfseries\\color{white}${e(data.title.toUpperCase())}}\\\\[4pt]
    
    {\\fontsize{11}{13}\\selectfont\\color{white}\\itshape ${e(data.subtitle)}}
\\end{center}

\\vspace{0.3cm}

% ========== TWO COLUMN CONTENT ==========
\\begin{multicols}{2}
\\raggedright

% LEFT COLUMN
\\section{Contact}
{\\small
\\textbf{Phone:} ${e(data.phone)} \\\\[1pt]
\\textbf{Email:} \\href{mailto:${data.email}}{${e(data.email)}} \\\\[1pt]
\\textbf{Portfolio:} \\href{https://www.${data.portfolio}}{${e(data.portfolio)}} \\\\[1pt]
\\textbf{Location:} ${e(data.location)}
}

\\section{${e(data.sectionHeadings.summary)}}
{\\small
${e(data.summary)}
}

\\section{${e(data.sectionHeadings.education)}}
{\\small
${data.education.map(edu => {
  return `\\subsection{${e(edu.degree)}}
${e(edu.institution)} \\hfill ${e(edu.startDate)}--${e(edu.endDate)} \\\\[1pt]
\\textit{${e(edu.activities)}}`;
}).join('\n\n\\vspace{3pt}\n\n')}
}

\\section{${e(data.sectionHeadings.skills)}}
{\\small
${e(data.skills)}
}

\\section{${e(data.sectionHeadings.languages)}}
{\\small ${e(data.languages)}}

\\section{${e(data.sectionHeadings.achievements)}}
{\\small
\\begin{itemize}
${bulletItems(data.achievements)}
\\end{itemize}
}

\\section{${e(data.sectionHeadings.experience)}}
{\\small
${expBlocks}
}

\\section{${e(data.sectionHeadings.portfolio)}}
{\\small
\\begin{itemize}
${bulletItems(data.portfolioContent)}
\\end{itemize}
}

\\columnbreak

% RIGHT COLUMN
\\section{${e(data.sectionHeadings.football)}}
{\\small
${e(data.football)}
}

\\section{${e(data.sectionHeadings.personalAttributes)}}
{\\small
${e(data.personalAttributes)}
}

\\section{${e(data.sectionHeadings.references)}}
{\\small
${renderReferences(data)}
}

${renderCustomSections(data, '\\section')}

\\end{multicols}

\\end{document}`;
}
