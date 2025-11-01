import React from 'react';
import { cn } from '@/shared/utils/cn';

export interface BlogPostContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any; // Portable Text from Sanity (typed as any for flexibility)
  className?: string;
}

export const BlogPostContent: React.FC<BlogPostContentProps> = ({ content: _content, className }) => {
  // For now, we'll render a placeholder. In the real implementation with Sanity,
  // this would use @portabletext/react to render the rich text content.
  // The content parameter is prefixed with _ to indicate it's intentionally unused for now
  
  return (
    <div className={cn('prose prose-lg max-w-none', className)}>
      {/* Temporary mock content for demonstration */}
      <div className="space-y-6 text-[#1A1A1A]">
        <p className="text-[18px] leading-relaxed text-[#666666]">
          This is where the rich blog post content would be rendered using Sanity&apos;s Portable Text format.
          When integrated with Sanity CMS, this component will use @portabletext/react to render:
        </p>

        <ul className="space-y-3 text-[16px] text-[#666666] list-disc list-inside">
          <li>Rich text formatting (bold, italic, underline)</li>
          <li>Headings and subheadings</li>
          <li>Images with captions</li>
          <li>Code blocks with syntax highlighting</li>
          <li>Block quotes</li>
          <li>Bullet and numbered lists</li>
          <li>Embedded media (videos, tweets, etc.)</li>
        </ul>

        <h2 className="font-display text-[32px] font-semibold text-[#1A1A1A] mt-12 mb-6">
          Example Heading
        </h2>

        <p className="text-[16px] leading-relaxed text-[#666666]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt 
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
          laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        <blockquote className="border-l-4 border-[#D4AF37] pl-6 py-4 my-8 bg-[#FAFAFA] rounded-r-2xl">
          <p className="text-[18px] italic text-[#666666]">
            &ldquo;Innovation distinguishes between a leader and a follower.&rdquo;
          </p>
          <footer className="text-[14px] text-[#999999] mt-2">&mdash; Steve Jobs</footer>
        </blockquote>

        <h3 className="font-display text-[24px] font-semibold text-[#1A1A1A] mt-10 mb-4">
          Subheading Example
        </h3>

        <p className="text-[16px] leading-relaxed text-[#666666]">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
          deserunt mollit anim id est laborum.
        </p>

        <div className="bg-[#1A1A1A] rounded-2xl p-6 my-8 overflow-x-auto">
          <pre className="text-[#E5C558] text-[14px] font-mono">
            <code>{`// Example code block
function innovate() {
  return "Build something amazing!";
}`}</code>
          </pre>
        </div>

        <p className="text-[16px] leading-relaxed text-[#666666]">
          This content structure will automatically be replaced when you connect to Sanity CMS 
          and use the PortableText component to render the actual blog content.
        </p>
      </div>
    </div>
  );
};

