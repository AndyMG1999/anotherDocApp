import Highlight from '@tiptap/extension-highlight';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { RichTextEditor } from '@mantine/tiptap';
import { useMemo } from 'react';
import '@mantine/core/styles.css';
// ‼️ import tiptap styles after core package styles
import '@mantine/tiptap/styles.css';
import '@mantine/core/styles.css';
import {debounceFunc} from "../../../../services/delayServices";

const content = '<p>Subtle rich text editor variant</p>';
const saveTimer = 1200; //eg 3000 is 3 seconds
const HandleChange = (editorText:string):void => {
  console.log("Now Saving!",editorText);
}
const debounceHandleChange = debounceFunc(HandleChange,saveTimer)

const DocComponentSimple = () => {
  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    extensions: [StarterKit, Highlight],
    content,
    onUpdate(props) {
      debounceHandleChange(props.editor.getHTML());
    },
  });
  
  return (
    <RichTextEditor editor={editor} variant="subtle" w={"60%"} mih={"60em"}>
      <RichTextEditor.Toolbar sticky stickyOffset={110} >
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
}

export default DocComponentSimple;