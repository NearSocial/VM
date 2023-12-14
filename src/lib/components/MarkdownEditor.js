import "./quill.snow.css";
import React from "react";
import ReactQuill from "react-quill";
import { sanitizePasteHtml } from "virtualized-chat";

export const MarkdownEditor = (props) => {
  var toolbarOptions = ['bold', 'italic', 'underline', 'strike', { 'list': 'ordered' }, { 'list': 'bullet' }];

  return (
    <ReactQuill
      modules={{
        toolbar: toolbarOptions
      }}
      theme="snow"
      value={props.value}
      onChange={(value) => {
        const purifiedText = sanitizePasteHtml(value);
        props.setValue(purifiedText);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          props.handleMessageSent();
        }
      }}
    />
  );
};
