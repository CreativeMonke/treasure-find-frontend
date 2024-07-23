import { useDispatch } from "react-redux";
import {
  createHunt,
  deleteHuntById,
  editHuntOptionsById,
  exitHuntByUserHuntId,
  getAllHunts,
  joinHuntById,
  joinHuntByIdAndGetLocations,
} from "../../../../features/hunt/huntSlice";

export const handleRequestSort = (
  event,
  property,
  order,
  setOrder,
  setOrderBy,
  orderBy
) => {
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

export async function handleCreate(dispatch, updatedHunt) {
  if (updatedHunt) {
    await dispatch(createHunt(updatedHunt));
  }
}

export const handleJoin = async (dispatch, selectedHunt) => {
  if (selectedHunt) {
    dispatch(joinHuntByIdAndGetLocations(selectedHunt._id));
  }
};

export async function handleEdit(dispatch, updatedHunt) {
  if (updatedHunt) {
    await dispatch(editHuntOptionsById(updatedHunt));
  }
}

export const handleDelete = (dispatch, huntId, setSelectedHuntId) => {
  if (huntId) {
    dispatch(deleteHuntById(huntId));
    setSelectedHuntId(null);
  }
};

export async function handleExit(dispatch, setSelectedHuntId) {
  await dispatch(exitHuntByUserHuntId());
  if (setSelectedHuntId) {
    setSelectedHuntId(null);
  }
}

export const getFilteredHunts = (
  hunts,
  search,
  filterBy,
  huntStatus,
  globalFilter
) => {
  const searchTerm = search.toLowerCase();
  const now = new Date();
  return hunts.filter((hunt) => {
    const matchesGlobal = globalFilter.key
      ? hunt[globalFilter.key]
          ?.toLowerCase()
          .includes(globalFilter.value.toLowerCase())
      : true;

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

    return matchesGlobal && matchesSearch && matchesStatus;
  });
};
