import { Stack, TextInput, type MantineStyleProp } from "@mantine/core"
import DocComponentSimple from "./components/DocComponentSimple";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { debounceFunc } from "../../../services/delayServices";
import { useEffect, useState } from "react";
import { getDocument, testAuth, updateDocumentTitle } from "../../../services/docServices";
import { useParams } from "react-router";
import { type Doc, type updateDocTitleDto, type caretPositionDto } from "../../../services/docServices";
import { docConnection } from "../../../services/docServices";
import DocUpdateCaret from "./components/DocUpdateCaret";

type caretPos = {
    userName:string,
    left:number,
    right:number,
    top:number,
    bottom:number,
}
const saveTimer = 1000;
const handleTitleChange = async(id:string,title:string) => {
    console.log("Title Changed! ",title);
    const dto:updateDocTitleDto = { id: id, name: title,}
    updateDocumentTitle(dto);
}
const debounceTitleChange = debounceFunc(handleTitleChange,saveTimer);

const DocViewPage = () => {
    //const documentName = props.Doc?.name;
    const {docid} = useParams();
    const [document, setDocument] = useState<Doc>();
    const [docTitle, setDocTitle] = useState<string>("");
    const [docContent,setDocContent] = useState<string>("");
    
    const [caretPos, setCaretPos] = useState<{[key: string]: number;}>({});
    const [caretCoords,setCaretCoords] = useState<caretPos[]>([]);
    
    const handleDocChange = (event:any) =>{
        setDocTitle(event.currentTarget.value);
        if(docid) debounceTitleChange(docid,docTitle);
    }
    const loadDocument = async() => {
        const doc = await getDocument(docid??"");
        setDocument(doc);
        setDocTitle(doc.name);
        setDocContent(doc.content);
    }

    useEffect(()=>{loadDocument()},[]);
    
    const handleUpdateDoc = (newDoc:Doc,caretPosDto:caretPositionDto) => {
        // Update your React component state or UI with the received message
        console.log("Document Updated:",newDoc);
        setDocument(newDoc);
        setDocTitle(newDoc.name);
        setDocContent(newDoc.content);
        
        setCaretPos(prev=>({...prev,[caretPosDto.userName]:caretPosDto.caretPosition}));
        console.log(`${caretPosDto.userName} update at pos ${caretPosDto.caretPosition}`);
        console.log("caretPos",caretPos);
    };
    
    useEffect(() => {
    docConnection.on('updateDoc', handleUpdateDoc);
    return () => {
        docConnection.off('updateDoc', handleUpdateDoc);
    };
    }, [docConnection]);

    return(
        <Stack w={"100%"} align="center" pt={"sm"}>
            {/* <DocUpdateCaret caretCoord={} caretName={caretName}/> */}
            {caretCoords.map((coord)=><DocUpdateCaret key={coord.userName} caretCoord={{top:coord.top,bottom:coord.bottom,left:coord.left,right:coord.right}} caretName={coord.userName}/>)}
            <TextInput value={docTitle} onChange={handleDocChange} leftSection={<MdDriveFileRenameOutline/>} w={"40%"} placeholder="enter document name..."/>
            {document && <DocComponentSimple title={docTitle} content={docContent} document={document} setCaretCoords={setCaretCoords} caretPos={caretPos}/>}
        </Stack>
    )
}

export default DocViewPage;