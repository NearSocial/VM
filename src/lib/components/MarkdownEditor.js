import "./quill.snow.css";
import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import { sanitizePasteHtml } from "virtualized-chat";

export const MarkdownEditor = (props) => {
  useEffect(() => {
    if (props.selectedEmoji) {
      let newValue = "";
      if (props.value) {
        newValue = `${props.value.replace(/<p><br><\/p>\s*$/i, '')}${props.selectedEmoji}`;
      } else {
        newValue = `<p>${props.selectedEmoji}</p>`;
      }
      props.setValue(newValue);
      props.resetSelectedEmoji();
    } else if (!props.value) {
      props.setValue("");
    }
  }, [props.selectedEmoji, props.value]);

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
