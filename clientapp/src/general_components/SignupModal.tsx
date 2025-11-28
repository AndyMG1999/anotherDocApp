import { Modal,Stack,Button,TextInput,Alert } from "@mantine/core";

type Props = {
    opened:boolean,
    onClose:()=>void,
} 
const SignupModal = (props:Props) => {
    return(
        <Modal title="Sign up" opened={props.opened} onClose={props.onClose} centered overlayProps={{backgroundOpacity: 0.05,blur: 3,}}>
            <Stack>
                <TextInput label="Email"/>
                <TextInput label="Password"/>
                <TextInput label="Retype Password"/>
                <Alert variant="light" color="red" radius="md" title="Error Creating Account"/>
                <Alert variant="light" color="grape" radius="md" title="Account Created!"/>
                <Button color="violet">Sign up!</Button>
            </Stack>
        </Modal>
    );
}

export default SignupModal;