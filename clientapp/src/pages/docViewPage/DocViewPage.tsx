import { Stack, TextInput } from "@mantine/core"
import DocComponentSimple from "./components/DocComponentSimple";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { debounceFunc } from "../../../services/delayServices";
import { useEffect, useState } from "react";
import { getDocument, updateDocument } from "../../../services/docServices";
import { useParams } from "react-router";
import { type Doc, type updateDocDto } from "../../../services/docServices";

const saveTimer = 1000;
const handleTitleChange = async(id:string,title:string,content:string) => {
    console.log("Title Changed! ",title);
    const dto:updateDocDto = { id: id, name: title, content: content}
    updateDocument(dto);
}
const debounceTitleChange = debounceFunc(handleTitleChange,saveTimer);

const DocViewPage = () => {
    //const documentName = props.Doc?.name;
    const {docid} = useParams();
    const [document, setDocument] = useState<Doc>();
    const [docTitle, setDocTitle] = useState<string>("");
    const [docContent,setDocContent] = useState<string>("");
    const handleDocChange = (event:any) =>{
        setDocTitle(event.currentTarget.value);
        if(docid) debounceTitleChange(docid,docTitle,event.currentTarget.value);
    }
    const loadDocument = async() => {
        const doc = await getDocument(docid??"");
        setDocument(doc);
        setDocTitle(doc.name);
        setDocContent(doc.content);
    }

    useEffect(()=>{loadDocument()},[]);


    return(
        <Stack w={"100%"} align="center" pt={"sm"}>
            <TextInput value={docTitle} onChange={handleDocChange} leftSection={<MdDriveFileRenameOutline/>} w={"40%"} placeholder="enter document name..."/>
            {document && <DocComponentSimple title={docTitle} content={docContent} document={document}/>}
        </Stack>
    )
}

export default DocViewPage;