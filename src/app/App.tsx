import { useState } from "react";
import Stack from "@mui/material/Stack";
import TopToolbar from "./TopToolbar";
import { useGameContext } from "../game";
import { zip } from "../util";
import { AddPlayerDialog, ConfirmDialog } from "./Dialogs";
import PlayerCard from "./PlayerCard";

export default function App() {
  const { addPlayer, resetScores, players, playerScores, selectedGame } =
    useGameContext();
  const [showAddPlayerDialog, setShowAddPlayerDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const canAddPlayer = players.length < (selectedGame.maxPlayers ?? 100);

  function handleDialogClose() {
    setShowAddPlayerDialog(false);
  }

  function handleDialogOk(name: string) {
    addPlayer(name);
    handleDialogClose();
  }

  function handleAddPlayer() {
    setShowAddPlayerDialog(true);
  }

  function handleResetData() {
    setShowConfirmDialog(true);
  }

  function handleConfirmDialogClose(confirmed: boolean) {
    if (confirmed) {
      resetScores();
    }
    setShowConfirmDialog(false);
  }

  const playerData = zip(players, playerScores);

  return (
    <>
      <TopToolbar
        title={selectedGame.name}
        onAddPlayer={handleAddPlayer}
        onClearScores={handleResetData}
        canAddPlayer={canAddPlayer}
      />
      <Stack>
        {playerData.map(([name, score], idx) => (
          <PlayerCard
            playerIndex={idx}
            playerName={name}
            score={score}
            key={name}
          />
        ))}
      </Stack>
      {showAddPlayerDialog && (
        <AddPlayerDialog
          playerCount={playerData.length}
          onCancel={handleDialogClose}
          onOk={handleDialogOk}
        />
      )}
      {showConfirmDialog && (
        <ConfirmDialog
          title="Reset All Scores?"
          onClose={handleConfirmDialogClose}
        />
      )}
    </>
  );
}
