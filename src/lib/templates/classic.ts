import { CVFormData } from '../cv-types';
import { escapeLatex, bulletItems } from './utils';

export function classicTemplate(data: CVFormData): string {
  const e = escapeLatex;

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

% Professional Summary
\\section*{\\faUser\\ ${e(data.sectionHeadings.summary)}}
${e(data.summary)}

% Football Credentials
\\section*{\\faFutbol\\ ${e(data.sectionHeadings.football)}}

\\subsection*{\\faTrophy\\ Professional FIFA Esports}
\\textit{Competitive Player -- Championship Titles}
\\begin{itemize}
    \\item \\textbf{Winner -- AIUB Inter FIFA Competition} -- Defeated top university-level competitors in Bangladesh's premier academic esports tournament
    \\item \\textbf{4-Time Champion -- FIFA Pro Club Bangladesh} -- Dominated professional competition, demonstrating elite tactical understanding
    \\item Conducted \\textbf{training sessions} for aspiring esports players, developing curriculum on football tactics and gameplay strategies
\\end{itemize}

\\subsection*{\\faTv\\ Television \\& Media}
\\textit{Featured Analyst -- On-Camera Commentary}
\\begin{itemize}
    \\item \\textbf{Featured guest on Bangladeshi sports television} providing expert football analysis -- \\faYoutube\\ \\href{https://www.youtube.com/watch?v=J5GwZosQgq0&list=PLqxFDwhgZcjwpNRIiwumEuEh8ieyKrX7y}{\\textbf{View on YouTube}}
    \\item Articulated complex tactics, transfer analysis, and match predictions for television audiences
\\end{itemize}

\\subsection*{\\faUsers\\ Community Leadership \\& Page Management}
\\textit{Administrator \\& Content Manager}
\\begin{itemize}
    \\item \\textbf{Managed Chelsea Fans Supporters of Bangladesh official page} -- Created and posted regular football content, match updates, player news, and graphics; grew engagement and fostered supporter community
    \\item \\textbf{Managed Football Lovers Club Bangladesh page} -- Produced daily football content, tactical analysis, transfer news, and visual graphics for diverse football fanbase
    \\item \\textbf{Former Administrator -- Chelsea FC Supporters Club Bangladesh} -- Led communications, \\textbf{news writing}, and fan engagement initiatives
    \\item \\textbf{Core Member -- Premier Football Discussion Groups} (Bangladesh's largest) -- Engaged in tactical discussions and league coverage
    \\item Coordinated match-day \\textbf{activities}, viewing parties, and fan discussions
    \\item Created \\textbf{logos and branding materials} for football clubs and tournaments
\\end{itemize}

\\subsection*{\\faPlane\\ International Stadium Experience}
\\begin{itemize}
    \\item \\textbf{Stamford Bridge:} Chelsea vs Benfica -- Premier League atmosphere and media operations
    \\item \\textbf{Emirates Stadium:} Brazil vs Senegal -- International friendly and event management insight
\\end{itemize}

% Core Competencies
\\section*{\\faTools\\ ${e(data.sectionHeadings.skills)}}

\\subsection*{Content \\& Journalism}
\\begin{itemize}
    \\item \\textbf{News Writing \\& Content Writing} -- Articles, match reports, digital content for social media pages and football communities
    \\item \\textbf{Editing} -- Reviewed press releases, articles, and digital content for accuracy
    \\item \\textbf{Sports Writing \\& Match Analysis} -- 16+ years producing tactical breakdowns and player analyses
    \\item \\textbf{Press Releases \\& Official Statements} -- Corporate communications at foodpanda
    \\item \\textbf{Digital Journalism} -- Real-time publication and rapid-response coverage
\\end{itemize}

\\subsection*{Media \\& Digital Management}
\\begin{itemize}
    \\item \\textbf{Social Media Management} -- Led content strategy for \\textbf{Chelsea Fans Supporters of Bangladesh} and \\textbf{Football Lovers Club Bangladesh} pages; daily publishing across \\textbf{social media platforms}
    \\item \\textbf{Sports Event Management} -- Arranged foodpanda football tournament with full media coverage
    \\item \\textbf{Media Coordination} -- Collaborated with photographers, videographers, and creative teams
    \\item \\textbf{Archives} -- Maintained organized records of media releases and campaign materials
    \\item \\textbf{Brand Communications} -- Maintained strict brand guidelines across all communications
    \\item \\textbf{Community Engagement} -- Cultivated football communities through consistent content and interaction
\\end{itemize}

\\subsection*{Professional Skills}
\\begin{itemize}
    \\item \\textbf{Reporting} -- Accurate, deadline-driven coverage in high-pressure environments
    \\item \\textbf{Assist \\& Support} -- Supported cross-functional teams and coordinated complex events
    \\item \\textbf{Football Industry Knowledge} -- FIFA/AFC regulations, league structures, administration
    \\item \\textbf{Operational Flexibility} -- Evenings, weekends, and travel for match coverage
    \\item \\textbf{Languages:} English (fluent), Bangla (native)
\\end{itemize}

% Experience
\\section*{\\faBriefcase\\ ${e(data.sectionHeadings.experience)}}

${expBlocks}

% Education
\\section*{\\faGraduationCap\\ ${e(data.sectionHeadings.education)}}

${eduBlocks}

% Achievements
\\section*{\\faStar\\ ${e(data.sectionHeadings.achievements)}}
\\begin{itemize}
${bulletItems(data.achievements)}
\\end{itemize}

% Portfolio
\\section*{\\faAddressBook\\ Portfolio}
\\begin{itemize}
    \\item \\faYoutube\\ \\textbf{TV Appearances:} \\href{https://www.youtube.com/watch?v=J5GwZosQgq0&list=PLqxFDwhgZcjwpNRIiwumEuEh8ieyKrX7y}{\\textbf{YouTube Portfolio}}
    \\item \\faBriefcase\\ \\textbf{Design Work:} \\href{https://www.${data.portfolio}}{\\textbf{${e(data.portfolio)}}}
    \\item \\faPen\\ \\textbf{Writing Samples:} Match reports and tactical analyses available
    \\item \\faGamepad\\ \\textbf{FIFA Credentials:} Competition history and training materials available
\\end{itemize}

% Personal Attributes
\\section*{\\faUserCircle\\ Personal Attributes}
\\textbf{Dedicated Media Executive} with deep football knowledge. \\textbf{Responsible} for accurate \\textbf{content creation} and \\textbf{editing}. Proven ability to \\textbf{assist} teams while maintaining \\textbf{archives} and \\textbf{records}. Comfortable with \\textbf{government} protocols. Flexible for evenings, weekends, and travel.

% References
\\section*{\\faAddressCard\\ References}

\\begin{minipage}[t]{0.48\\textwidth}
\\small
\\textbf{Syed Nur Ur Rahman}\\\\
Senior Manager, foodpanda Bangladesh\\\\
\\faPhone\\ +8801751045011\\\\
\\faEnvelope\\ \\href{mailto:syed.nur@foodpanda.com.bd}{syed.nur@foodpanda.com.bd}
\\end{minipage}
\\hfill
\\begin{minipage}[t]{0.48\\textwidth}
\\small
\\textbf{Md. Anamul Hoque}\\\\
Assistant Professor, East West University\\\\
\\faPhone\\ +8801962265092\\\\
\\faEnvelope\\ \\href{mailto:a.hoque@ewubd.edu}{a.hoque@ewubd.edu}
\\end{minipage}

\\end{document}`;
}
