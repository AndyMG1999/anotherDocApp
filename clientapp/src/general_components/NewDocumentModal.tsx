import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { createDocument } from "../../services/docServices";
import {useForm} from "@mantine/form";
import { useNavigate } from 'react-router';
import { IoMdDocument } from "react-icons/io";

type Prop = {
    opened:boolean,
    onClose:()=>void,
    title:string | null,
};
const NewDocumentModal = (props:Prop) => {
    const navigate = useNavigate();
    const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      documentName: 'New Document',
    },
    });

    const submitCreate = async(values:{documentName:string}):Promise<void> => {
        const docId = await createDocument(values.documentName);
        console.log("Document Created!");
        navigate("/doc/"+docId);
        props.onClose();
    }
    return(
    <Modal opened={props.opened} onClose={props.onClose} title={props.title} centered>
        <form onSubmit={form.onSubmit(submitCreate)}>
        <Stack>
            <TextInput placeholder="enter document name..." key={form.key('documentName')} {...form.getInputProps('documentName')} leftSection={<IoMdDocument/>}/>
            <Button type="submit">Create</Button>        
        </Stack>
        </form>
    </Modal>
    )
}

export default NewDocumentModal;