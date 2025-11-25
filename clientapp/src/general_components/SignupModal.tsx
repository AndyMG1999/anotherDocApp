import { Modal,Stack,Button,TextInput } from "@mantine/core";

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
                <Button color="violet">Sign up!</Button>
            </Stack>
        </Modal>
    );
}

export default SignupModal;