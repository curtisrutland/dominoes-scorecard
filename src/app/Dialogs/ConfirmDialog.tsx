import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

interface ConfirmDialogProps {
  onClose(confirmed: boolean): void;
  title: string;
  okText?: string;
  cancelText?: string;
}

export default function ConfirmDialog(props: ConfirmDialogProps) {
  const { onClose, title, okText = "Yes", cancelText = "No" } = props;

  function handleCancel() {
    onClose(false);
  }

  function handleOk() {
    onClose(true);
  }

  return (
    <Dialog
      open
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogActions>
        <Button endIcon={<CloseIcon color="error" />} onClick={handleCancel}>
          {cancelText}
        </Button>
        <Button endIcon={<CheckIcon color="success" />} onClick={handleOk}>
          {okText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
