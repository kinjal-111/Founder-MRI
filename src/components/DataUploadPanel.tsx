import { useCallback, useState } from 'react';
import { Upload, FileCheck, AlertCircle, X } from 'lucide-react';
import type { UploadedFile } from '@/lib/mockData';

const platformLabels: Record<string, string> = {
  bank: 'Bank Statement',
  shopify: 'Shopify Sales',
  amazon: 'Amazon Seller',
  meta_ads: 'Meta Ads',
  google_ads: 'Google Ads',
};

interface FileUploadZoneProps {
  platform: UploadedFile['platform'];
  file: UploadedFile | null;
  onUpload: (file: UploadedFile) => void;
  onRemove: () => void;
}

const FileUploadZone = ({ platform, file, onUpload, onRemove }: FileUploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const f = e.dataTransfer.files[0];
      if (f) {
        onUpload({
          name: f.name,
          platform,
          rows: Math.floor(Math.random() * 500) + 100,
          status: 'ready',
        });
      }
    },
    [platform, onUpload]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) {
        onUpload({
          name: f.name,
          platform,
          rows: Math.floor(Math.random() * 500) + 100,
          status: 'ready',
        });
      }
    },
    [platform, onUpload]
  );

  if (file) {
    return (
      <div className="bg-surface-2 border border-border rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileCheck className="w-5 h-5 text-success" />
          <div>
            <p className="text-sm font-medium text-foreground">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              {platformLabels[platform]} · {file.rows} rows
            </p>
          </div>
        </div>
        <button onClick={onRemove} className="text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <label
      className={`block cursor-pointer border-2 border-dashed rounded-lg p-6 text-center transition-all ${
        isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground'
      }`}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
      <p className="text-sm font-medium text-foreground">{platformLabels[platform]}</p>
      <p className="text-xs text-muted-foreground mt-1">Drop CSV or click to browse</p>
      <input type="file" accept=".csv" className="hidden" onChange={handleFileInput} />
    </label>
  );
};

interface DataUploadPanelProps {
  files: Record<string, UploadedFile | null>;
  onUpload: (platform: string, file: UploadedFile) => void;
  onRemove: (platform: string) => void;
  onAnalyze: () => void;
}

const DataUploadPanel = ({ files, onUpload, onRemove, onAnalyze }: DataUploadPanelProps) => {
  const platforms: UploadedFile['platform'][] = ['bank', 'shopify', 'amazon', 'meta_ads', 'google_ads'];
  const uploadedCount = Object.values(files).filter(Boolean).length;

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Data Sources</h3>
          <p className="text-sm text-muted-foreground">{uploadedCount}/5 files uploaded</p>
        </div>
        {uploadedCount > 0 && (
          <button
            onClick={onAnalyze}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Analyze →
          </button>
        )}
      </div>
      <div className="grid gap-3">
        {platforms.map((p) => (
          <FileUploadZone
            key={p}
            platform={p}
            file={files[p] ?? null}
            onUpload={(f) => onUpload(p, f)}
            onRemove={() => onRemove(p)}
          />
        ))}
      </div>
      {uploadedCount === 0 && (
        <div className="mt-4 p-3 bg-surface-2 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground">
            Upload at least one data source to generate risk analysis. For best results, include bank statements and sales data.
          </p>
        </div>
      )}
    </div>
  );
};

export default DataUploadPanel;
