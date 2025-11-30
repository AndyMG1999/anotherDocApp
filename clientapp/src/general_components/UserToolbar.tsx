import { Avatar, Button, Group, Text } from "@mantine/core";
import { Link } from "react-router";

type Prop = {
    userName:string,
    profileImage:any,
}

const UserToolbar = (props:Prop) => {
    return(
        <Group>
            <Avatar name={props.userName} />
            <Text fw="bold">{props.userName}</Text>
            <Link to={"/"}><Button size="sm">My Docs</Button></Link>
            <Button color="pink">Sign out</Button>
        </Group>
    )
}

export default UserToolbar;