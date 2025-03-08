import React from 'react';
import { Bold, Italic, List, ListOrdered, Link, Image as ImageIcon, Code, Type, LayoutPanelTop } from 'lucide-react';

const MarkdownEditor = ({ content, onChange, previewMode, setPreviewMode, disabled }) => {
  // Insert markdown formatting at cursor position or around selected text
  const insertFormatting = (format) => {
    const textarea = document.getElementById('markdown-editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let formattedText = '';
    let newCursorPos = end;
    
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText || 'bold text'}**`;
        newCursorPos = start + formattedText.length;
        if (!selectedText) newCursorPos = start + 2;
        break;
      case 'italic':
        formattedText = `*${selectedText || 'italic text'}*`;
        newCursorPos = start + formattedText.length;
        if (!selectedText) newCursorPos = start + 1;
        break;
      case 'h2':
        formattedText = `\n## ${selectedText || 'Heading'}\n`;
        newCursorPos = start + formattedText.length;
        if (!selectedText) newCursorPos = start + 4;
        break;
      case 'h3':
        formattedText = `\n### ${selectedText || 'Subheading'}\n`;
        newCursorPos = start + formattedText.length;
        if (!selectedText) newCursorPos = start + 5;
        break;
      case 'ul':
        formattedText = `\n- ${selectedText || 'List item'}\n`;
        newCursorPos = start + formattedText.length;
        if (!selectedText) newCursorPos = start + 3;
        break;
      case 'ol':
        formattedText = `\n1. ${selectedText || 'List item'}\n`;
        newCursorPos = start + formattedText.length;
        if (!selectedText) newCursorPos = start + 4;
        break;
      case 'link':
        formattedText = `[${selectedText || 'link text'}](https://example.com)`;
        newCursorPos = start + formattedText.length;
        if (!selectedText) newCursorPos = start + 11;
        break;
      case 'image':
        formattedText = `![${selectedText || 'alt text'}](https://example.com/image.jpg)`;
        newCursorPos = start + formattedText.length;
        if (!selectedText) newCursorPos = start + 11;
        break;
      case 'code':
        if (selectedText.includes('\n')) {
          formattedText = `\n\`\`\`\n${selectedText || 'code block'}\n\`\`\`\n`;
        } else {
          formattedText = `\`${selectedText || 'inline code'}\``;
        }
        newCursorPos = start + formattedText.length;
        if (!selectedText) newCursorPos = start + (formattedText.includes('\n') ? 5 : 1);
        break;
      default:
        formattedText = selectedText;
    }
    
    const newText = content.substring(0, start) + formattedText + content.substring(end);
    onChange(newText);
    
    // Set cursor position after a short delay to allow React to update
    setTimeout(() => {
      textarea.focus();
      if (selectedText) {
        textarea.setSelectionRange(start, start + formattedText.length);
      } else {
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 10);
  };

  const renderPreview = () => {
    if (!content) {
      return <div className="text-gray-500 dark:text-gray-400 italic">No content to preview</div>;
    }
    
    // Basic markdown rendering (in real app, use a markdown library)
    let html = content
      // Headers
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      // Images
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2" class="my-2 max-w-full h-auto rounded" />')
      // Lists
      .replace(/^\s*\- (.*$)/gm, '<li>$1</li>')
      .replace(/^\s*\d+\. (.*$)/gm, '<li>$1</li>')
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto my-2">$1</pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">$1</code>')
      // Paragraphs
      .replace(/\n\n(.*?)\n\n/g, '<p>$1</p>');
    
    return <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: html }} />;
  };

  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600 p-2 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={() => insertFormatting('bold')}
            disabled={disabled || previewMode}
            className="p-1.5 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600 rounded"
            title="Bold"
          >
            <Bold size={16} />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting('italic')}
            disabled={disabled || previewMode}
            className="p-1.5 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600 rounded"
            title="Italic"
          >
            <Italic size={16} />
          </button>
          <span className="border-r border-gray-300 dark:border-gray-600 h-6 mx-1"></span>
          <button
            type="button"
            onClick={() => insertFormatting('h2')}
            disabled={disabled || previewMode}
            className="p-1.5 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600 rounded"
            title="Heading"
          >
            <Type size={16} />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting('h3')}
            disabled={disabled || previewMode}
            className="p-1.5 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600 rounded"
            title="Subheading"
          >
            <Type size={14} />
          </button>
          <span className="border-r border-gray-300 dark:border-gray-600 h-6 mx-1"></span>
          <button
            type="button"
            onClick={() => insertFormatting('ul')}
            disabled={disabled || previewMode}
            className="p-1.5 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600 rounded"
            title="Bulleted List"
          >
            <List size={16} />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting('ol')}
            disabled={disabled || previewMode}
            className="p-1.5 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600 rounded"
            title="Numbered List"
          >
            <ListOrdered size={16} />
          </button>
          <span className="border-r border-gray-300 dark:border-gray-600 h-6 mx-1"></span>
          <button
            type="button"
            onClick={() => insertFormatting('link')}
            disabled={disabled || previewMode}
            className="p-1.5 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600 rounded"
            title="Link"
          >
            <Link size={16} />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting('image')}
            disabled={disabled || previewMode}
            className="p-1.5 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600 rounded"
            title="Image"
          >
            <ImageIcon size={16} />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting('code')}
            disabled={disabled || previewMode}
            className="p-1.5 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600 rounded"
            title="Code"
          >
            <Code size={16} />
          </button>
        </div>

        <div>
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            disabled={disabled}
            className={`p-1.5 flex items-center text-sm rounded ${
              previewMode
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                : 'text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
            title={previewMode ? "Edit" : "Preview"}
          >
            <LayoutPanelTop size={16} className="mr-1" />
            {previewMode ? "Edit" : "Preview"}
          </button>
        </div>
      </div>

      {/* Editor / Preview */}
      <div className="min-h-[300px]">
        {previewMode ? (
          <div className="p-4 min-h-[300px] bg-white dark:bg-gray-800 overflow-y-auto">
            {renderPreview()}
          </div>
        ) : (
          <textarea
            id="markdown-editor"
            value={content}
            onChange={(e) => onChange(e.target.value)}
            className="w-full min-h-[300px] p-4 focus:outline-none dark:bg-gray-800 dark:text-white resize-y"
            placeholder="Write your content here using Markdown..."
            disabled={disabled}
          />
        )}
      </div>
    </div>
  );
};

export default MarkdownEditor;
