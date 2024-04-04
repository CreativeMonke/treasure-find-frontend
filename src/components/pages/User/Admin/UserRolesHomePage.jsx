import { Divider, Grid, Sheet, Typography } from "@mui/joy";
import UserRoleTable from "./Table/UserRoleTable";
function UserRolesHomePage() {
  return (
    <Sheet
      variant="soft"
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: "10px",
      }}
    >
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Typography level="h1" sx={{ mb: 4 }}>
                    User Roles admin view
                </Typography>
                <Divider sx={{ mb: 3 }} >All Roles</Divider>
            </Grid>
            <UserRoleTable />
        </Grid>
    </Sheet>
  );
}

export default UserRolesHomePage;