import React from "react";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EditorContainer = ({ editorState, setEditorState }) => {
  return (
    <div className="editor border box-shadow">
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          image: {
            alt: { present: true, mandatory: true },
          },
        }}
      />
    </div>
  );
};

export default EditorContainer;
