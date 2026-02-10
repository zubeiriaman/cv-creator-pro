import { CVFormData } from '../cv-types';
import { escapeLatex } from './utils';

export function executive2Template(data: CVFormData): string {
  const e = escapeLatex;

  const expBlock1 = data.experience[0];
  const expBlock2 = data.experience[1];

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

% Summary Section
\\section{${e(data.sectionHeadings.summary)}}
{\\footnotesize\\color{textgray}
\\textbf{${e(data.title)} --- ${e(data.subtitle)}.} ${e(data.summary)}
}

% Football Background Section
\\section{${e(data.sectionHeadings.football)}}

\\vspace{-2pt}
\\begin{multicols}{2}

\\subsection{Professional FIFA Esports \\\\ \\footnotesize\\itshape Competitive Player -- Championship Titles}
{\\footnotesize\\color{textgray}
\\begin{itemize}
    \\item \\textbf{Winner -- AIUB Inter FIFA Competition} -- Defeated top university-level competitors in Bangladesh's premier academic esports tournament
    \\item \\textbf{4-Time Champion -- FIFA Pro Club Bangladesh} -- Dominated professional competition, demonstrating elite tactical understanding
    \\item Conducted \\textbf{training sessions} for aspiring esports players, developing curriculum on football tactics and gameplay strategies
\\end{itemize}
}

\\subsection{Television \\& Media \\\\ \\footnotesize\\itshape Featured Analyst -- On-Camera Commentary}
{\\footnotesize\\color{textgray}
\\begin{itemize}
    \\item \\textbf{Featured guest on Bangladeshi sports television} providing expert football analysis
    \\item Articulated complex tactics, transfer analysis, and match predictions for television audiences
\\end{itemize}
}

\\subsection{Community Leadership \\& Page Management \\\\ \\footnotesize\\itshape Administrator \\& Content Manager}
{\\footnotesize\\color{textgray}
\\begin{itemize}
    \\item \\textbf{Managed Chelsea Fans Supporters of Bangladesh official page} -- Created and posted regular football content, match updates, player news, and graphics; grew engagement and fostered supporter community
    \\item \\textbf{Managed Football Lovers Club Bangladesh page} -- Produced daily football content, tactical analysis, transfer news, and visual graphics for diverse football fanbase
    \\item \\textbf{Former Administrator -- Chelsea FC Supporters Club Bangladesh} -- Led communications, \\textbf{news writing}, and fan engagement initiatives
    \\item \\textbf{Core Member -- Premier Football Discussion Groups} (Bangladesh's largest) -- Engaged in tactical discussions and league coverage
    \\item Coordinated match-day \\textbf{activities}, viewing parties, and fan discussions
    \\item Created \\textbf{logos and branding materials} for football clubs and tournaments
\\end{itemize}
}

\\subsection{International Stadium Experience}
{\\footnotesize\\color{textgray}
\\begin{itemize}
    \\item \\textbf{Stamford Bridge:} Chelsea vs Benfica -- Premier League atmosphere and media operations
    \\item \\textbf{Emirates Stadium:} Brazil vs Senegal -- International friendly and event management insight
\\end{itemize}
}

\\end{multicols}

% Core Competencies Section
\\section{${e(data.sectionHeadings.skills)}}

\\vspace{-2pt}
\\begin{multicols}{2}

{\\small\\textbf{Content \\& Journalism}}
{\\footnotesize\\color{textgray}
\\begin{itemize}
    \\item \\textbf{News Writing \\& Content Writing} -- Articles, match reports, digital content for social media pages and football communities
    \\item \\textbf{Editing} -- Reviewed press releases, articles, and digital content for accuracy
    \\item \\textbf{Sports Writing \\& Match Analysis} -- 16+ years producing tactical breakdowns and player analyses
    \\item \\textbf{Press Releases \\& Official Statements} -- Corporate communications at foodpanda
    \\item \\textbf{Digital Journalism} -- Real-time publication and rapid-response coverage
    \\item \\textbf{Tournament Covering} -- Real-time covered a tournament for CFCBSC in Fortis Playground
\\end{itemize}
}

\\columnbreak

{\\small\\textbf{Media \\& Digital Management}}
{\\footnotesize\\color{textgray}
\\begin{itemize}
    \\item \\textbf{Social Media Management} -- Led content strategy for Chelsea Fans Supporters of Bangladesh and Football Lovers Club Bangladesh pages; daily publishing across social media platforms
    \\item \\textbf{Sports Event Management} -- Arranged foodpanda football tournament with full media coverage
    \\item \\textbf{Media Coordination} -- Collaborated with photographers, videographers, and creative teams
    \\item \\textbf{Archives} -- Maintained organized records of media releases and campaign materials
    \\item \\textbf{Brand Communications} -- Maintained strict brand guidelines across all communications
    \\item \\textbf{Community Engagement} -- Cultivated football communities through consistent content and interaction
\\end{itemize}
}

\\end{multicols}

\\vspace{-4pt}
{\\small\\textbf{Professional Skills}}
{\\footnotesize\\color{textgray}
\\begin{itemize}
    \\item \\textbf{Reporting} -- Accurate, deadline-driven coverage in high-pressure environments
    \\item \\textbf{Assist \\& Support} -- Supported cross-functional teams and coordinated complex events
    \\item \\textbf{Football Industry Knowledge} -- FIFA/AFC regulations, league structures, administration
    \\item \\textbf{Operational Flexibility} -- Evenings, weekends, and travel for match coverage
    \\item \\textbf{Languages:} English (fluent), Bangla (native)
\\end{itemize}
}

% Professional Experience Section
\\section{${e(data.sectionHeadings.experience)}}

${data.experience.map((exp, i) => {
  if (i === 0) {
    return `\\textbf{\\small ${e(exp.company)}} \\hfill {\\scriptsize\\color{headergray} \\textbf{${e(exp.startDate)} -- ${e(exp.endDate)}}}\\\\
\\textit{\\small ${e(exp.position)}}
{\\footnotesize\\color{textgray}
\\begin{itemize}
${exp.details.map(d => `    \\item ${e(d)}`).join('\n')}
\\end{itemize}
}`;
  } else {
    return `\\vspace{-2pt}
\\textit{\\small ${e(exp.position)}} \\hfill {\\scriptsize\\color{headergray} \\textbf{${e(exp.startDate)} -- ${e(exp.endDate)}}}
{\\footnotesize\\color{textgray}
\\begin{itemize}
${exp.details.map(d => `    \\item ${e(d)}`).join('\n')}
\\end{itemize}
}`;
  }
}).join('\n\n')}

% Education & Key Achievements Side by Side
\\vspace{-2pt}
\\begin{multicols}{2}

\\section{${e(data.sectionHeadings.education)}}
${data.education.map(edu => {
  return `\\textbf{\\small ${e(edu.degree)}} \\hfill {\\tiny\\color{headergray} \\textbf{${e(edu.startDate)}--${e(edu.endDate)}}}\\\\
{\\footnotesize ${e(edu.institution)}}\\\\
{\\footnotesize\\textit{Activities: ${e(edu.activities)}}}`;
}).join('\n\n\\vspace{2pt}\n')}

\\section{${e(data.sectionHeadings.achievements)}}
{\\footnotesize\\color{textgray}
\\begin{itemize}
    \\item \\textbf{AIUB Inter FIFA Competition Winner} \\& \\textbf{4× FIFA Pro Club Bangladesh Champion}
    \\item \\textbf{Page Management:} Successfully managed \\textbf{Chelsea Fans Supporters of Bangladesh} and \\textbf{Football Lovers Club Bangladesh} pages with regular content and graphics
    \\item \\textbf{Football Event Management:} Arranged foodpanda football tournament with full media coverage
    \\item \\textbf{Broadcast Media:} Featured football analyst on Bangladeshi sports television
    \\item \\textbf{Stadium Visits:} Stamford Bridge (Chelsea vs Benfica) \\& Emirates Stadium (Brazil vs Senegal)
    \\item \\textbf{MSc Distinction} -- University of Hertfordshire
\\end{itemize}
}

\\end{multicols}

% Portfolio, Personal Attributes, References
\\vspace{-4pt}
\\section{Portfolio}
{\\footnotesize\\color{textgray}
\\begin{itemize}
    \\item \\textbf{TV Appearances:} \\href{https://www.youtube.com/playlist?list=PLqxFDwhgZcjwpNRIiwumEuEh8ieyKrX7y}{\\textcolor{blue}{YouTube Portfolio}}
    \\item \\textbf{Design Work:} \\href{https://www.${data.portfolio}}{\\textcolor{blue}{${e(data.portfolio)}}}
    \\item \\textbf{Writing Samples:} Match reports and tactical analyses available
    \\item \\textbf{FIFA Credentials:} Competition history and training materials available
\\end{itemize}
}

\\vspace{-2pt}
\\section{Personal Attributes}
{\\footnotesize\\color{textgray}
\\textbf{Dedicated Media Executive} with deep football knowledge. \\textbf{Responsible} for accurate \\textbf{content creation} and \\textbf{editing}. Proven ability to \\textbf{assist} teams while maintaining \\textbf{archives} and \\textbf{records}. Comfortable with \\textbf{government} protocols. Flexible for evenings, weekends, and travel.
}

\\vspace{-2pt}
\\section{References}

\\vspace{-2pt}
\\begin{minipage}[t]{0.48\\textwidth}
\\footnotesize
\\textbf{Syed Nur Ur Rahman}\\\\
{\\itshape\\color{textgray} Senior Manager, foodpanda Bangladesh}\\\\
\\faPhone\\ +8801751045011\\\\
\\faEnvelope\\ \\href{mailto:syed.nur@foodpanda.com.bd}{syed.nur@foodpanda.com.bd}
\\end{minipage}
\\hfill
\\begin{minipage}[t]{0.48\\textwidth}
\\footnotesize
\\textbf{Md. Anamul Hoque}\\\\
{\\itshape\\color{textgray} Assistant Professor, East West University}\\\\
\\faPhone\\ +8801962265092\\\\
\\faEnvelope\\ \\href{mailto:a.hoque@ewubd.edu}{a.hoque@ewubd.edu}
\\end{minipage}

\\end{document}`;
}
