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
import { useTranslation } from "react-i18next";
import HuntsTable from "./HuntsTable/HuntsTable";
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
import { useModal } from "./Context/modalContext";
import CreateHuntModal from "./Modals/CreateHuntModal";
import InnerPageSheet from "../PageStructure/InnerPageSheet";

function HuntsPage({ globalFilter = { key: "", value: "" } }) {
  const { t } = useTranslation();
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

  const filteredHunts = getFilteredHunts(
    hunts,
    search,
    filterBy,
    huntStatus,
    globalFilter
  );
  const userActiveHuntId = useSelector(
    (state) => state.auth.user.currentHuntId
  );
  const userCreatedHuntIds =
    useSelector((state) => state.auth.user.createdHuntIds) || [];

  const { openModal, modalState } = useModal();

  return (
    <React.Fragment>
      <InnerPageSheet
        variant="soft"
        sx={{
          opacity: 0.95,
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          borderRadius: "10px",
          overflow: "auto",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={6} md={3.66}>
            <FormControl>
              <FormLabel>{t('search')}</FormLabel>
              <Input
                label={t('search')}
                placeholder="..."
                value={search}
                onChange={(e) => handleSearchChange(e, setSearch)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} md={3.66}>
            <FormControl variant="outlined">
              <FormLabel>{t('searchIn')}</FormLabel>
              <Select
                onChange={(e, newValue) =>
                  handleFilterByChange(e, newValue, setFilterBy)
                }
                defaultValue={filterBy}
              >
                <Option value="Name">{t('name')}</Option>
                <Option value="Town">{t('town')}</Option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={3.66}>
            <FormControl variant="outlined">
              <FormLabel>{t('status')}</FormLabel>
              <Select
                onChange={(e, newValue) =>
                  handleStatusChange(e, newValue, setHuntStatus)
                }
                defaultValue={huntStatus}
              >
                <Option value="Any">{t('any')}</Option>
                <Option value="Not Started">{t('notStarted')}</Option>
                <Option value="Active">{t('active')}</Option>
                <Option value="Ended">{t('ended')}</Option>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={6}
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
              onClick={() =>
                openModal("isCreateModalOpen", {
                  titleText: t('createHunt'),
                  cancelText: t('cancel'),
                  saveText: t('createHunt'),
                  handleSave: (updatedHunt) =>
                    handleCreate(dispatch, updatedHunt),
                })
              }
              sx={{ width: "100%", height: "100%" }}
            >
              {t('createHunt')}
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
          <Box
            sx={{
              maxWidth: "100%",
              overflow: "auto",
            }}
          >
            <HuntsTable
              hunts={filteredHunts}
              userActiveHuntId={userActiveHuntId}
              userCreatedHuntIds={userCreatedHuntIds}
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
              handleEdit={handleEdit}
              handleDelete={(huntId) =>
                handleDelete(dispatch, huntId, setSelectedHuntId)
              }
              handleExit={() => handleExit(dispatch, setSelectedHuntId)}
            />
          </Box>
        )}
      </InnerPageSheet>
      {modalState["isCreateModalOpen"] && (
        <CreateHuntModal modalName="isCreateModalOpen" />
      )}
    </React.Fragment>
  );
}

export default HuntsPage;
