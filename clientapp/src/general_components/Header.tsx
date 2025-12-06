import { Group, Title, Box, Button, Image } from "@mantine/core"
import logo from "/logo.svg";
import LoginModal from "./LoginModal";
import { useState,useContext } from "react";
import SignupModal from "./SignupModal";
import { AppContext } from "../../contexts/ApplicationContext";
import UserToolbar from "./UserToolbar";

const Header = () => {
    const [openLoginModal,setOpenLoginModal] = useState<boolean>(false);
    const [openSignupModal,setOpenSignupModal] = useState<boolean>(false);
    const {userInfo} = useContext(AppContext);

    const toolbarStyle = {
        zIndex: 10,
        background: 'rgba(224, 242, 255, 0.8)',
        backdropFilter: 'blur(4px) saturate(180%)',
        WebkitBackdropFilter: 'blur(4px) saturate(180%)',
    };

    return(
        <Box w={"100%"} display={"flex"} pos={"sticky"} top={0} h={"7em"} p={"xs"} style={toolbarStyle}>
        <Group w={"100%"} justify="space-between">
            <Group>
            <Image src={logo} h={"3em"} w={"auto"}/>
            <Title>AnotherDocApp</Title>
            </Group>

            {userInfo?
            <UserToolbar userName={userInfo.userName} profileImage={null}/>
            :
            <Group>
                <Button color="grape" size="sm" onClick={()=>{setOpenLoginModal(true)}}>Log in</Button>
                <Button color="violet" size="sm" onClick={()=>{setOpenSignupModal(true)}}>Sign up</Button>
            </Group>}
        </Group>
            <LoginModal opened={openLoginModal} onClose={()=>{setOpenLoginModal(false)}}/>
            <SignupModal opened={openSignupModal} onClose={()=>{setOpenSignupModal(false)}}/>
        </Box>
    )
}

export default Header;