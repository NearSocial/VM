import gfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import React from "react";
import mentions from "./remark/mentions";
import hashtags from "./remark/hashtags";
import urls from "./remark/urls";

export const Markdown = (props) => {
  const { onLinkClick, text, onMention, onHashtag, onURL, syntaxHighlighterProps } =
    props;
  return (
    <ReactMarkdown
      plugins={[]}
      rehypePlugins={[]}
      remarkPlugins={[gfm, gemoji, mentions, hashtags, urls]}
      children={text}
      components={{
        strong({ node, children, ...props }) {
          if (onMention && node.properties?.accountId) {
            return onMention(node.properties?.accountId);
          } else if (onHashtag && node.properties?.hashtag) {
            return onHashtag(node.properties?.hashtag);
          } else if (onURL && node.properties?.url) {
            return onURL(node.properties);
          }
          return <strong {...props}>{children}</strong>;
        },
        a: ({ node, ...props }) =>
          onLinkClick ? (
            <a onClick={onLinkClick} {...props} />
          ) : (
            <a target="_blank" {...props} />
          ),
        img: ({ node, ...props }) => <img className="img-fluid" {...props} />,
        blockquote: ({ node, ...props }) => (
          <blockquote className="blockquote" {...props} />
        ),
        table: ({ node, ...props }) => (
          <table className="table table-striped" {...props} />
        ),
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const { wrapLines, lineProps, showLineNumbers, lineNumberStyle } =
            syntaxHighlighterProps ?? {};

          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              style={tomorrow}
              language={match[1]}
              PreTag="div"
              {...{ wrapLines, lineProps, showLineNumbers, lineNumberStyle }}
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    />
  );
};
