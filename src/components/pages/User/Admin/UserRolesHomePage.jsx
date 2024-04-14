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
        overflow:"auto",
        
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography level="h1">
            User Roles admin view
          </Typography>
          <Divider>All Roles</Divider>
        </Grid>
        <Grid item xs={12}>
          <UserRoleTable />
        </Grid>
      </Grid>
    </Sheet>
  );
}

export default UserRolesHomePage;
