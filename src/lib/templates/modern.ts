import { CVFormData } from '../cv-types';
import { escapeLatex, bulletItems } from './utils';

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

\\section{\\texorpdfstring{\\faFutbol}{Football} ${e(data.sectionHeadings.football)}}
\\begin{itemize}[leftmargin=*, noitemsep]
    \\item \\textbf{TV Analyst:} Expert guest on Bangladeshi sports television. \\href{https://www.youtube.com/watch?v=J5GwZosQgq0&list=PLqxFDwhgZcjwpNRIiwumEuEh8ieyKrX7y}{\\faYoutube\\ Link}.
    \\item \\textbf{Page Manager:} Managed \\textit{Chelsea Fans Supporters of Bangladesh} and \\textit{Football Lovers Club BD}.
    \\item \\textbf{Stadium Experience:} Stamford Bridge (Chelsea vs Benfica) and Emirates Stadium (Brazil vs Senegal).
\\end{itemize}

\\vfill\\null \\columnbreak % Switch to right column

% --- RIGHT COLUMN ---
\\section{\\texorpdfstring{\\faStar}{Key Achievements} ${e(data.sectionHeadings.achievements)}}

\\begin{tcolorbox}[colback=white, colframe=primaryblue, arc=0mm, leftrule=3pt, rightrule=0pt, toprule=0pt, bottomrule=0pt, boxsep=1pt]
    \\textbf{Professional FIFA Esports} \\\\
    \\small \\textbf{Winner} - AIUB Inter FIFA Competition \\& \\textbf{4-Time Champion} - FIFA Pro Club Bangladesh.
\\end{tcolorbox}

\\begin{tcolorbox}[colback=white, colframe=primaryblue, arc=0mm, leftrule=3pt, rightrule=0pt, toprule=0pt, bottomrule=0pt, boxsep=1pt]
    \\textbf{Broadcast Media Analyst} \\\\
    \\small Featured analyst articulating complex tactics and match predictions for television audiences.
\\end{tcolorbox}

\\begin{tcolorbox}[colback=white, colframe=primaryblue, arc=0mm, leftrule=3pt, rightrule=0pt, toprule=0pt, bottomrule=0pt, boxsep=1pt]
    \\textbf{Community Leadership} \\\\
    \\small Cultivated football communities through consistent content and tactical discussion for 100k+ fans.
\\end{tcolorbox}

\\section{\\texorpdfstring{\\faTools}{Skills} ${e(data.sectionHeadings.skills)}}
\\begin{itemize}[leftmargin=*, noitemsep]
    \\item \\textbf{News \\& Content Writing}
    \\item \\textbf{Editing \\& Press Releases}
    \\item \\textbf{Sports Writing \\& Match Analysis}
    \\item \\textbf{Social Media Management}
    \\item \\textbf{Sports Event Management}
    \\item \\textbf{Media Coordination \\& Archives}
    \\item \\textbf{Football Industry Knowledge}
    \\item \\textbf{Design Work (Behance)}
\\end{itemize}

\\section{\\texorpdfstring{\\faGraduationCap}{Education} ${e(data.sectionHeadings.education)}}
${data.education.map(edu => {
  return `\\textbf{${e(edu.degree)}} \\\\
\\textit{${e(edu.startDate)}--${e(edu.endDate)}} \\\\
${e(edu.institution)}`;
}).join('\n\n\\vspace{0.2cm}\n')}

\\section{\\texorpdfstring{\\faAddressCard}{References} References}
\\small
\\textbf{Syed Nur Ur Rahman} \\\\
Senior Manager, foodpanda BD \\\\
\\faPhone\\ +8801751045011

\\vspace{0.2cm}
\\textbf{Md. Anamul Hoque} \\\\
Assistant Professor, EWU \\\\
\\faPhone\\ +8801962265092

\\section{\\texorpdfstring{\\faLanguage}{Languages} Languages}
\\begin{itemize}[leftmargin=*, noitemsep]
    \\item \\textbf{English:} Professional/Fluent
    \\item \\textbf{Bangla:} Native
\\end{itemize}

\\end{multicols}

\\end{document}`;
}
