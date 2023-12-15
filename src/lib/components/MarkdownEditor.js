import "./quill.snow.css";
import React, { useEffect, useRef } from "react";

import Quill from "quill";
import { sanitizePasteHtml } from "virtualized-chat";

export const MarkdownEditor = (props) => {
  const ref = useRef(null);
  const quillRef = useRef(null);
  const toolbarOptions = ['bold', 'italic', 'underline', 'strike', { 'list': 'ordered' }, { 'list': 'bullet' }];

  const sendMessage = () => {
    props.handleMessageSent(quillRef.current.root.innerHTML);
    quillRef.current.setText('');
  }

  const handleDrop = (e) => e.preventDefault();

  const handlePaste = (e) => {
    e.preventDefault();
  
    const clipboardData = e.clipboardData;
    const quill = quillRef.current;
    const selection = quill.getSelection(true);
  
    const { types } = clipboardData;
  
    if (types.includes('text/html')) {
      const pastedData = clipboardData.getData('text/html');
      const processedData = sanitizePasteHtml(pastedData);
      quill.pasteHTML(selection.index, processedData);
    } else if (types.includes('text/plain')) {
      const pastedData = clipboardData.getData('text/plain');
      quill.insertText(selection.index, pastedData);
    }
  };

  useEffect(() => {
    if (ref.current) {
      quillRef.current = new Quill(ref.current, {
        modules: {
          toolbar: toolbarOptions,
          keyboard: {
            bindings: {
              enter: {
                  key: 13,
                  handler: sendMessage
              }
          },
        }
      },
      theme: "snow",
      });
      quillRef.current.root.innerHTML = props.value;
      quillRef.current.root.addEventListener("paste", handlePaste);
      quillRef.current.root.addEventListener("drop", handleDrop);
    }
  }, []);

  useEffect(() => {
    const currentQuill = quillRef.current;

    if (currentQuill) {
      if (currentQuill.root.innerHTML !== props.value) {
        const delta = currentQuill.clipboard.convert(props.value);
        currentQuill.setContents(delta, "silent");
      }

      const handleTextChange = (delta, oldDelta, source) => {
        const value = currentQuill.root.innerHTML;
        props.setValue(value);
      };

      currentQuill.on("text-change", handleTextChange);
    }
  }, [quillRef.current, props.value]);

  return (
      <div ref={ref} />
  );
};
