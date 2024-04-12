import React from "react";
import {Stack , Typography} from "@mui/joy"
function NoLocationComponent()
{
    return(
        <Stack>
            <Typography level = "h2" color = "danger">Please provide location permissions</Typography>
        </Stack>
    )
}

export default NoLocationComponent;