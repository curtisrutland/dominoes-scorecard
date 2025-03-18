import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGameContext } from "../game";
import { RenamePlayerDialog, ConfirmDialog } from "./Dialogs";
import { formatNumber } from "../util/number";

interface PlayerCardProps {
  playerName: string;
  score: number;
  playerIndex: number;
}

export default function PlayerCard(props: PlayerCardProps) {
  const { playerName, score, playerIndex } = props;
  const { addToScore, changePlayerName, removePlayer, selectedGame, players } =
    useGameContext();
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const canDelete = players.length > (selectedGame.minPlayers ?? 0);

  function increment(value: number) {
    return function () {
      addToScore(playerIndex, value);
    };
  }

  function handleEditPlayerClick() {
    setShowRenameDialog(true);
  }

  function handleDialogCancel() {
    setShowRenameDialog(false);
  }

  function handleDialogOk(name: string) {
    changePlayerName(playerIndex, name);
    handleDialogCancel();
  }

  function handleDeleteClick() {
    setShowConfirmDialog(true);
  }

  function handleConfirmDialogClose(confirmed: boolean) {
    if (confirmed) {
      handleDeletePlayer();
    }
    setShowConfirmDialog(false);
  }

  function handleDeletePlayer() {
    removePlayer(playerIndex);
  }

  return (
    <>
      <Card sx={{ margin: "1rem" }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row">
              <IconButton onClick={handleEditPlayerClick} size="small">
                <MoreVertIcon />
              </IconButton>
              <Typography variant="h5">{playerName}</Typography>
            </Stack>
            <Typography variant="h5">{score}</Typography>
          </Stack>
        </CardContent>
        <Divider />
        <CardActions>
          <Stack direction="row" flexGrow={1} justifyContent="space-between">
            <Stack direction="row">
              {selectedGame.buttons.map((val) => (
                <Button
                  onClick={increment(val)}
                  color={val > 0 ? "success" : "warning"}
                  key={val}
                >
                  {formatNumber(val)}
                </Button>
              ))}
            </Stack>
            <IconButton
              color="error"
              onClick={handleDeleteClick}
              disabled={!canDelete}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        </CardActions>
      </Card>
      {showRenameDialog && (
        <RenamePlayerDialog
          currentName={playerName}
          onCancel={handleDialogCancel}
          onOk={handleDialogOk}
        />
      )}
      {showConfirmDialog && (
        <ConfirmDialog
          onClose={handleConfirmDialogClose}
          title={`Delete Score for ${playerName}?`}
        />
      )}
    </>
  );
}
