import { useState } from "react";
import MDBox from "components/MDBox";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "./css/editorStyle.css"

function RichTextEditor({ onChange, text }) {

  return (
    <MDBox>
      <MDBox className="editor" >
        <CKEditor
          
          editor={ClassicEditor}
          data={text}
          onChange={onChange}
        />
      </MDBox>

    </MDBox>
  );
}

export default RichTextEditor;
