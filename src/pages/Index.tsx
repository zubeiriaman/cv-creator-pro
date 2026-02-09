import { useState, useCallback, useRef } from 'react';
import TemplateSelector from '@/components/cv/TemplateSelector';
import CVForm from '@/components/cv/CVForm';
import PreviewPanel from '@/components/cv/PreviewPanel';
import { CVFormData, TemplateName, defaultFormData } from '@/lib/cv-types';
import { generateLatex } from '@/lib/latex-templates';
import { FileText } from 'lucide-react';

const Index = () => {
  const [formData, setFormData] = useState<CVFormData>(defaultFormData);
  const [template, setTemplate] = useState<TemplateName>('classic');
  const [latexCode, setLatexCode] = useState('');
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'compiling' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '💡 Fill in your details and click "Generate & Compile PDF"',
  });
  const latexCodeRef = useRef('');

  const handleCompile = useCallback(async () => {
    setIsCompiling(true);
    setStatus({ type: 'compiling', message: '⏳ Generating LaTeX code...' });

    try {
      const code = generateLatex(template, formData);
      setLatexCode(code);
      latexCodeRef.current = code;

      setStatus({ type: 'compiling', message: '⏳ Compiling via LaTeX Online API...' });

      // Use latex.ytotech.com API for compilation
      const response = await fetch('https://latex.ytotech.com/builds/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          compiler: 'pdflatex',
          resources: [
            {
              main: true,
              content: code,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Compilation failed (HTTP ${response.status})`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/pdf')) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        if (pdfUrl) URL.revokeObjectURL(pdfUrl);
        setPdfUrl(url);
        setStatus({ type: 'success', message: '✅ PDF compiled successfully!' });
      } else {
        const text = await response.text();
        throw new Error(text || 'Compilation returned non-PDF response');
      }
    } catch (error: any) {
      console.error(error);
      setStatus({ type: 'error', message: `❌ ${error.message}` });
    } finally {
      setIsCompiling(false);
    }
  }, [template, formData, pdfUrl]);

  const handleDownloadPDF = useCallback(() => {
    if (!pdfUrl) return;
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = `CV_${formData.name.replace(/\s+/g, '_')}.pdf`;
    a.click();
  }, [pdfUrl, formData.name]);

  const handleDownloadTex = useCallback(() => {
    if (!latexCode) return;
    const blob = new Blob([latexCode], { type: 'text/x-tex' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CV_${formData.name.replace(/\s+/g, '_')}.tex`;
    a.click();
    URL.revokeObjectURL(url);
  }, [latexCode, formData.name]);

  const handleOpenOverleaf = useCallback(() => {
    if (!latexCode) return;
    const form = document.createElement('form');
    form.action = 'https://www.overleaf.com/docs';
    form.method = 'POST';
    form.target = '_blank';
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'snip';
    input.value = latexCode;
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  }, [latexCode]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-gradient-to-r from-secondary to-card px-6 py-5">
        <div className="mx-auto flex max-w-[1600px] items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
            <FileText size={20} className="text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">LaTeX CV Generator</h1>
            <p className="text-xs text-muted-foreground">Generate & preview professional CVs with real-time LaTeX compilation</p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-[420px_1fr]" style={{ minHeight: 'calc(100vh - 80px)' }}>
        {/* Form side */}
        <div className="overflow-y-auto border-r border-border bg-card/50 p-5 scrollbar-thin" style={{ maxHeight: 'calc(100vh - 80px)' }}>
          <div className="mb-4 rounded-lg border border-border bg-card p-4">
            <h3 className="mb-3 text-sm font-semibold text-primary">🎨 Select Template</h3>
            <TemplateSelector selected={template} onSelect={setTemplate} />
          </div>
          <CVForm data={formData} onChange={setFormData} />
        </div>

        {/* Preview side */}
        <div className="p-5" style={{ maxHeight: 'calc(100vh - 80px)', overflow: 'hidden' }}>
          <PreviewPanel
            latexCode={latexCode}
            isCompiling={isCompiling}
            status={status}
            pdfUrl={pdfUrl}
            onCompile={handleCompile}
            onDownloadPDF={handleDownloadPDF}
            onDownloadTex={handleDownloadTex}
            onOpenOverleaf={handleOpenOverleaf}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
