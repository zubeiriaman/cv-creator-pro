import { Download, FileText, Loader2, Zap } from 'lucide-react';

interface PreviewPanelProps {
  isCompiling: boolean;
  pdfUrl: string | null;
  onCompile: () => void;
  onDownloadPDF: () => void;
}

const PreviewPanel = ({
  isCompiling,
  pdfUrl,
  onCompile,
  onDownloadPDF,
}: PreviewPanelProps) => {
  return (
    <div className="flex h-full flex-col">
      {/* Compile button */}
      <button
        onClick={onCompile}
        disabled={isCompiling}
        className="mb-3 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent px-4 py-3 text-sm font-bold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50"
      >
        {isCompiling ? <Loader2 size={16} className="animate-spin" /> : <Zap size={16} />}
        {isCompiling ? 'Generating PDF...' : 'Generate PDF'}
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
              <p className="text-sm">Your PDF preview will appear here</p>
              <p className="mt-1 text-xs opacity-60">Click "Generate PDF" to get started</p>
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
