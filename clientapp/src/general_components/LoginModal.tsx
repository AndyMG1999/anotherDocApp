import { Modal,Stack,Button,TextInput,Alert } from "@mantine/core";

type Props = {
    opened:boolean,
    onClose:()=>void,
} 
const LoginModal = (props:Props) => {
    return(
        <Modal title="Log in" opened={props.opened} onClose={props.onClose} centered overlayProps={{backgroundOpacity: 0.05,blur: 3,}}>
            <Stack>
                <TextInput label="Email"/>
                <TextInput label="Password"/>
                <Alert variant="light" color="red" radius="md" title="Username or Password is Incorrect"/>
                <Button color="grape">Log in!</Button>
            </Stack>
        </Modal>
    );
}

export default LoginModal;