import { DeleteForeverOutlined, DetailsRounded } from "@mui/icons-material";
import { Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, Modal, ModalClose, ModalDialog, Sheet, Typography } from "@mui/joy";

function DeleteModal({ open, setOpen, onDelete, isLoading, itemName }) {
    return (
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog layout="center" sx={{ position: 'absolute' }}>
          <ModalClose variant="plain" />
          <DialogTitle id="modal-title">
            <DetailsRounded />
            Confirm Deletion of <Typography level="title-lg" color="warning">{itemName}</Typography>
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ width: '40dvh', maxWidth: 800 }}>
            <Sheet>
              <Typography level="body-lg">
                This action cannot be undone!
              </Typography>
            </Sheet>
          </DialogContent>
          <DialogActions>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Button size="lg" variant="solid" color="primary" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button size="lg" variant="solid" color="danger" endDecorator={<DeleteForeverOutlined />} onClick={onDelete} loading={isLoading}>
                  Delete
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </ModalDialog>
      </Modal>
    );
  }
  
export default DeleteModal;