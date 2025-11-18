import Highlight from '@tiptap/extension-highlight';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { RichTextEditor,Link } from '@mantine/tiptap';
import '@mantine/core/styles.css';
// ‼️ import tiptap styles after core package styles
import '@mantine/tiptap/styles.css';
import '@mantine/core/styles.css';
import {debounceFunc} from "../../../../services/delayServices";
import { updateDocument } from '../../../../services/docServices';
import { type Doc, type updateDocDto } from '../../../../services/docServices';

const saveTimer = 1200; //eg 3000 is 3 seconds
const HandleChange = (id:string,name:string,editorText:string):void => {
  console.log("Now Saving!",editorText);
  const dto:updateDocDto = { id: id, name: name, content: editorText};
  updateDocument(dto);
}
const debounceHandleChange = debounceFunc(HandleChange,saveTimer);

type Prop = {
  title:string,
  content:string,
  document:Doc
}
const DocComponentSimple = (docProps:Prop) => {
  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit.configure({ link: false }),
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: docProps.content,
    onUpdate(props) {
      debounceHandleChange(docProps.document.id,docProps.title,props.editor.getHTML());
    },
  });
  
  return (
    <RichTextEditor editor={editor} w={"60%"} mih={"60em"}>
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

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
}

export default DocComponentSimple;