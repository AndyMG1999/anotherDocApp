import { Modal,Stack,Button,TextInput,Alert } from "@mantine/core";
import { useForm,isEmail,isNotEmpty } from "@mantine/form";
import { loginUser, type userInfoDto } from "../../services/accountServices";
import { useContext, useState } from "react";
import { AppContext } from "../../contexts/ApplicationContext";

type Props = {
    opened:boolean,
    onClose:()=>void,
} 
const LoginModal = (props:Props) => {
    const [openErrorAlert,setOpenErrorAlert] = useState<boolean>(false);
    const {setUserInfo} = useContext(AppContext);
    const form = useForm({
    mode: 'uncontrolled',
    initialValues: { email: '', password: '',},
    validate: {
        email: isEmail('Invalid email'),
        password: isNotEmpty('Required'),
    },
    });
    const onSubmit = async (values:{email:string,password:string}) => {
        const userInfo:userInfoDto = await loginUser(values.email,values.password);
        if(!userInfo) setOpenErrorAlert(true);
        setUserInfo(userInfo);
        console.log("Logged Into:",userInfo);
    };
    return(
        <Modal title="Log in" opened={props.opened} onClose={props.onClose} centered overlayProps={{backgroundOpacity: 0.05,blur: 3,}}>
            <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack>
                <TextInput label="Email" key={form.key("email")} {...form.getInputProps("email")}/>
                <TextInput label="Password" key={form.key("password")} {...form.getInputProps("password")}/>
                {openErrorAlert && <Alert variant="light" color="red" radius="md" title="Username or Password is Incorrect"/>}
                <Button color="grape" type="submit">Log in!</Button>
            </Stack>
            </form>
        </Modal>
    );
}

export default LoginModal;