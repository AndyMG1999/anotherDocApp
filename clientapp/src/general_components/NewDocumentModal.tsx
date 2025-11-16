import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { createDocument } from "../../services/docServices";
import {useForm} from "@mantine/form";
import { useNavigate } from 'react-router';

type Prop = {
    opened:boolean,
    onClose:()=>void,
    title:string | null,
};
const NewDocumentModal = (props:Prop) => {
    const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      documentName: 'New Document',
    },
    });

    const submitCreate = async(values:{documentName:string}):Promise<void> => {
        const ok = await createDocument(values.documentName);
        if(!ok) throw Error();
        console.log("Document Created!");
        props.onClose();
    }
    return(
    <Modal opened={props.opened} onClose={props.onClose} title={props.title} centered>
        <form onSubmit={form.onSubmit(submitCreate)}>
        <Stack>
            <TextInput placeholder="enter document name..." key={form.key('documentName')} {...form.getInputProps('documentName')}/>
            <Button type="submit">Create</Button>        
        </Stack>
        </form>
    </Modal>
    )
}

export default NewDocumentModal;