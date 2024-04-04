import { LinearProgress, Sheet, Table } from "@mui/joy";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Row from "./Row";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

function UserRoleTable() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  async function getAllUsers() {
    try {
      setIsLoading(true);
      const res = await axios.get(`${apiUrl}users/getAll`, {
        withCredentials: true,
      });

      const usersData = res.data.data.map((user, index) => {
        return {
          id: user._id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          role: user.role,
        };
      });
      setUsers(usersData);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
    setIsLoading(false);
  }
  useEffect(() => {
    getAllUsers();
  }, []);
  console.log(users);
  return (
    <Sheet
      variant="plain"
      sx={{ overflow: "auto", height: "90%", borderRadius: "5px", p:1}}
    >
      <Table stickyHeader size="md" borderAxis="xBetween" noWrap>
        <thead>
          <tr>
            <th width="25px">#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th width = "40%">Email</th>
            <th width = "20%">Role</th>
            <th width = "60px"></th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <LinearProgress size="lg" />
          ) : (
            users.map((user, index) => (
              <Row
                id={user._id}
                index={index}
                firstName={user.firstName}
                lastName={user.lastName}
                email={user.email}
                role={user.role}
              />
            ))
          )}
        </tbody>
      </Table>
    </Sheet>
  );
}

export default UserRoleTable;
