import { Stack,Group,Button } from "@mantine/core"
import HomePageTable from "./components/HomePageTable";

const HomePage = () => {
    return(
        <Stack w={"100%"} align="center" mt={"sm"}>
            <Group>
                <Button>New Doc</Button>
                <Button color="red">Delete Doc</Button>
            </Group>
            <HomePageTable />
        </Stack>
    )
}

export default HomePage;