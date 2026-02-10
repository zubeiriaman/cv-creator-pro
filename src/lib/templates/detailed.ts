import { CVFormData } from '../cv-types';
import { escapeLatex } from './utils';

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

% ========== PAGE 1: TWO COLUMN CONTENT ==========
\\begin{multicols}{2}
\\raggedright

% LEFT COLUMN
\\section{Contact}
{\\small
\\textbf{Phone:} ${e(data.phone)} \\\\[1pt]
\\textbf{Email:} \\href{mailto:${data.email}}{${e(data.email)}} \\\\[1pt]
\\textbf{Portfolio:} \\href{https://www.${data.portfolio}}{${e(data.portfolio)}} \\\\[1pt]
\\textbf{YouTube:} \\href{https://www.${data.social}}{View Portfolio} \\\\[1pt]
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

\\section{Core Competencies}
{\\small
\\textbf{Content \\& Journalism:} News writing, Editing, Sports analysis, Press releases, Digital journalism \\\\[2pt]
\\textbf{Media \\& Digital:} Social media management, Sports events, Media coordination, Archives, Brand communications \\\\[2pt]
\\textbf{Professional:} Reporting, Assist \\& support, Football industry knowledge, Operational flexibility
}

\\section{Languages}
{\\small\\textbf{English:} Fluent \\quad \\textbf{Bangla:} Native}

\\section{${e(data.sectionHeadings.achievements)}}
{\\small
$\\bullet$ \\textbf{AIUB Inter FIFA Winner} \\& 4× FIFA Pro Club Bangladesh Champion \\\\[1pt]
$\\bullet$ Page Management: Chelsea Fans Supporters BD + Football Lovers Club BD \\\\[1pt]
$\\bullet$ Football Event Management: Arranged foodpanda tournament with full media coverage \\\\[1pt]
$\\bullet$ Broadcast Media: Featured football analyst on Bangladeshi sports TV \\\\[1pt]
$\\bullet$ Stadium Visits: Stamford Bridge (Chelsea vs Benfica) \\& Emirates Stadium (Brazil vs Senegal) \\\\[1pt]
$\\bullet$ \\textbf{MSc Distinction} -- University of Hertfordshire
}

\\section{${e(data.sectionHeadings.experience)}}
{\\small
${expBlocks}
}

\\section{Portfolio \\& Media Presence}
{\\small
$\\bullet$ \\textbf{Television Appearances:} \\href{https://www.youtube.com/watch?v=J5GwZosQgq0&list=PLqxFDwhgZcjwpNRIiwumEuEh8ieyKrX7y}{YouTube Portfolio} -- Featured analyst on Bangladeshi sports TV \\\\[1pt]
$\\bullet$ \\textbf{Digital Portfolio:} \\href{https://www.${data.portfolio}}{${e(data.portfolio)}} -- Football branding, tournament designs, digital content \\\\[1pt]
$\\bullet$ \\textbf{Football Writing:} Available upon request -- Match reports, tactical analyses \\\\[1pt]
$\\bullet$ \\textbf{Professional Gaming:} FIFA esports credentials \\& training materials available
}

\\columnbreak

% RIGHT COLUMN
\\section{${e(data.sectionHeadings.football)}}
{\\small
\\subsection{Professional FIFA Esports}
\\textit{AIUB Winner | 4× FIFA Pro Club Bangladesh Champion}
\\begin{itemize}
\\item Winner -- AIUB Inter FIFA Competition (top university-level competitors)
\\item 4-Time Champion -- FIFA Pro Club Bangladesh (elite tactical understanding)
\\item Conducted training sessions for aspiring esports players
\\end{itemize}

\\vspace{3pt}

\\subsection{Television \\& Media -- Featured Analyst}
\\begin{itemize}
\\item Featured guest on Bangladeshi sports television providing expert analysis
\\item Articulated complex tactics, transfer analysis, match predictions
\\end{itemize}

\\vspace{3pt}

\\subsection{Community Leadership \\& Page Management}
\\textit{Administrator \\& Content Manager}
\\begin{itemize}
\\item \\textbf{Chelsea Fans Supporters BD:} Regular content, match updates, player news, graphics
\\item \\textbf{Football Lovers Club BD:} Daily content, tactical analysis, transfer news, visuals
\\item Former Administrator -- Chelsea FC Supporters Club Bangladesh
\\item Core Member -- Premier Football Discussion Groups (Bangladesh's largest)
\\item Coordinated match-day activities, viewing parties, fan discussions
\\item Created \\textbf{logos \\& branding materials} for football clubs \\& tournaments
\\end{itemize}

\\vspace{3pt}

\\subsection{International Stadium Experience}
\\begin{itemize}
\\item \\textbf{Stamford Bridge:} Chelsea vs Benfica -- Premier League atmosphere \\& media ops
\\item \\textbf{Emirates Stadium:} Brazil vs Senegal -- International friendly \\& event management
\\end{itemize}
}

\\columnbreak

\\section{Personal Attributes}
{\\small
Dedicated Media Executive with deep football knowledge. Responsible content creation \\& editing. Team support \\& archive management skills. Comfortable with government \\& sports organisation protocols. Flexible availability (evenings, weekends, travel). Detail-oriented, deadline-driven, broadcast \\& high-pressure writing capable.
}

\\section{Professional References}
{\\small
\\textbf{Syed Nur Ur Rahman} \\\\[1pt]
Senior Manager, foodpanda Bangladesh \\\\[1pt]
\\faPhone\\ +880\\,1751\\,045011 \\\\[1pt]
\\faEnvelope\\ \\href{mailto:syed.nur@foodpanda.com.bd}{syed.nur@foodpanda.com.bd}

\\vspace{8pt}

\\textbf{Md. Anamul Hoque} \\\\[1pt]
Assistant Professor, East West University \\\\[1pt]
\\faPhone\\ +880\\,1962\\,265092 \\\\[1pt]
\\faEnvelope\\ \\href{mailto:a.hoque@ewubd.edu}{a.hoque@ewubd.edu}
}

\\end{multicols}

\\end{document}`;
}
