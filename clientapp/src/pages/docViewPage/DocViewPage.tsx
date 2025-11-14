import { Stack, Text } from "@mantine/core"
import DocComponentSimple from "./components/DocComponentSimple";

type Doc = {
    Id:string,
    name:string,
    content:string,
    ownedBy:object,
    dateCreated:Date,
    lastEdit:Date,
};
type Prop = {
    Doc:Doc,
}
const DocViewPage = (props:Prop) => {
    const documentName = props.Doc?.name;
    return(
        <Stack w={"100%"} align="center" pt={"sm"}>
            <Text>{documentName??"Insert Doc Name Here"}</Text>
            <DocComponentSimple />
        </Stack>
    )
}

export default DocViewPage;