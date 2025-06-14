import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';

const TopicContent = ({ darkMode, setDarkMode }) => {
  const { slug } = useParams();
  const { currentUser } = useAuth();
  const [topic, setTopic] = useState(null);
  const [subtopics, setSubtopics] = useState([]);
  const [activeSubtopic, setActiveSubtopic] = useState(null);
  const [activeHeading, setActiveHeading] = useState(null);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('both'); // 'both', 'notes', 'content'
  const [saveStatus, setSaveStatus] = useState('idle');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [navigationItems, setNavigationItems] = useState([]);
  const [expandedAccordions, setExpandedAccordions] = useState(new Set());
  const [contentWidth, setContentWidth] = useState(60); // percentage
  const [isDragging, setIsDragging] = useState(false);

  // Multiple pages for notes
  const [pages, setPages] = useState(['Page 1']);
  const [activePage, setActivePage] = useState('Page 1');
  const [pageNotes, setPageNotes] = useState({ 'Page 1': '' });

  const autoSaveTimerRef = useRef(null);
  const subtopicRefs = useRef({});
  const headingRefs = useRef({});
  const contentContainerRef = useRef(null);
  const resizerRef = useRef(null);

  // Dark mode classes
  const bgColor = darkMode ? 'bg-gray-900' : 'bg-gray-100';
  const textColor = darkMode ? 'text-gray-200' : 'text-gray-800';
  const cardBgColor = darkMode ? 'bg-gray-800' : 'bg-white';
  const sidebarBgColor = darkMode
    ? 'bg-gray-800 border-gray-700'
    : 'bg-gray-100 border-gray-200';

  // Rich text editor modules configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      [{ color: [] }, { background: [] }],
      ['link'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'color',
    'background',
  ];

  // Enhanced heading extraction to support H2 and H3 with hierarchy
  const extractHeadings = (content) => {
    if (!content) return [];

    const headings = [];

    // Split content by H2 sections to properly identify hierarchy
    if (content.includes('##')) {
      const sections = content
        .split(/(?=^## )/gm)
        .filter((section) => section.trim());

      sections.forEach((section, sectionIndex) => {
        const lines = section.trim().split('\n');

        // Find H2 heading
        const h2Line = lines.find((line) => line.startsWith('## '));
        if (h2Line) {
          const h2Text = h2Line.replace(/^## /, '').trim();
          const h2Id = `heading-h2-${sectionIndex}`;

          headings.push({
            id: h2Id,
            text: h2Text,
            originalText: h2Text,
            level: 2,
            type: 'h2',
          });

          // Find H3 headings within this section
          let h3Index = 0;
          lines.forEach((line) => {
            if (line.startsWith('### ')) {
              const h3Text = line.replace(/^### /, '').trim();
              headings.push({
                id: `heading-h3-${sectionIndex}-${h3Index}`,
                text: h3Text,
                originalText: h3Text,
                level: 3,
                type: 'h3',
                parentH2: h2Id,
              });
              h3Index++;
            }
          });
        }
      });
    }

    return headings;
  };

  // Enhanced navigation generation with hierarchical structure - INCLUDES H2 AND H3
  const generateNavigationItems = (subtopicsData) => {
    const items = [];

    subtopicsData.forEach((subtopic) => {
      const subtopicData = subtopic.attributes || subtopic;

      // Extract and add headings with hierarchy
      const headings = extractHeadings(subtopicData.content);

      headings.forEach((heading) => {
        items.push({
          id: `subtopic-${subtopic.id}-${heading.id}`,
          text: heading.text,
          type: heading.type,
          subtopicId: subtopic.id,
          headingId: heading.id,
          level: heading.level === 2 ? 0 : 1, // H2 = level 0, H3 = level 1
          parentH2: heading.parentH2
            ? `subtopic-${subtopic.id}-${heading.parentH2}`
            : null,
        });
      });
    });

    return items;
  };

  // Enhanced scroll function
  const scrollToItem = (item) => {
    const headingKey = `subtopic-${item.subtopicId}-${item.headingId}`;

    // Expand the accordion if it's an H2 or if H3's parent H2 needs to be expanded
    if (item.type === 'h2') {
      setExpandedAccordions((prev) => new Set([...prev, headingKey]));
    } else if (item.type === 'h3' && item.parentH2) {
      setExpandedAccordions((prev) => new Set([...prev, item.parentH2]));
    }

    // Small delay to allow accordion to expand
    setTimeout(() => {
      const element = headingRefs.current[headingKey];

      if (element && contentContainerRef.current) {
        const container = contentContainerRef.current;
        const elementTop = element.offsetTop;
        const containerHeight = container.clientHeight;
        const scrollPosition =
          elementTop - containerHeight / 2 + element.clientHeight / 2;

        container.scrollTo({
          top: Math.max(0, scrollPosition),
          behavior: 'smooth',
        });

        setActiveSubtopic(item.subtopicId);
        setActiveHeading(headingKey);
      }
    }, 100);
  };

  // Function to toggle accordion
  const toggleAccordion = (accordionId) => {
    setExpandedAccordions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(accordionId)) {
        newSet.delete(accordionId);
      } else {
        newSet.add(accordionId);
      }
      return newSet;
    });
  };

  // Strapi-compatible markdown components - matches Strapi's exact styling
  const strapiMarkdownComponents = {
    // Paragraphs - Strapi default styling
    p: ({ children, ...props }) => (
      <p 
        style={{
          fontSize: '14px',
          lineHeight: '1.6',
          marginBottom: '16px',
          color: darkMode ? '#f1f5f9' : '#32324d',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'
        }}
        {...props}
      >
        {children}
      </p>
    ),

    // Headings - Strapi default styling
    h1: ({ children, ...props }) => (
      <h1 
        style={{
          fontSize: '32px',
          fontWeight: '700',
          lineHeight: '1.25',
          marginBottom: '16px',
          marginTop: '32px',
          color: darkMode ? '#f1f5f9' : '#32324d',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'
        }}
        {...props}
      >
        {children}
      </h1>
    ),

    h2: ({ children, ...props }) => (
      <h2 
        style={{
          fontSize: '24px',
          fontWeight: '600',
          lineHeight: '1.33',
          marginBottom: '12px',
          marginTop: '24px',
          color: darkMode ? '#f1f5f9' : '#32324d',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'
        }}
        {...props}
      >
        {children}
      </h2>
    ),

    h3: ({ children, ...props }) => (
      <h3 
        style={{
          fontSize: '20px',
          fontWeight: '600',
          lineHeight: '1.4',
          marginBottom: '8px',
          marginTop: '20px',
          color: darkMode ? '#f1f5f9' : '#32324d',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'
        }}
        {...props}
      >
        {children}
      </h3>
    ),

    h4: ({ children, ...props }) => (
      <h4 
        style={{
          fontSize: '18px',
          fontWeight: '600',
          lineHeight: '1.44',
          marginBottom: '8px',
          marginTop: '16px',
          color: darkMode ? '#f1f5f9' : '#32324d',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'
        }}
        {...props}
      >
        {children}
      </h4>
    ),

    h5: ({ children, ...props }) => (
      <h5 
        style={{
          fontSize: '16px',
          fontWeight: '600',
          lineHeight: '1.5',
          marginBottom: '8px',
          marginTop: '16px',
          color: darkMode ? '#f1f5f9' : '#32324d',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'
        }}
        {...props}
      >
        {children}
      </h5>
    ),

    h6: ({ children, ...props }) => (
      <h6 
        style={{
          fontSize: '14px',
          fontWeight: '600',
          lineHeight: '1.57',
          marginBottom: '8px',
          marginTop: '12px',
          color: darkMode ? '#f1f5f9' : '#32324d',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'
        }}
        {...props}
      >
        {children}
      </h6>
    ),

    // Strong/Bold - Strapi styling
    strong: ({ children, ...props }) => (
      <strong 
        style={{
          fontWeight: '700',
          color: darkMode ? '#f1f5f9' : '#32324d'
        }}
        {...props}
      >
        {children}
      </strong>
    ),

    // Emphasis/Italic - Strapi styling
    em: ({ children, ...props }) => (
      <em 
        style={{
          fontStyle: 'italic',
          color: darkMode ? '#f1f5f9' : '#32324d'
        }}
        {...props}
      >
        {children}
      </em>
    ),

    // Lists - Strapi styling
    ul: ({ children, ...props }) => (
      <ul 
        style={{
          paddingLeft: '24px',
          marginBottom: '16px',
          listStyleType: 'disc',
          color: darkMode ? '#f1f5f9' : '#32324d'
        }}
        {...props}
      >
        {children}
      </ul>
    ),

    ol: ({ children, ...props }) => (
      <ol 
        style={{
          paddingLeft: '24px',
          marginBottom: '16px',
          listStyleType: 'decimal',
          color: darkMode ? '#f1f5f9' : '#32324d'
        }}
        {...props}
      >
        {children}
      </ol>
    ),

    li: ({ children, ...props }) => (
      <li 
        style={{
          fontSize: '14px',
          lineHeight: '1.6',
          marginBottom: '4px',
          color: darkMode ? '#f1f5f9' : '#32324d',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'
        }}
        {...props}
      >
        {children}
      </li>
    ),

    // Blockquotes - Strapi styling
    blockquote: ({ children, ...props }) => (
      <blockquote 
        style={{
          borderLeft: '4px solid #4945ff',
          paddingLeft: '16px',
          marginLeft: '0',
          marginRight: '0',
          marginBottom: '16px',
          backgroundColor: darkMode ? 'rgba(73, 69, 255, 0.1)' : 'rgba(73, 69, 255, 0.05)',
          padding: '16px',
          borderRadius: '4px',
          fontStyle: 'italic',
          color: darkMode ? '#f1f5f9' : '#32324d'
        }}
        {...props}
      >
        {children}
      </blockquote>
    ),

    // Code - Strapi styling
    code: ({ inline, children, ...props }) => {
      if (inline) {
        return (
          <code
            style={{
              backgroundColor: darkMode ? '#1e1e2e' : '#f6f6f9',
              border: darkMode ? '1px solid #32324d' : '1px solid #dcdce4',
              borderRadius: '4px',
              padding: '2px 6px',
              fontSize: '13px',
              fontFamily: '"Fira Code", "SF Mono", Monaco, Inconsolata, "Roboto Mono", Consolas, "Andale Mono", monospace',
              color: darkMode ? '#f1f5f9' : '#32324d'
            }}
            {...props}
          >
            {children}
          </code>
        );
      }

      return (
        <code
          style={{
            display: 'block',
            backgroundColor: darkMode ? '#1e1e2e' : '#f6f6f9',
            border: darkMode ? '1px solid #32324d' : '1px solid #dcdce4',
            borderRadius: '4px',
            padding: '16px',
            fontSize: '13px',
            fontFamily: '"Fira Code", "SF Mono", Monaco, Inconsolata, "Roboto Mono", Consolas, "Andale Mono", monospace',
            color: darkMode ? '#f1f5f9' : '#32324d',
            overflowX: 'auto',
            marginBottom: '16px'
          }}
          {...props}
        >
          {children}
        </code>
      );
    },

    // Pre - Strapi styling
    pre: ({ children, ...props }) => (
      <pre
        style={{
          backgroundColor: darkMode ? '#1e1e2e' : '#f6f6f9',
          border: darkMode ? '1px solid #32324d' : '1px solid #dcdce4',
          borderRadius: '4px',
          padding: '16px',
          fontSize: '13px',
          fontFamily: '"Fira Code", "SF Mono", Monaco, Inconsolata, "Roboto Mono", Consolas, "Andale Mono", monospace',
          color: darkMode ? '#f1f5f9' : '#32324d',
          overflowX: 'auto',
          marginBottom: '16px',
          lineHeight: '1.5'
        }}
        {...props}
      >
        {children}
      </pre>
    ),

    // Tables - Strapi styling
    table: ({ children, ...props }) => (
      <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
        <table 
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            border: darkMode ? '1px solid #32324d' : '1px solid #dcdce4',
            borderRadius: '4px',
            fontSize: '14px',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'
          }}
          {...props}
        >
          {children}
        </table>
      </div>
    ),

    thead: ({ children, ...props }) => (
      <thead 
        style={{
          backgroundColor: darkMode ? '#32324d' : '#f6f6f9'
        }}
        {...props}
      >
        {children}
      </thead>
    ),

    tbody: ({ children, ...props }) => (
      <tbody {...props}>
        {children}
      </tbody>
    ),

    tr: ({ children, ...props }) => (
      <tr 
        style={{
          borderBottom: darkMode ? '1px solid #32324d' : '1px solid #dcdce4'
        }}
        {...props}
      >
        {children}
      </tr>
    ),

    th: ({ children, ...props }) => (
      <th 
        style={{
          padding: '12px 16px',
          textAlign: 'left',
          fontWeight: '600',
          color: darkMode ? '#f1f5f9' : '#32324d',
          borderBottom: darkMode ? '1px solid #32324d' : '1px solid #dcdce4',
          backgroundColor: darkMode ? '#32324d' : '#f6f6f9'
        }}
        {...props}
      >
        {children}
      </th>
    ),

    td: ({ children, ...props }) => (
      <td 
        style={{
          padding: '12px 16px',
          color: darkMode ? '#f1f5f9' : '#32324d',
          borderBottom: darkMode ? '1px solid #32324d' : '1px solid #dcdce4'
        }}
        {...props}
      >
        {children}
      </td>
    ),

    // Links - Strapi styling
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: '#4945ff',
          textDecoration: 'underline',
          fontWeight: '500'
        }}
        {...props}
      >
        {children}
      </a>
    ),

    // Images - Strapi styling
    img: ({ src, alt, ...props }) => (
      <img
        src={src}
        alt={alt}
        style={{
          maxWidth: '100%',
          height: 'auto',
          borderRadius: '4px',
          marginBottom: '16px'
        }}
        {...props}
      />
    ),

    // Horizontal Rule - Strapi styling
    hr: ({ ...props }) => (
      <hr 
        style={{
          border: 'none',
          borderTop: darkMode ? '1px solid #32324d' : '1px solid #dcdce4',
          margin: '24px 0'
        }}
        {...props}
      />
    ),

    // Strikethrough - Strapi styling
    del: ({ children, ...props }) => (
      <del 
        style={{
          textDecoration: 'line-through',
          opacity: 0.7
        }}
        {...props}
      >
        {children}
      </del>
    ),
  };

  // Function to render content with accordions using Strapi styling
  const renderContentWithAccordions = (content, subtopicId) => {
    if (!content) return null;

    if (!content.includes('##')) {
      return (
        <div className="strapi-content">
          <ReactMarkdown
            components={strapiMarkdownComponents}
            remarkPlugins={[remarkGfm, remarkBreaks]}
            rehypePlugins={[rehypeRaw]}
          >
            {content}
          </ReactMarkdown>
        </div>
      );
    }

    // Split content by H2 headings while preserving the headings
    const sections = content
      .split(/(?=^## )/gm)
      .filter((section) => section.trim());

    return sections.map((section, index) => {
      const lines = section.trim().split('\n');
      const h2Line = lines[0];

      if (!h2Line.startsWith('## ')) return null;

      const title = h2Line.replace(/^## /, '').trim();
      const isHighYield = title.toLowerCase().includes('high-yield');
      const accordionId = `subtopic-${subtopicId}-heading-h2-${index}`;
      const isExpanded = expandedAccordions.has(accordionId);

      // Process the content (everything after the H2)
      let sectionContent = lines.slice(1).join('\n');

      return (
        <div 
          key={accordionId} 
          className="accordion-section"
          data-accordion-id={accordionId}
          style={{
            marginBottom: '16px',
            backgroundColor: darkMode ? '#1e1e2e' : '#ffffff',
            border: darkMode ? '1px solid #32324d' : '1px solid #dcdce4',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 1px 4px rgba(33, 33, 52, 0.1)'
          }}
        >
          <div 
            className={`accordion-header ${isExpanded ? 'expanded' : ''}`}
            id={accordionId}
            data-heading-key={accordionId}
            data-subtopic-id={subtopicId}
            data-heading-level="2"
            onClick={() => toggleAccordion(accordionId)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 20px',
              cursor: 'pointer',
              backgroundColor: darkMode ? '#32324d' : '#f6f6f9',
              borderBottom: isExpanded ? (darkMode ? '1px solid #32324d' : '1px solid #dcdce4') : 'none',
              transition: 'background-color 0.2s ease'
            }}
          >
            <h2 
              style={{
                margin: '0',
                fontSize: '18px',
                fontWeight: '600',
                color: darkMode ? '#f1f5f9' : '#32324d',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
                flex: '1'
              }}
            >
              {title}
            </h2>
            <svg 
              style={{
                width: '20px',
                height: '20px',
                transition: 'transform 0.2s ease',
                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                color: darkMode ? '#8e8ea9' : '#666687',
                flexShrink: '0',
                marginLeft: '16px'
              }}
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
          
          <div 
            className={`accordion-content ${isExpanded ? 'expanded' : ''}`}
            style={{
              maxHeight: isExpanded ? 'none' : '0',
              overflow: 'hidden',
              transition: 'max-height 0.3s ease',
              backgroundColor: darkMode ? '#1e1e2e' : '#ffffff'
            }}
          >
            <div 
              style={{
                padding: '24px 20px'
              }}
            >
              {isHighYield ? (
                <HighYieldSection content={sectionContent} darkMode={darkMode} />
              ) : (
                <div className="strapi-content">
                  <ReactMarkdown
                    components={strapiMarkdownComponents}
                    remarkPlugins={[remarkGfm, remarkBreaks]}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {sectionContent}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    });
  };

  // High-yield section component with Strapi styling
  const HighYieldSection = ({ content, darkMode }) => {
    // Process high-yield content specially
    const processHighYieldPoints = (content) => {
      return content
        .split('\n')
        .filter((line) => line.trim())
        .map((line, index) => {
          if (
            line.trim().startsWith('•') ||
            line.trim().startsWith('-') ||
            line.trim().startsWith('*')
          ) {
            const processedLine = line.replace(/^[\s]*[•\-*]\s*/, '').trim();
            return (
              <li key={index}>
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <span>{children}</span>,
                    strong: ({ children }) => (
                      <strong style={{ fontWeight: '700', color: darkMode ? '#ffffff' : '#5b21b6' }}>
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em style={{ fontStyle: 'italic' }}>
                        {children}
                      </em>
                    ),
                    code: ({ children }) => (
                      <code style={{
                        backgroundColor: darkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.1)',
                        border: darkMode ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid rgba(139, 92, 246, 0.2)',
                        borderRadius: '3px',
                        padding: '1px 4px',
                        fontSize: '12px',
                        fontFamily: '"Fira Code", monospace',
                        color: darkMode ? '#a78bfa' : '#7c3aed'
                      }}>
                        {children}
                      </code>
                    ),
                  }}
                  remarkPlugins={[remarkGfm, remarkBreaks]}
                >
                  {processedLine}
                </ReactMarkdown>
              </li>
            );
          }
          return line.trim() ? (
            <div key={index} style={{ marginBottom: '8px' }}>
              <ReactMarkdown
                components={strapiMarkdownComponents}
                remarkPlugins={[remarkGfm, remarkBreaks]}
              >
                {line.trim()}
              </ReactMarkdown>
            </div>
          ) : null;
        })
        .filter(Boolean);
    };

    const processedPoints = processHighYieldPoints(content);

    return (
      <div 
        style={{
          background: darkMode 
            ? 'linear-gradient(135deg, #20193A 0%, #1a1332 50%, #16102a 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
          borderRadius: '12px',
          padding: '24px',
          margin: '16px 0',
          boxShadow: '0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          border: darkMode ? '1px solid rgba(93, 92, 222, 0.3)' : '2px solid #7c3aed',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div 
          style={{
            color: darkMode ? '#fbbf24' : '#7c3aed',
            fontWeight: '700',
            fontSize: '14px',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            textShadow: darkMode 
              ? '0 1px 2px rgba(0, 0, 0, 0.5)' 
              : '0 1px 2px rgba(124, 58, 237, 0.3)',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'
          }}
        >
          PANCE High-Yield Points
        </div>
        <ul 
          style={{
            listStyle: 'none',
            padding: '0',
            margin: '0'
          }}
        >
          {processedPoints.map((point, index) => (
            <li 
              key={index}
              style={{
                color: darkMode ? '#ffffff' : '#5b21b6',
                fontSize: '14px',
                lineHeight: '1.6',
                marginBottom: '12px',
                paddingLeft: '24px',
                position: 'relative',
                fontWeight: '400',
                textShadow: darkMode ? '0 1px 2px rgba(0, 0, 0, 0.2)' : 'none',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'
              }}
            >
              <span 
                style={{
                  content: '•',
                  position: 'absolute',
                  left: '0',
                  color: darkMode ? '#ffffff' : '#7c3aed',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  top: '0'
                }}
              >
                •
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Add IDs to all headings after rendering
  const addHeadingIds = () => {
    useEffect(() => {
      if (contentContainerRef.current && subtopics.length > 0) {
        headingRefs.current = {};

        subtopics.forEach((subtopic) => {
          const subtopicData = subtopic.attributes || subtopic;
          const headings = extractHeadings(subtopicData.content);

          headings.forEach((heading) => {
            const headingKey = `subtopic-${subtopic.id}-${heading.id}`;
            const element = contentContainerRef.current.querySelector(
              `#${headingKey}, [data-heading-key="${headingKey}"]`
            );
            if (element) {
              headingRefs.current[headingKey] = element;
            }
          });
        });
      }
    }, [subtopics, expandedAccordions]);
  };

  // Add global function for accordion toggle
  useEffect(() => {
    window.toggleAccordion = toggleAccordion;
    return () => {
      delete window.toggleAccordion;
    };
  }, []);

  // Intersection Observer for auto-highlighting active section
  useEffect(() => {
    if (!contentContainerRef.current || navigationItems.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const subtopicId = entry.target.getAttribute('data-subtopic-id');
            const headingKey = entry.target.getAttribute('data-heading-key');

            if (headingKey) {
              setActiveHeading(headingKey);
              setActiveSubtopic(subtopicId);
            } else if (subtopicId) {
              setActiveSubtopic(subtopicId);
              if (entry.target.tagName === 'H1') {
                setActiveHeading(null);
              }
            }
          }
        });
      },
      {
        root: contentContainerRef.current,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.1,
      }
    );

    // Observe all subtopic elements
    Object.values(subtopicRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Observe all heading elements
    Object.values(headingRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [navigationItems, expandedAccordions]);

  // Set up heading refs after content is rendered
  addHeadingIds();

  // Drag functionality for resizer
  const handleMouseDown = (e) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const container = document.querySelector('.content-resizer-container');
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const newWidth = ((e.clientX - rect.left) / rect.width) * 100;

    // Constrain between 30% and 80%
    const constrainedWidth = Math.min(80, Math.max(30, newWidth));
    setContentWidth(constrainedWidth);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  // Fetch topic and subtopics
  useEffect(() => {
    setLoading(true);

    axios
      .get(`${import.meta.env.VITE_API_URL}/topic-content/${slug}`)
      .then((response) => {
        console.log('Topic Response:', response.data);

        if (!response.data.data || response.data.data.length === 0) {
          throw new Error('Topic not found');
        }

        const topicData = response.data.data[0];
        setTopic(topicData);

        // Handle both flattened and nested structures for subtopics
        let subtopicsData = [];
        if (topicData.attributes?.subtopics?.data) {
          subtopicsData = topicData.attributes.subtopics.data;
        } else if (topicData.subtopics?.data) {
          subtopicsData = topicData.subtopics.data;
        } else if (Array.isArray(topicData.subtopics)) {
          subtopicsData = topicData.subtopics;
        } else if (Array.isArray(topicData.attributes?.subtopics)) {
          subtopicsData = topicData.attributes.subtopics;
        }

        console.log('Processed subtopics:', subtopicsData);
        setSubtopics(subtopicsData);

        // Generate navigation items
        const navItems = generateNavigationItems(subtopicsData);
        setNavigationItems(navItems);

        // Set first subtopic as active
        if (subtopicsData.length > 0) {
          setActiveSubtopic(subtopicsData[0].id);
        }

        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching topic:', error);
        if (error.response?.status === 404) {
          setError(
            `Topic "${slug}" not found. Please check the URL or return to the knowledge map.`
          );
        } else {
          setError('Failed to load topic content. Please try again later.');
        }
      })
      .finally(() => setLoading(false));

    // Fetch notes for this topic
    if (currentUser) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/notes`, {
          params: {
            userId: currentUser.id,
            contentId: slug,
            contentType: 'topic',
          },
        })
        .then((response) => {
          try {
            if (response.data.notes) {
              const parsedNotes = JSON.parse(response.data.notes);

              if (
                typeof parsedNotes === 'object' &&
                !Array.isArray(parsedNotes)
              ) {
                setPageNotes(parsedNotes);
                setPages(Object.keys(parsedNotes));
                setActivePage(Object.keys(parsedNotes)[0]);
                setNotes(parsedNotes[Object.keys(parsedNotes)[0]] || '');
                return;
              }
            }

            setNotes(response.data.notes || '');
            setPageNotes({ 'Page 1': response.data.notes || '' });
          } catch (e) {
            setNotes(response.data.notes || '');
            setPageNotes({ 'Page 1': response.data.notes || '' });
          }
        })
        .catch((error) => {
          console.error('Error fetching notes:', error);
        });
    }
  }, [slug, currentUser]);

  // Function to toggle view mode
  const toggleViewMode = () => {
    const modes = ['both', 'content', 'notes'];
    const currentIndex = modes.indexOf(viewMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setViewMode(modes[nextIndex]);
  };

  // Get view mode display name
  const getViewModeDisplay = () => {
    switch (viewMode) {
      case 'both':
        return 'Content & Notes';
      case 'content':
        return 'Content Only';
      case 'notes':
        return 'Notes Only';
      default:
        return 'Content & Notes';
    }
  };

  // Function to add a new page
  const addNewPage = () => {
    const updatedPageNotes = {
      ...pageNotes,
      [activePage]: notes,
    };

    const newPageNum = pages.length + 1;
    const newPageName = `Page ${newPageNum}`;

    setPages((prev) => [...prev, newPageName]);
    setPageNotes(updatedPageNotes);
    setActivePage(newPageName);
    setNotes('');
  };

  // Function to switch between pages
  const switchPage = (pageName) => {
    setPageNotes((prev) => ({
      ...prev,
      [activePage]: notes,
    }));

    setActivePage(pageName);
    setNotes(pageNotes[pageName] || '');
  };

  // Auto-save function
  const autoSaveNotes = async () => {
    if (!currentUser || !hasUnsavedChanges) return;

    try {
      setSaveStatus('saving');

      const updatedPageNotes = {
        ...pageNotes,
        [activePage]: notes,
      };
      setPageNotes(updatedPageNotes);

      const baseUrl = import.meta.env.VITE_API_URL;
      const notesEndpoint = baseUrl.includes('/api')
        ? '/update-notes'
        : '/api/update-notes';

      await axios.post(`${baseUrl}${notesEndpoint}`, {
        userId: currentUser.id,
        contentId: slug,
        contentType: 'topic',
        notes: JSON.stringify(updatedPageNotes),
      });

      setSaveStatus('saved');
      setHasUnsavedChanges(false);

      setTimeout(() => {
        if (setSaveStatus) setSaveStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error auto-saving notes:', error);
      setSaveStatus('error');
    }
  };

  // Trigger auto-save with debounce
  useEffect(() => {
    if (!currentUser || !hasUnsavedChanges) return;

    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    autoSaveTimerRef.current = setTimeout(() => {
      autoSaveNotes();
    }, 2000);

    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [notes, hasUnsavedChanges, currentUser]);

  const saveNotes = async () => {
    if (!currentUser) {
      alert('Please log in to save notes.');
      return;
    }

    try {
      setSaveStatus('saving');

      const updatedPageNotes = {
        ...pageNotes,
        [activePage]: notes,
      };
      setPageNotes(updatedPageNotes);

      const baseUrl = import.meta.env.VITE_API_URL;
      const notesEndpoint = baseUrl.includes('/api')
        ? '/update-notes'
        : '/api/update-notes';

      await axios.post(`${baseUrl}${notesEndpoint}`, {
        userId: currentUser.id,
        contentId: slug,
        contentType: 'topic',
        notes: JSON.stringify(updatedPageNotes),
      });

      setSaveStatus('saved');
      setHasUnsavedChanges(false);

      setTimeout(() => {
        if (setSaveStatus) setSaveStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error saving notes:', error);
      setSaveStatus('error');
      alert(`Failed to save notes: ${error.response?.status || error.message}`);
    }
  };

  const handleNotesChange = (value) => {
    setNotes(value);
    setHasUnsavedChanges(true);
    if (saveStatus === 'saved' || saveStatus === 'error') {
      setSaveStatus('idle');
    }
  };

  // Function to delete a page
  const deletePage = (pageToDelete) => {
    if (pages.length <= 1) return;

    if (!window.confirm(`Are you sure you want to delete ${pageToDelete}?`)) {
      return;
    }

    const newPages = pages.filter((page) => page !== pageToDelete);
    const { [pageToDelete]: deletedNotes, ...remainingNotes } = pageNotes;

    setPages(newPages);
    setPageNotes(remainingNotes);

    if (activePage === pageToDelete) {
      setActivePage(newPages[0]);
      setNotes(remainingNotes[newPages[0]] || '');
    }
  };

  // Render save status indicator
  const renderSaveStatus = () => {
    switch (saveStatus) {
      case 'saving':
        return (
          <div className='flex items-center text-gray-300 text-xs ml-1'>
            <svg
              className='animate-spin h-3 w-3 mr-1 text-blue-500'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              ></path>
            </svg>
            Saving...
          </div>
        );
      case 'saved':
        return (
          <div className='flex items-center text-green-400 text-xs ml-1'>
            <svg
              className='h-3 w-3 mr-1'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M5 13l4 4L19 7'
              ></path>
            </svg>
            Saved
          </div>
        );
      case 'error':
        return (
          <div className='flex items-center text-red-400 text-xs ml-1'>
            <svg
              className='h-3 w-3 mr-1'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              ></path>
            </svg>
            Error saving
          </div>
        );
      default:
        return hasUnsavedChanges ? (
          <div className='text-blue-500 text-xs ml-1'>Unsaved changes</div>
        ) : null;
    }
  };

  if (error) {
    return (
      <div className={`min-h-screen ${bgColor} ${textColor}`}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className='max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-8'>
          <div
            className={`${cardBgColor} p-6 rounded-lg text-center shadow-lg`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-12 w-12 text-red-500 mx-auto mb-3'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
              />
            </svg>
            <h2 className='text-lg font-bold mb-2'>Error</h2>
            <p className='text-red-400 text-sm'>{error}</p>
            <Link
              to='/knowledge-map'
              className='mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md transition text-sm'
            >
              Return to Knowledge Map
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading || !topic) {
    return (
      <div className={`min-h-screen ${bgColor} ${textColor}`}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className='flex justify-center items-center h-48'>
          <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500'></div>
        </div>
      </div>
    );
  }

  // Helper function to get topic data (handle both nested and flattened)
  const getTopicData = (topic) => {
    return topic.attributes || topic;
  };

  const topicData = getTopicData(topic);

  return (
    <div className={`min-h-screen ${bgColor} ${textColor}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Sticky Navigation Bar */}
      <div
        className={`flex justify-between items-center px-3 py-2 ${sidebarBgColor} border-b sticky top-0 z-50 shadow-sm`}
      >
        <Link
          to='/knowledge-map'
          className={`${
            darkMode
              ? 'text-blue-400 hover:text-blue-300'
              : 'text-blue-500 hover:text-blue-600'
          } transition flex items-center text-sm`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-4 w-4 mr-1'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z'
              clipRule='evenodd'
            />
          </svg>
          Back to Knowledge Map
        </Link>

        <div className='flex items-center space-x-3'>
          <button
            onClick={toggleViewMode}
            className={`${
              darkMode
                ? 'bg-indigo-700 hover:bg-indigo-600'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white px-3 py-1 rounded-md text-xs transition flex items-center`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-3 w-3 mr-1'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16m-7 6h7'
              />
            </svg>
            {getViewModeDisplay()}
          </button>

          <Link
            to={`/hippocampus-hustle/${slug}`}
            className={`${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white px-3 py-1 rounded-md flex items-center transition text-xs`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-3 w-3 mr-1'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 10V3L4 14h7v7l9-11h-7z'
              />
            </svg>
            <span className='inline'>Hippocampus Hustle</span>
          </Link>
        </div>
      </div>

      <div className='flex h-[calc(100vh-100px)]'>
        {/* Enhanced Sticky Left Sidebar - Table of Contents */}
        {(viewMode === 'both' || viewMode === 'content') && (
          <div
            className={`w-56 ${sidebarBgColor} border-r overflow-y-auto sticky top-0 h-full`}
          >
            <div className='p-3'>
              <div className='mb-4'>
                <h2 className={`text-base font-bold ${textColor} mb-1`}>
                  {topicData?.name || topicData?.title}
                </h2>
                {topicData?.description && (
                  <p
                    className={`text-xs ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    } mb-3`}
                  >
                    {topicData.description}
                  </p>
                )}
              </div>

              <div>
                <h3
                  className={`text-xs font-semibold ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  } mb-2 uppercase tracking-wide`}
                >
                  Table of Contents
                </h3>

                {navigationItems.length === 0 ? (
                  <p
                    className={`text-xs ${
                      darkMode ? 'text-gray-500' : 'text-gray-600'
                    }`}
                  >
                    No content available
                  </p>
                ) : (
                  <nav className='space-y-1'>
                    {navigationItems.map((item) => {
                      const isActiveHeading = activeHeading === item.id;

                      return (
                        <button
                          key={item.id}
                          onClick={() => scrollToItem(item)}
                          className={`block w-full text-left p-2 rounded transition-all duration-200 ${
                            item.level === 1 ? 'ml-4 text-xs' : 'text-sm'
                          } ${
                            isActiveHeading
                              ? `${
                                  darkMode
                                    ? 'text-blue-400 bg-blue-900/20'
                                    : 'text-blue-600 bg-blue-50'
                                } font-semibold border-l-3 border-blue-500`
                              : `${
                                  darkMode ? 'text-gray-300' : 'text-gray-700'
                                } hover:${
                                  darkMode
                                    ? 'text-blue-400 hover:bg-blue-900/10'
                                    : 'text-blue-600 hover:bg-blue-50'
                                }`
                          }`}
                        >
                          <span>{item.text}</span>
                        </button>
                      );
                    })}
                  </nav>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area with Resizer */}
        <div className='flex-1 flex overflow-hidden content-resizer-container'>
          {/* Scrollable Content Display */}
          {(viewMode === 'both' || viewMode === 'content') && (
            <div
              className={`overflow-y-auto ${
                viewMode === 'both' ? '' : 'w-full'
              }`}
              style={{
                width: viewMode === 'both' ? `${contentWidth}%` : '100%',
              }}
              ref={contentContainerRef}
            >
              <div className='p-4 space-y-0'>
                {subtopics.length === 0 ? (
                  <div
                    className={`text-center mt-16 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-12 w-12 mx-auto mb-3 opacity-50'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={1.5}
                        d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                      />
                    </svg>
                    <h3 className='text-base font-medium mb-2'>
                      No subtopics available
                    </h3>
                    <p className='text-sm'>
                      This topic doesn't have any subtopics yet.
                    </p>
                  </div>
                ) : (
                  subtopics.map((subtopic, index) => {
                    const subtopicData = subtopic.attributes || subtopic;

                    return (
                      <section
                        key={subtopic.id}
                        ref={(el) => (subtopicRefs.current[subtopic.id] = el)}
                        data-subtopic-id={subtopic.id}
                        className={`scroll-mt-6 ${
                          index !== subtopics.length - 1
                            ? 'border-b pb-8 mb-8'
                            : ''
                        } ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}
                      >
                        <h1
                          style={{
                            fontSize: '28px',
                            fontWeight: '700',
                            lineHeight: '1.25',
                            marginBottom: '24px',
                            paddingBottom: '12px',
                            borderBottom: darkMode ? '1px solid #32324d' : '1px solid #dcdce4',
                            color: darkMode ? '#f1f5f9' : '#32324d',
                            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'
                          }}
                        >
                          {subtopicData.title}
                        </h1>
                        <div className="strapi-content">
                          {renderContentWithAccordions(
                            subtopicData.content,
                            subtopic.id
                          )}
                        </div>
                      </section>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* Resizer */}
          {viewMode === 'both' && (
            <div
              ref={resizerRef}
              className={`w-1 ${
                darkMode
                  ? 'bg-gray-600 hover:bg-gray-500'
                  : 'bg-gray-300 hover:bg-gray-400'
              } cursor-col-resize transition-colors flex items-center justify-center relative group`}
              onMouseDown={handleMouseDown}
            >
              <div
                className={`absolute inset-y-0 flex items-center justify-center w-6 ${
                  darkMode
                    ? 'text-gray-500 group-hover:text-gray-400'
                    : 'text-gray-400 group-hover:text-gray-600'
                }`}
              >
                <svg
                  width='12'
                  height='12'
                  viewBox='0 0 12 12'
                  fill='currentColor'
                >
                  <path
                    d='M2 2L2 10M5 2L5 10M7 2L7 10M10 2L10 10'
                    stroke='currentColor'
                    strokeWidth='1'
                    strokeLinecap='round'
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Notes Section */}
          {(viewMode === 'both' || viewMode === 'notes') && (
            <div
              className={`${cardBgColor} border-l ${
                darkMode ? 'border-gray-600' : 'border-gray-200'
              } flex flex-col ${viewMode === 'both' ? '' : 'w-full'}`}
              style={{
                width: viewMode === 'both' ? `${100 - contentWidth}%` : '100%',
              }}
            >
              <div className='p-3 border-b border-gray-600'>
                <div className='flex justify-between items-center mb-3'>
                  <h2 className={`text-lg font-bold ${textColor}`}>Notes</h2>
                  <div className='flex items-center'>
                    {renderSaveStatus()}
                    <button
                      onClick={saveNotes}
                      className={`${
                        darkMode
                          ? 'text-blue-600 hover:text-blue-500'
                          : 'text-blue-500 hover:text-blue-600'
                      } transition text-xs flex items-center ml-1`}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-3 w-3 mr-1'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                      Save
                    </button>
                    <button
                      onClick={addNewPage}
                      className={`${
                        darkMode
                          ? 'text-blue-600 hover:text-blue-500'
                          : 'text-blue-500 hover:text-blue-600'
                      } transition text-xs flex items-center ml-3`}
                    >
                      <span className='text-sm mr-1'>+</span> Page
                    </button>
                  </div>
                </div>
                {/* Page tabs */}
                <div className='mb-3 flex flex-wrap gap-1'>
                  {pages.map((page) => (
                    <button
                      key={page}
                      onClick={() => switchPage(page)}
                      className={`px-2 py-1 rounded text-xs transition flex items-center ${
                        activePage === page
                          ? `${
                              darkMode ? 'bg-blue-600' : 'bg-blue-500'
                            } text-white`
                          : `${
                              darkMode
                                ? 'bg-gray-600 hover:bg-gray-500'
                                : 'bg-gray-200 hover:bg-gray-300'
                            } ${textColor}`
                      }`}
                    >
                      {page}
                      {pages.length > 1 && page !== 'Page 1' && (
                        <span
                          className='ml-1 opacity-60 hover:opacity-100'
                          onClick={(e) => {
                            e.stopPropagation();
                            deletePage(page);
                          }}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-2 w-2'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path
                              fillRule='evenodd'
                              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes Editor Container */}
              <div className='flex-1 p-3 overflow-hidden'>
                <div className='h-full'>
                  <ReactQuill
                    theme='snow'
                    value={notes}
                    onChange={handleNotesChange}
                    modules={modules}
                    formats={formats}
                    className={`${
                      darkMode ? 'dark-quill' : ''
                    } h-full compact-quill`}
                    style={{ height: 'calc(100% - 40px)' }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Strapi-style CSS with your existing functionality */}
      <style>{`
        /* Strapi-inspired base styles */
        .strapi-content {
          font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: ${darkMode ? '#f1f5f9' : '#32324d'};
        }

        /* High-yield section styling - keeping your existing design */
        .high-yield-box {
          background: ${
            darkMode
              ? 'linear-gradient(135deg, #20193A 0%, #1a1332 50%, #16102a 100%)'
              : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)'
          };
          border-radius: 12px;
          padding: 24px;
          margin: 16px 0;
          box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          border: ${
            darkMode ? '1px solid rgba(93, 92, 222, 0.3)' : '2px solid #7c3aed'
          };
          position: relative;
          overflow: hidden;
        }

        .high-yield-box::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: ${
            darkMode
              ? 'rgba(93, 92, 222, 0.1)'
              : 'linear-gradient(45deg, rgba(124, 58, 237, 0.05) 0%, rgba(167, 139, 250, 0.03) 100%)'
          };
          pointer-events: none;
        }

        /* Accordion styles with Strapi-like appearance */
        .accordion-section {
          margin-bottom: 16px;
          background: ${darkMode ? '#1e1e2e' : '#ffffff'};
          border: ${darkMode ? '1px solid #32324d' : '1px solid #dcdce4'};
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 4px rgba(33, 33, 52, 0.1);
        }

        .accordion-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          cursor: pointer;
          background: ${darkMode ? '#32324d' : '#f6f6f9'};
          transition: background-color 0.2s ease;
          user-select: none;
        }

        .accordion-header:hover {
          background: ${darkMode ? '#3c3c4e' : '#eeeff2'};
        }

        .accordion-header.expanded {
          background: ${darkMode ? '#3c3c4e' : '#eeeff2'};
          border-bottom: ${darkMode ? '1px solid #32324d' : '1px solid #dcdce4'};
          position: sticky;
          top: 0;
          z-index: 20;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: ${darkMode ? '#1e1e2e' : '#ffffff'};
        }

        .accordion-content.expanded {
          max-height: none;
          overflow: visible;
        }

        /* Enhanced dark mode styling for Quill */
        .dark-quill .ql-toolbar {
          border-color: #32324d;
          background-color: #32324d;
          padding: 6px;
        }

        .dark-quill .ql-toolbar .ql-stroke {
          stroke: #f1f5f9;
        }

        .dark-quill .ql-toolbar .ql-fill {
          fill: #f1f5f9;
        }

        .dark-quill .ql-toolbar .ql-picker-label {
          color: #f1f5f9;
        }

        .dark-quill .ql-container {
          border-color: #32324d;
          background-color: #1e1e2e;
          color: #f1f5f9;
        }

        .dark-quill .ql-editor {
          color: #f1f5f9;
          padding: 8px;
          font-size: 14px;
        }

        .dark-quill .ql-editor.ql-blank::before {
          color: #8e8ea9;
        }

        .dark-quill .ql-tooltip {
          background-color: #32324d;
          border-color: #32324d;
          color: #f1f5f9;
        }

        .dark-quill .ql-tooltip input {
          background-color: #1e1e2e;
          border-color: #32324d;
          color: #f1f5f9;
        }

        /* Compact quill editor */
        .compact-quill .ql-toolbar {
          padding: 4px;
        }

        .compact-quill .ql-toolbar .ql-formats {
          margin-right: 8px;
        }

        .compact-quill .ql-editor {
          padding: 6px;
          font-size: 13px;
          line-height: 1.4;
        }

        .compact-quill .ql-toolbar button {
          width: 24px;
          height: 24px;
          padding: 2px;
        }

        .compact-quill .ql-toolbar button svg {
          width: 12px;
          height: 12px;
        }

        /* Navigation hierarchy improvements */
        .border-l-3 {
          border-left-width: 3px;
          transition: all 0.2s ease-in-out;
        }

        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: ${darkMode ? '#1e1e2e' : '#f6f6f9'};
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: ${darkMode ? '#32324d' : '#dcdce4'};
          border-radius: 3px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: ${darkMode ? '#3c3c4e' : '#c6c7d0'};
        }

        /* Resizer cursor */
        .cursor-col-resize {
          cursor: col-resize;
        }

        /* Dragging state */
        ${
          isDragging
            ? `
          .content-resizer-container * {
            user-select: none;
            pointer-events: none;
          }
          
          .content-resizer-container {
            cursor: col-resize;
          }
        `
            : ''
        }

        /* Better visual feedback for navigation items */
        nav button {
          border-radius: 6px;
          margin-bottom: 2px;
        }

        nav button:hover {
          transform: translateX(2px);
        }

        /* Focus states for accessibility */
        button:focus {
          outline: 2px solid #4945ff;
          outline-offset: 1px;
        }

        .accordion-header:focus {
          outline: 2px solid #4945ff;
          outline-offset: -2px;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .strapi-content {
            font-size: 13px;
          }
          
          .accordion-header {
            padding: 12px 16px;
          }

          .accordion-body {
            padding: 20px 16px;
          }

          .high-yield-box {
            padding: 16px;
            margin: 12px 0;
          }
        }

        /* Animation for active sections */
        .transition-all {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 200ms;
        }

        /* Ensure proper heading IDs for navigation */
        .strapi-content h2[id],
        .strapi-content h3[id] {
          scroll-margin-top: 80px;
        }

        /* Prevent text selection during resize */
        .content-resizer-container.dragging {
          user-select: none;
        }

        /* Loading animation */
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* Better spacing for accordion sections */
        .accordion-section + .accordion-section {
          margin-top: 0;
        }
      `}</style>
    </div>
  );
};

export default TopicContent;