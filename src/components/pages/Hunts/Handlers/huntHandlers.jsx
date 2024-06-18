import { getAllHunts, joinHuntById } from "../../../../features/hunt/huntSlice";

export const handleRequestSort = (event, property, order, setOrder, setOrderBy, orderBy) => {
  const isAsc = orderBy === property && order === "asc";
  setOrder(isAsc ? "desc" : "asc");
  setOrderBy(property);
};

export const handleSearchChange = (e, setSearch) => {
  setSearch(e.target.value);
};

export const handleFilterByChange = (e, newValue, setFilterBy) => {
  setFilterBy(newValue);
};

export const handleStatusChange = (e, newValue, setHuntStatus) => {
  setHuntStatus(newValue);
};

export const handleRowClick = (hunt, setSelectedHunt) => {
    setSelectedHunt((prevSelectedHunt) => 
      prevSelectedHunt && prevSelectedHunt._id === hunt._id ? null : hunt
    );
  };

export const handleCreate = () => {
  // Logic for creating a new hunt
};

export const handleJoin = (dispatch, selectedHunt) => {
  if (selectedHunt) {
     dispatch(joinHuntById(selectedHunt._id));
  }
};

export const handleEdit = (selectedHunt) => {
  if (selectedHunt) {
    // Logic for editing the selected hunt
  }
};

export const handleDelete = (dispatch, selectedHunt, setSelectedHunt) => {
  if (selectedHunt) {
   // dispatch(deleteHunt(selectedHunt._id));
    setSelectedHunt(null);
  }
};

export const handleExit = (dispatch, selectedHunt, setSelectedHunt) => {
  if (selectedHunt) {
    //dispatch(exitHunt(selectedHunt._id));
    setSelectedHunt(null);
  }
};

export const getFilteredHunts = (hunts, search, filterBy, huntStatus) => {
  const searchTerm = search.toLowerCase();
  const now = new Date();
  return hunts.filter((hunt) => {
    const matchesSearch =
      filterBy === "Name"
        ? hunt.huntName.toLowerCase().includes(searchTerm)
        : hunt.townName.toLowerCase().includes(searchTerm);

    const matchesStatus =
      huntStatus === "Any"
        ? true
        : huntStatus === "Not Started"
        ? new Date(hunt.startTime) > now
        : huntStatus === "Active"
        ? new Date(hunt.startTime) <= now && new Date(hunt.endTime) > now
        : new Date(hunt.endTime) < now;

    return matchesSearch && matchesStatus;
  });
};
