import { Group, Title, Box, Button, Image } from "@mantine/core"
import { Link } from "react-router";
import logo from "/logo.svg";
import LoginModal from "./LoginModal";
import { useState } from "react";
import SignupModal from "./SignupModal";

const Header = () => {
    const [openLoginModal,setOpenLoginModal] = useState<boolean>(false);
    const [openSignupModal,setOpenSignupModal] = useState<boolean>(false);
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
            <Title>NotAnotherDoc</Title>
            </Group>

            <Group>
                <Link to={"/"}><Button size="sm">My Docs</Button></Link>
                <Button color="grape" size="sm" onClick={()=>{setOpenLoginModal(true)}}>Login</Button>
                <Button color="violet" size="sm" onClick={()=>{setOpenSignupModal(true)}}>Signup</Button>
            </Group>
        </Group>
            <LoginModal opened={openLoginModal} onClose={()=>{setOpenLoginModal(false)}}/>
            <SignupModal opened={openSignupModal} onClose={()=>{setOpenSignupModal(false)}}/>
        </Box>
    )
}

export default Header;