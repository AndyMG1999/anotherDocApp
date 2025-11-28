import { Modal,Stack,Button,TextInput,Alert } from "@mantine/core";
import { useForm,isEmail,isNotEmpty,matchesField } from "@mantine/form";
import {registerUser} from "../../services/accountServices";
import { useState } from "react";

type Props = {
    opened:boolean,
    onClose:()=>void,
} 
const SignupModal = (props:Props) => {
    const [openErrorAlert,setOpenErrorAlert] = useState<boolean>(false);
    const [openSuccessAlert,setOpenSuccessAlert] = useState<boolean>(false);
    const passwordValidation = (value:string) => {
        if(value.length < 6) return "Password must be at least 6 characters";
        if(!/[A-Z]/.test(value)) return "Password must have an uppercase letter";
        if(!/[a-z]/.test(value)) return "Password must have a lowercase letter";
        if(!/[0-9]/.test(value)) return "Password must include a number";
        if(!/[$&+,:;=?@#|'<>.^*()%!-]/.test(value)) return "Password must include a special character";
    }
    const form = useForm({
    mode: 'uncontrolled',
    initialValues: { email: '', userName: '', password: '', retypePassword: '' },
    validate: {
      email: isEmail('Invalid email'),
      userName: isNotEmpty('Required'),
      password: passwordValidation,
      retypePassword: matchesField('password', 'Passwords are not the same'),
    },
    });
    const onSubmit = async(values:{userName:string,email:string,password:string}) => {
        setOpenErrorAlert(false);
        setOpenSuccessAlert(false);
        const accountCreated = await registerUser(values.userName,values.email,values.password);
        
        if(accountCreated) setOpenSuccessAlert(true);
        else setOpenErrorAlert(true);
        if(accountCreated) form.reset();
    }
    return(
        <Modal title="Sign up" opened={props.opened} onClose={props.onClose} centered overlayProps={{backgroundOpacity: 0.05,blur: 3,}}>
            <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack>
                <TextInput label="Email" key={form.key("email")} {...form.getInputProps("email")} type="email"/>
                <TextInput label="Username" key={form.key("userName")} {...form.getInputProps("userName")}/>
                <TextInput label="Password" key={form.key("password")} {...form.getInputProps("password")} type="password"/>
                <TextInput label="Retype Password" key={form.key("retypePassword")} {...form.getInputProps("retypePassword")} type="password"/>
                {openErrorAlert && <Alert variant="light" color="red" radius="md" title="Error Creating Account"/>}
                {openSuccessAlert && <Alert variant="light" color="grape" radius="md" title="Account Created!"/>}
                <Button color="violet" type="submit">Sign up!</Button>
            </Stack>
            </form>
        </Modal>
    );
}

export default SignupModal;