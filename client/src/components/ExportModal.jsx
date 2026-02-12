import React, { useState } from 'react';
import { X, Download, Copy, Check } from 'lucide-react';
import { exportAsText, exportAsMarkdown, downloadFile } from '../utils/exportUtils';

const ExportModal = ({ specification, onClose }) => {
  const [format, setFormat] = useState('markdown');
  const [copied, setCopied] = useState(false);

  const getExportContent = () => {
    if (format === 'markdown') {
      return exportAsMarkdown(specification);
    }
    return exportAsText(specification);
  };

  const handleCopy = async () => {
    const content = getExportContent();
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    const content = getExportContent();
    const extension = format === 'markdown' ? 'md' : 'txt';
    const filename = `specification-${Date.now()}.${extension}`;
    const mimeType = format === 'markdown' ? 'text/markdown' : 'text/plain';
    downloadFile(content, filename, mimeType);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Export Specification</h2>
          <button onClick={onClose} className="btn-icon">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="export-format-selector">
            <label className="radio-label">
              <input
                type="radio"
                value="markdown"
                checked={format === 'markdown'}
                onChange={(e) => setFormat(e.target.value)}
              />
              <span>Markdown (.md)</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                value="text"
                checked={format === 'text'}
                onChange={(e) => setFormat(e.target.value)}
              />
              <span>Plain Text (.txt)</span>
            </label>
          </div>

          <div className="export-preview">
            <pre>{getExportContent()}</pre>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={handleCopy} className="btn btn-secondary">
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </button>
          <button onClick={handleDownload} className="btn btn-primary">
            <Download size={18} />
            Download File
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;