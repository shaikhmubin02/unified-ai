import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

export const useMarkdownProcessor = (content: string) => {
  return useMemo(() => {
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // You can customize components here if needed
          a: ({ node, ...props }) => <a target="_blank" rel="noopener noreferrer" {...props} />,
          // Add more custom components as needed
        }}
      >
        {content}
      </ReactMarkdown>
    );
  }, [content]);
};