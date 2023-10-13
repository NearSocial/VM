import gfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import React from "react";
import mentions from "./remark/mentions";
import hashtags from "./remark/hashtags";

export const Markdown = (props) => {
  const {
    onLink,
    onLinkClick,
    text,
    onMention,
    onHashtag,
    onImage,
    syntaxHighlighterProps,
  } = props;
  return (
    <ReactMarkdown
      plugins={[]}
      rehypePlugins={[]}
      remarkPlugins={[gfm, mentions, hashtags]}
      children={text}
      components={{
        strong({ node, children, ...props }) {
          if (onMention && node.properties?.accountId) {
            return onMention(node.properties?.accountId);
          } else if (onHashtag && node.properties?.hashtag) {
            return onHashtag(node.properties?.hashtag);
          }
          return <strong {...props}>{children}</strong>;
        },
        a: ({ node, ...props }) =>
          onLink ? (
            onLink({ ...props, href: node.properties?.href })
          ) : onLinkClick ? (
            <a onClick={onLinkClick} {...props} />
          ) : (
            <a target="_blank" {...props} />
          ),
        img: ({ node, ...props }) =>
          onImage ? (
            onImage({ ...props })
          ) : (
            <img className="img-fluid" {...props} />
          ),
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
