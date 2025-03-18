import { FormEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export interface CustomDialogProps {
  title: string;
  defaultValue: string;
  onOk(value: string): void;
  onCancel(): void;
}

export default function CustomFormDialog(props: CustomDialogProps) {
  const { title, defaultValue, onOk, onCancel } = props;

  function handleClose() {
    onCancel();
  }

  function formSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const name = formJson.name as string;
    onOk(name);
  }

  function autoSelect(ref: HTMLInputElement | null) {
    console.log("autoselect");
    ref?.select();
  }

  return (
    <Dialog
      fullWidth
      open
      onClose={handleClose}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: formSubmit,
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          inputRef={autoSelect}
          required
          margin="dense"
          id="dlg-name"
          name="name"
          label="Enter Player Name"
          defaultValue={defaultValue ?? ""}
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Add Player</Button>
      </DialogActions>
    </Dialog>
  );
}
