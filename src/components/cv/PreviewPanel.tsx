import { useState, useRef, useCallback, useEffect } from 'react';
import { Download, FileText, ExternalLink, Loader2, Zap } from 'lucide-react';

interface PreviewPanelProps {
  latexCode: string;
  isCompiling: boolean;
  status: { type: 'idle' | 'compiling' | 'success' | 'error'; message: string };
  pdfUrl: string | null;
  onCompile: () => void;
  onDownloadPDF: () => void;
  onDownloadTex: () => void;
  onOpenOverleaf: () => void;
}

const PreviewPanel = ({
  latexCode,
  isCompiling,
  status,
  pdfUrl,
  onCompile,
  onDownloadPDF,
  onDownloadTex,
  onOpenOverleaf,
}: PreviewPanelProps) => {
  const [tab, setTab] = useState<'pdf' | 'latex'>('pdf');

  const statusColors = {
    idle: 'text-muted-foreground',
    compiling: 'text-warning',
    success: 'text-success',
    error: 'text-destructive',
  };

  return (
    <div className="flex h-full flex-col">
      {/* Status bar */}
      <div className={`mb-3 rounded-lg bg-secondary px-4 py-2.5 text-sm font-medium ${statusColors[status.type]}`}>
        {status.message}
      </div>

      {/* Compile button */}
      <button
        onClick={onCompile}
        disabled={isCompiling}
        className="mb-3 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent px-4 py-3 text-sm font-bold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50"
      >
        {isCompiling ? <Loader2 size={16} className="animate-spin" /> : <Zap size={16} />}
        {isCompiling ? 'Compiling...' : 'Generate & Compile PDF'}
      </button>

      {/* Tabs */}
      <div className="mb-3 flex gap-2">
        <button
          onClick={() => setTab('pdf')}
          className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
            tab === 'pdf' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
          }`}
        >
          📄 PDF Preview
        </button>
        <button
          onClick={() => setTab('latex')}
          className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
            tab === 'latex' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
          }`}
        >
          📝 LaTeX Code
        </button>
      </div>

      {/* Content */}
      <div className="min-h-0 flex-1 overflow-auto rounded-xl bg-surface p-4 scrollbar-thin">
        {tab === 'pdf' ? (
          pdfUrl ? (
            <iframe src={pdfUrl} className="h-full w-full rounded-lg" style={{ minHeight: '70vh' }} />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <div className="text-center">
                <FileText size={48} className="mx-auto mb-3 opacity-30" />
                <p>PDF will appear here after compilation</p>
                <p className="mt-1 text-xs opacity-60">Click "Generate & Compile PDF" to start</p>
              </div>
            </div>
          )
        ) : (
          <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-foreground">
            {latexCode || 'LaTeX code will appear here after generation.'}
          </pre>
        )}
      </div>

      {/* Action bar */}
      <div className="mt-3 flex gap-2 border-t border-border pt-3">
        <button
          onClick={onDownloadPDF}
          disabled={!pdfUrl}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80 disabled:opacity-40"
        >
          <Download size={14} /> PDF
        </button>
        <button
          onClick={onDownloadTex}
          disabled={!latexCode}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80 disabled:opacity-40"
        >
          <FileText size={14} /> .tex
        </button>
        <button
          onClick={onOpenOverleaf}
          disabled={!latexCode}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80 disabled:opacity-40"
        >
          <ExternalLink size={14} /> Overleaf
        </button>
      </div>
    </div>
  );
};

export default PreviewPanel;
