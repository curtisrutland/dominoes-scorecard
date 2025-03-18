import CustomFormDialog from "./CustomFormDialog";

interface AddPlayerDialogProps {
  playerCount?: number;
  onOk(newName: string): void;
  onCancel(): void;
}

export default function AddPlayerDialog(props: AddPlayerDialogProps) {
  const { playerCount = 0, onOk, onCancel } = props;
  const defaultText = `Player ${playerCount + 1}`;

  return (
    <CustomFormDialog
      title="Add Player"
      defaultValue={defaultText}
      onCancel={onCancel}
      onOk={onOk}
    />
  );
}
