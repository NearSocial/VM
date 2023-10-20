import "./quill.snow.css";
import React, { useEffect, useRef } from "react";
import ReactQuill from "react-quill";

export const MarkdownEditor = (props) => {
  useEffect(() => {
    if (props.selectedEmoji) {
      const newValue = `${props.value.replace(/<p><br><\/p>\s*$/i, '')}${props.selectedEmoji}`;
      props.setValue(newValue);
      props.resetSelectedEmoji();
    }
    if (!props.value) {
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
      onChange={props.setValue}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          props.handleMessageSent();
          props.setValue("");
        }
      }}
    />
  );
};
