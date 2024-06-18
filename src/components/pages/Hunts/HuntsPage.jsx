import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Sheet,
  FormControl,
  FormLabel,
  Select,
  Option,
  Button,
  Input,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/joy";
import HuntsTable from "./HuntsTable";
import { getAllHunts } from "../../../features/hunt/huntSlice";
import {
  handleRequestSort,
  handleSearchChange,
  handleFilterByChange,
  handleRowClick,
  handleStatusChange,
  handleCreate,
  handleJoin,
  handleEdit,
  handleDelete,
  handleExit,
  getFilteredHunts,
} from "./Handlers/huntHandlers";
import { ModalProvider } from "./Context/modalContext";
function HuntsPage() {
  const dispatch = useDispatch();
  const { hunts, status, error } = useSelector((state) => state.hunt);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("huntName");
  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState("Name");
  const [huntStatus, setHuntStatus] = useState("Any");
  const [selectedHuntId, setSelectedHuntId] = useState(null);

  useEffect(() => {
    dispatch(getAllHunts());
  }, [dispatch]);

  const filteredHunts = getFilteredHunts(hunts, search, filterBy, huntStatus);
  const userActiveHuntId = useSelector((state) => state.auth.user[0].currentHuntId);
  const userCreatedHuntIds = useSelector((state) => state.auth.user[0].createdHuntIds) || [];
  return (
    <ModalProvider>
      <React.Fragment>
        <Sheet
          variant="soft"
          sx={{
            opacity: 0.95,
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            borderRadius: "10px",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs md={3.66}>
              <FormControl>
                <FormLabel>Search</FormLabel>
                <Input
                  label="Search"
                  placeholder="..."
                  value={search}
                  onChange={(e) => handleSearchChange(e, setSearch)}
                />
              </FormControl>
            </Grid>
            <Grid item xs md={3.66}>
              <FormControl variant="outlined">
                <FormLabel>Search In</FormLabel>
                <Select
                  onChange={(e, newValue) =>
                    handleFilterByChange(e, newValue, setFilterBy)
                  }
                  defaultValue={filterBy}
                >
                  <Option value="Name">Name</Option>
                  <Option value="Town">Town</Option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs md={3.66}>
              <FormControl variant="outlined">
                <FormLabel>Status</FormLabel>
                <Select
                  onChange={(e, newValue) =>
                    handleStatusChange(e, newValue, setHuntStatus)
                  }
                  defaultValue={huntStatus}
                >
                  <Option value="Any">Any</Option>
                  <Option value="Not Started">Not Started</Option>
                  <Option value="Active">Active</Option>
                  <Option value="Ended">Ended</Option>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs
              md={1}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="solid"
                color="primary"
                onClick={handleCreate}
                sx={{ width: "100%", height: "100%" }}
              >
                Create Hunt
              </Button>
            </Grid>
          </Grid>
          {status === "loading" ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
              <CircularProgress />
            </Box>
          ) : status === "failed" ? (
            <Typography variant="h6" color="error" sx={{ p: 2 }}>
              {error}
            </Typography>
          ) : (
            <HuntsTable
              hunts={filteredHunts}
              userActiveHuntId = {userActiveHuntId}
              userCreatedHuntIds = {userCreatedHuntIds}
              order={order}
              orderBy={orderBy}
              onRequestSort={(e, property) =>
                handleRequestSort(
                  e,
                  property,
                  order,
                  setOrder,
                  setOrderBy,
                  orderBy
                )
              }
              selectedHuntId={selectedHuntId}
              setSelectedHuntId={setSelectedHuntId}
              handleJoin={(hunt) => handleJoin(dispatch, hunt)}
              handleEdit={(hunt) => handleEdit(hunt)}
              handleDelete={(hunt) =>
                handleDelete(dispatch, hunt, setSelectedHuntId)
              }
              handleExit={(hunt) =>
                handleExit(dispatch, hunt, setSelectedHuntId)
              }
            />
          )}
        </Sheet>
      </React.Fragment>
    </ModalProvider>
  );
}

export default HuntsPage;
