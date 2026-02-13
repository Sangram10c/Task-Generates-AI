import React, { useState } from "react";
import { X, Download, Copy, Check, FileText, FileCode } from "lucide-react";
import {
  exportAsText,
  exportAsMarkdown,
  downloadFile,
} from "../utils/exportUtils";

const ExportModal = ({ specification, onClose }) => {
  const [format, setFormat] = useState("markdown");
  const [copied, setCopied] = useState(false);

  const getExportContent = () => {
    if (format === "markdown") {
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
      console.error("Failed to copy:", err);
    }
  };

  const handleDownload = () => {
    const content = getExportContent();
    const extension = format === "markdown" ? "md" : "txt";
    const filename = `specification-${Date.now()}.${extension}`;
    const mimeType = format === "markdown" ? "text/markdown" : "text/plain";
    downloadFile(content, filename, mimeType);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="glass rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500">
              <Download className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold gradient-text">
              Export Specification
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Format Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700">
              Export Format
            </label>
            <div className="grid grid-cols-2 gap-4">
              <FormatOption
                active={format === "markdown"}
                onClick={() => setFormat("markdown")}
                icon={<FileCode className="w-5 h-5" />}
                title="Markdown"
                description="Perfect for GitHub, wikis, and documentation"
                extension=".md"
              />
              <FormatOption
                active={format === "text"}
                onClick={() => setFormat("text")}
                icon={<FileText className="w-5 h-5" />}
                title="Plain Text"
                description="Simple text format for emails and notes"
                extension=".txt"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700">
              Preview
            </label>
            <div className="bg-slate-900 rounded-xl p-6 max-h-[400px] overflow-y-auto">
              <pre className="text-slate-100 text-sm font-mono whitespace-pre-wrap break-words">
                {getExportContent()}
              </pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-slate-200">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl font-semibold text-slate-700 transition-all duration-200"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                <span>Copy to Clipboard</span>
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Download className="w-5 h-5" />
            <span>Download File</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const FormatOption = ({
  active,
  onClick,
  icon,
  title,
  description,
  extension,
}) => (
  <button
    onClick={onClick}
    className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${
      active
        ? "border-primary-500 bg-primary-50 shadow-lg scale-105"
        : "border-slate-200 hover:border-primary-300 hover:shadow-md"
    }`}
  >
    <div className="flex items-start space-x-3">
      <div
        className={`p-2 rounded-lg ${
          active ? "bg-primary-500 text-white" : "bg-slate-100 text-slate-600"
        }`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <h3 className="font-semibold text-slate-800">{title}</h3>
          <span className="text-xs font-mono text-slate-500">{extension}</span>
        </div>
        <p className="text-xs text-slate-600">{description}</p>
      </div>
      {active && (
        <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center animate-scale-in">
          <Check className="w-3 h-3 text-white" />
        </div>
      )}
    </div>
  </button>
);

export default ExportModal;
