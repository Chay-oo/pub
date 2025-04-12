import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface AdvisoryContentProps {
  content: string;
}

export default function AdvisoryContent({ content }: AdvisoryContentProps) {
  return (
    <div className="prose prose-indigo max-w-none prose-headings:text-gray-900 prose-headings:font-semibold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-gray-600 prose-strong:text-gray-900 prose-ul:text-gray-600">
      <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
    </div>
  );
}