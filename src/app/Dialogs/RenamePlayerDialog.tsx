import CustomFormDialog from "./CustomFormDialog";

interface RenamePlayerDialogProps {
  currentName: string;
  onOk(newName: string): void;
  onCancel(): void;
}

export default function RenamePlayerDialog(props: RenamePlayerDialogProps) {
  const { currentName, onOk, onCancel } = props;

  return (
    <CustomFormDialog
      title="Add Player"
      defaultValue={currentName}
      onCancel={onCancel}
      onOk={onOk}
    />
  );
}
