import { LinearProgress, Sheet, Table } from "@mui/joy";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Row from "./Row";
import { useSelector } from "react-redux";

function UserRoleTable() {
  const { isLoggedIn, sessionId } = useSelector((state) => state.auth); // Assuming your store is set up correctly
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_BASE_URL; // Ensure this is the only declaration

  useEffect(() => {
    const getAllUsers = async () => {
      if (!isLoggedIn) {
        console.log("User not logged in.");
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.get(`${apiUrl}users/getAll`, {
          headers: {
            sessionid: sessionId, // Ensure this is how your API expects the session ID
          },
          withCredentials: true,
        });
        const usersData = response.data.data.map(user => ({
          id: user._id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          role: user.role,
        }));
        setUsers(usersData);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setIsLoading(false);
      }
    };

    getAllUsers();
  }, [isLoggedIn, sessionId]); // Add sessionId as a dependency to re-fetch when it changes

  return (
    <Sheet variant="plain" sx={{ overflow: "auto", borderRadius: "5px", p: 1 }}>
      <Table size="md" borderAxis="xBetween" noWrap>
        <thead>
          <tr>
            <th width="25px">#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th width="40%">Email</th>
            <th width="20%">Role</th>
            <th width="60px"></th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr style={{ height: '100px' }}><td colSpan="6"><LinearProgress size="lg" /></td></tr>
          ) : (
            users.map((user, index) => (
              <Row
                id={user.id}
                key={user.id}
                index={index}
                firstName={user.firstName}
                lastName={user.lastName}
                email={user.email}
                role={user.role}
                token={sessionId}
              />
            ))
          )}
        </tbody>
      </Table>
    </Sheet>
  );
}

export default UserRoleTable;
