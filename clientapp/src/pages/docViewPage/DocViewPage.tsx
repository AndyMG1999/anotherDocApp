import { Stack, TextInput } from "@mantine/core"
import DocComponentSimple from "./components/DocComponentSimple";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { debounceFunc } from "../../../services/delayServices";
import { useEffect, useState } from "react";
import { getDocument } from "../../../services/docServices";
import { useParams } from "react-router";

const saveTimer = 1200;
const handleTitleChange = (title:string) => {
    console.log("Title Changed! ",title);
}
const debounceTitleChange = debounceFunc(handleTitleChange,saveTimer);

const DocViewPage = () => {
    //const documentName = props.Doc?.name;
    const {docid} = useParams();
    const [docTitle, setDocTitle] = useState<string>("");
    const [docContent,setDocContent] = useState<string>("");
    const handleDocChange = (event:any) =>{
        setDocTitle(event.currentTarget.value);
        debounceTitleChange(event.currentTarget.value);
    }
    const loadDocument = async() => {
        const document = await getDocument(docid??"");
        setDocTitle(document.name);
        setDocContent(document.content);
    }

    useEffect(()=>{loadDocument()},[]);


    return(
        <Stack w={"100%"} align="center" pt={"sm"}>
            <TextInput value={docTitle} onChange={handleDocChange} leftSection={<MdDriveFileRenameOutline/>} w={"40%"} placeholder="enter document name..."/>
            <DocComponentSimple content={docContent}/>
        </Stack>
    )
}

export default DocViewPage;