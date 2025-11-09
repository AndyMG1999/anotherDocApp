import { Stack } from "@mantine/core"
import DocComponentSimple from "./components/DocComponentSimple";

const DocViewPage = () => {
    return(
        <Stack w={"100%"} align="center" pt={"sm"}>
            <DocComponentSimple />
        </Stack>
    )
}

export default DocViewPage;