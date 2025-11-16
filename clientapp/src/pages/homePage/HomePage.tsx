import { useEffect, useState } from "react";
import { Stack,Group,Button } from "@mantine/core"
import HomePageTable from "./components/HomePageTable";
import NewDocumentModal from "../../general_components/NewDocumentModal";
import {type Doc,getAllDocuments} from "../../../services/docServices";

const HomePage = () => {
    const [openNewDocModal,setOpenNewDocModal] = useState<boolean>(false);
    const [documentsData, setDocumentsData] = useState<Doc[]>([]);
    const getData = async() => {
        const data = await getAllDocuments();
        setDocumentsData(data);
    }
    useEffect(()=>{getData()},[]);
    return(
        <Stack w={"100%"} align="center" mt={"sm"}>
            <NewDocumentModal opened={openNewDocModal} onClose={()=>{setOpenNewDocModal(false)}} title={""} />
            <Group>
                <Button onClick={()=>{setOpenNewDocModal(true)}}>New Doc</Button>
                <Button color="red">Delete Doc</Button>
            </Group>
            <HomePageTable data={documentsData}/>
        </Stack>
    )
}

export default HomePage;