import React from 'react';

const MarkdownRenderer = ({ content }) => {
  if (!content) return null;
  
  // Simple markdown to HTML conversion
  // In a real app, you would use a proper markdown library
  const renderMarkdown = () => {
    let html = content
      // Headers
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-5 mb-2">$1</h3>')
      .replace(/^#### (.*$)/gm, '<h4 class="text-lg font-bold mt-4 mb-2">$1</h4>')
      
      // Bold & Italic
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">$1</a>')
      
      // Images
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2" class="my-6 max-w-full h-auto rounded-lg shadow-md" />')
      
      // Lists
      .replace(/^\s*-\s+(.*$)/gm, '<li class="ml-4 pl-2">$1</li>')
      .replace(/^\s*\d+\.\s+(.*$)/gm, '<li class="ml-4 pl-2">$1</li>')
      
      // Block quotes
      .replace(/^\>\s+(.*$)/gm, '<blockquote class="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4 text-gray-600 dark:text-gray-400">$1</blockquote>')
      
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto my-4 text-sm"><code>$1</code></pre>')
      
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm">$1</code>')
      
      // Horizontal rule
      .replace(/^\s*---\s*$/gm, '<hr class="my-8 border-t border-gray-300 dark:border-gray-600" />');
    
    // Process unordered lists (wrap li elements in ul)
    html = processListElements(html, 'ul');
    
    // Process ordered lists (wrap li elements in ol)
    html = processListElements(html, 'ol');
    
    // Handle paragraphs
    html = processParagraphs(html);
    
    return html;
  };
  
  // Helper function to process list elements
  const processListElements = (html, listType) => {
    const listClass = listType === 'ul' ? 'list-disc' : 'list-decimal';
    
    // Find consecutive li elements and wrap them in a list container
    const pattern = /<li class="ml-4 pl-2">([\s\S]*?)<\/li>(?:\s*<li class="ml-4 pl-2">([\s\S]*?)<\/li>)*/g;
    
    return html.replace(pattern, (match) => {
      return `<${listType} class="${listClass} ml-6 my-4">${match}</${listType}>`;
    });
  };
  
  // Helper function to process paragraphs
  const processParagraphs = (html) => {
    // Split by double newlines
    const blocks = html.split(/\n\n+/);
    
    // Process each block
    return blocks.map(block => {
      // Skip blocks that already have HTML tags
      if (block.trim().startsWith('<') && !block.trim().startsWith('<li')) {
        return block;
      }
      
      // Skip empty blocks
      if (!block.trim()) {
        return '';
      }
      
      // Wrap other blocks in paragraph tags
      return `<p class="my-4 text-gray-700 dark:text-gray-300">${block.trim()}</p>`;
    }).join('\n');
  };

  return (
    <div 
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: renderMarkdown() }}
    />
  );
};

export default MarkdownRenderer;
