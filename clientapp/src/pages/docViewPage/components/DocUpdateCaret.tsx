import { Pill, Stack, type MantineStyleProp } from "@mantine/core";

type caretPos = {
    left:number,
    right:number,
    top:number,
    bottom:number,
}
type Props = {
    key:string,
    caretName:string | "Insert Name",
    caretCoord:caretPos
}

const DocUpdateCaret = (props:Props) => {
    const caretCoord = props.caretCoord;
    const caretStyle:MantineStyleProp = {
        zIndex: 10,
        position: "absolute",
        margin: 0,
        padding: 0,
        top: caretCoord.top>0 ? caretCoord.top - 3 : undefined,
        left: caretCoord.left>0?  caretCoord.left : undefined,
        right: caretCoord.right>0? caretCoord.right : undefined,
        bottom: caretCoord.bottom>0? caretCoord.bottom : undefined,
    }
    return(
        <Stack style={caretStyle} miw={"2em"} maw={"6em"}>
            <Pill bg={"pink"} c="white" size="sm" fw={"bold"}>{props.caretName}</Pill>
        </Stack>
    )
}

export default DocUpdateCaret;