import { Group, Title, Box, Button, Image } from "@mantine/core"
import { Link } from "react-router";
import logo from "../../src/assets/Basic Doc Logo.svg";

const Header = () => {
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
                <Button color="grape" size="sm">Login</Button>
                <Button color="violet" size="sm">Signup</Button>
            </Group>
        </Group>
        </Box>
    )
}

export default Header;