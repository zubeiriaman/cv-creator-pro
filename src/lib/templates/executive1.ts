import { CVFormData } from '../cv-types';
import { escapeLatex } from './utils';

export function executive1Template(data: CVFormData): string {
  const e = escapeLatex;

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
  \\faYoutube\\ \\href{https://www.${data.social}}{YouTube Portfolio} \\quad
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

% ==============================================
%               PROFESSIONAL SUMMARY
% ==============================================

\\section{${e(data.sectionHeadings.summary)}}
\\RaggedRight
${e(data.summary)}

\\vspace{8pt}

% ==============================================
%               KEY STRENGTHS / SKILLS
% ==============================================

\\section{Key Strengths \\& Skills}

\\begin{multicols}{3}
\\small
\\textbf{Content \\& Journalism}
\\begin{itemize}
  \\item Sports writing \\& match analysis
  \\item Press releases \\& news articles
  \\item Editing \\& proofreading
  \\item Digital journalism
\\end{itemize}

\\columnbreak

\\textbf{Media \\& Digital}
\\begin{itemize}
  \\item Social media strategy \\& management
  \\item Sports event organisation
  \\item Media coordination
  \\item Brand communications
  \\item Community building
\\end{itemize}

\\columnbreak

\\textbf{Professional}
\\begin{itemize}
  \\item Stakeholder management
  \\item Archive \\& records management
  \\item High-pressure environments
  \\item Flexible availability
  \\item English (fluent) • Bangla (native)
\\end{itemize}
\\end{multicols}

\\vspace{8pt}

% ==============================================
%               PROFESSIONAL EXPERIENCE
% ==============================================

\\section{${e(data.sectionHeadings.experience)}}

${expBlocks}

\\vspace{8pt}

% ==============================================
%               FOOTBALL & COMMUNITY
% ==============================================

\\section{${e(data.sectionHeadings.football)}}

\\textbf{Professional FIFA Esports}
\\begin{itemize}
  \\item Winner -- AIUB Inter FIFA Competition
  \\item 4× Champion -- FIFA Pro Club Bangladesh
  \\item Delivered training sessions for aspiring players
\\end{itemize}

\\textbf{TV \\& Media Appearances}
\\begin{itemize}
  \\item Featured football analyst on Bangladeshi sports television
  \\item \\faYoutube\\ \\href{https://www.youtube.com/watch?v=J5GwZosQgq0&list=PLqxFDwhgZcjwpNRIiwumEuEh8ieyKrX7y}{YouTube Portfolio}
\\end{itemize}

\\textbf{Community \\& Page Management}
\\begin{itemize}
  \\item Administrator -- Chelsea Fans Supporters of Bangladesh official page
  \\item Administrator -- Football Lovers Club Bangladesh page
  \\item Created regular content, match updates, graphics and fan engagement
  \\item Designed logos and branding materials for clubs and tournaments
\\end{itemize}

\\textbf{Stadium Experience}
\\begin{itemize}
  \\item Stamford Bridge -- Chelsea vs Benfica
  \\item Emirates Stadium -- Brazil vs Senegal
\\end{itemize}

\\vspace{8pt}

% ==============================================
%               EDUCATION + PORTFOLIO + REFERENCES
% ==============================================

\\section{${e(data.sectionHeadings.education)}}

${data.education.map(edu => {
  return `\\textbf{${e(edu.degree)}} \\hfill ${e(edu.startDate)}--${e(edu.endDate)}\\\\
${e(edu.institution)}`;
}).join('\n\n')}

\\vspace{6pt}

\\section{Portfolio}

\\faYoutube\\ \\href{https://www.youtube.com/watch?v=J5GwZosQgq0&list=PLqxFDwhgZcjwpNRIiwumEuEh8ieyKrX7y}{YouTube -- TV Appearances \\& Analysis}\\\\
\\faGlobe\\ \\href{https://www.${data.portfolio}}{Behance -- Design \\& Branding Work}

\\vspace{8pt}

% References
\\section{References}

\\begin{minipage}[t]{0.48\\textwidth}
  \\small
  \\textbf{Syed Nur Ur Rahman} \\\\
  \\textit{Senior Manager -- foodpanda Bangladesh} \\\\[3pt]
  \\textcolor{chelseabluelight}{\\faPhone}\\ +880\\,1751\\,045011 \\\\[1pt]
  \\textcolor{chelseabluelight}{\\faEnvelope}\\ \\href{mailto:syed.nur@foodpanda.com.bd}{syed.nur@foodpanda.com.bd}
\\end{minipage}%
\\hfill
\\begin{minipage}[t]{0.48\\textwidth}
  \\small
  \\textbf{Md. Anamul Hoque} \\\\
  \\textit{Assistant Professor -- East West University} \\\\[3pt]
  \\textcolor{chelseabluelight}{\\faPhone}\\ +880\\,1962\\,265092 \\\\[1pt]
  \\textcolor{chelseabluelight}{\\faEnvelope}\\ \\href{mailto:a.hoque@ewubd.edu}{a.hoque@ewubd.edu}
\\end{minipage}

\\end{document}`;
}
