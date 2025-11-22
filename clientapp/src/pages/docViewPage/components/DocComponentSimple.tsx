import { useEffect,memo } from 'react';
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
import { type Doc, type updateDocDto, type caretPositionDto} from '../../../../services/docServices';

const saveTimer = 400; //eg 3000 is 3 seconds
const HandleChange = (id:string,name:string,editorText:string,caretPosDto:caretPositionDto):void => {
  console.log("Now Saving!",editorText);
  const dto:updateDocDto = { id: id, name: name, content: editorText, caretPositionDto: caretPosDto};
  updateDocument(dto);
}
const debounceHandleChange = debounceFunc(HandleChange,saveTimer);

type Prop = {
  title:string,
  content:string,
  document:Doc,
  caretPos:{[key: string]: number;},
  setCaretCoords:any,
}
const DocComponentSimple = memo((docProps:Prop) => {
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
      const caretPos = props.editor.state.selection.from;
      const caretPosDto:caretPositionDto = { userName: "DoesNotMatter", caretPosition: caretPos}
      debounceHandleChange(docProps.document.id,docProps.title,props.editor.getHTML(),caretPosDto);
    },
  });

  // Update editor content when props.content changes
  useEffect(() => {
    if (editor && docProps.content !== editor.getHTML()) {
      let currentCaretPos = editor.state.selection.from;
      editor.commands.setContent(docProps.content);
      const editorSize = editor.state.doc.content.size;
      if(currentCaretPos < 0 || currentCaretPos > editorSize) currentCaretPos = 0;
      //editor.commands.setTextSelection(currentCaretPos);
    }
  }, [docProps.content]);

  useEffect(()=>{
    let coordArr:any = [];
    Object.keys(docProps.caretPos).forEach(key => {
      console.log(`${key}: ${docProps.caretPos[key]}`);
      if(docProps.caretPos[key] > editor.state.doc.content.size) return;
      const coords = editor.view.coordsAtPos(docProps.caretPos[key]);
      const caretCoord = {userName: key, top: coords.top, bottom: coords.bottom, left: coords.left, right: coords.right};
      coordArr.push(caretCoord);
    });
    docProps.setCaretCoords(coordArr);
  },[docProps.caretPos,editor])
  
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
});

export default DocComponentSimple;