import React, { useEffect } from "react";
import {
  MDXEditor,
  codeBlockPlugin,
  headingsPlugin,
  listsPlugin,
  linkPlugin,
  quotePlugin,
  toolbarPlugin,
  markdownShortcutPlugin,
  useCodeBlockEditorContext,
} from "@mdxeditor/editor";
import { MarkdownToolbar } from "./MarkdownToolbar.js";

import "./md-editor.css";

const PlainTextCodeEditorDescriptor = {
  match: () => true,
  priority: 0,
  Editor: (props) => {
    const cb = useCodeBlockEditorContext();
    return (
      <div onKeyDown={(e) => e.nativeEvent.stopImmediatePropagation()}>
        <textarea
          rows={3}
          cols={20}
          defaultValue={props.code}
          onChange={(e) => cb.setCode(e.target.value)}
        />
      </div>
    );
  },
};

export const MarkdownEditor = (props) => {
  const ref = React.useRef(null);
  useEffect(() => {
    if (props.selectedEmoji) {
      const newMd = `${ref.current.getMarkdown()} ${props.selectedEmoji}`;
      props.resetSelectedEmoji();
      ref?.current.setMarkdown(newMd);
    } else if (!props.message) {
      ref?.current.setMarkdown("");
    }
  }, [props.selectedEmoji, props.message]);
  return (
    <>
      <MDXEditor
        ref={ref}
        onChange={props.onChange}
        markdown={props.message}
        contentEditableClassName={props.className}
        placeholder={props.placeholder}
        autoFocus={true}
        plugins={[
          codeBlockPlugin({
            codeBlockEditorDescriptors: [PlainTextCodeEditorDescriptor],
          }),
          headingsPlugin(),
          listsPlugin(),
          linkPlugin(),
          quotePlugin(),
          markdownShortcutPlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <MarkdownToolbar
                onClick={(item) => {
                  const newMd = `${ref.current.getMarkdown()} ${item}&#x20;`;
                  ref.current.setMarkdown(newMd);
                }}
              />
            ),
          }),
        ]}
      />
    </>
  );
};
