import { Download, FileText, Loader2, Zap } from 'lucide-react';

interface PreviewPanelProps {
  isCompiling: boolean;
  status: { type: 'idle' | 'compiling' | 'success' | 'error'; message: string };
  pdfUrl: string | null;
  onCompile: () => void;
  onDownloadPDF: () => void;
}

const PreviewPanel = ({
  isCompiling,
  status,
  pdfUrl,
  onCompile,
  onDownloadPDF,
}: PreviewPanelProps) => {
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

      {/* PDF Preview */}
      <div className="min-h-0 flex-1 overflow-auto rounded-xl bg-surface p-1 scrollbar-thin">
        {pdfUrl ? (
          <iframe
            src={`${pdfUrl}#toolbar=0`}
            className="h-full w-full rounded-lg border-0"
            style={{ minHeight: '70vh' }}
            title="PDF Preview"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <div className="text-center">
              <FileText size={48} className="mx-auto mb-3 opacity-30" />
              <p>PDF will appear here after compilation</p>
              <p className="mt-1 text-xs opacity-60">Click "Generate & Compile PDF" to start</p>
            </div>
          </div>
        )}
      </div>

      {/* Download button */}
      <div className="mt-3 border-t border-border pt-3">
        <button
          onClick={onDownloadPDF}
          disabled={!pdfUrl}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80 disabled:opacity-40"
        >
          <Download size={14} /> Download PDF
        </button>
      </div>
    </div>
  );
};

export default PreviewPanel;
