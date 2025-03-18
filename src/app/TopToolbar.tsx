import { useState, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import PhonelinkLockIcon from "@mui/icons-material/PhonelinkLock";
import {
  defaultGameConfig,
  GameConfig,
  gameConfigurations,
} from "../game/gameConfiguration";
import { ConfirmDialog } from "./Dialogs";
import { useGameContext } from "../game";
import { useWakeLock } from "./useWakeLock";

interface TopToolbarProps {
  title: string;
  canAddPlayer?: boolean;
  onAddPlayer(): void;
  onClearScores(): void;
}

export default function TopToolbar(props: TopToolbarProps) {
  const { title, canAddPlayer = true, onAddPlayer, onClearScores } = props;
  const { changeGame } = useGameContext();
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingSelectedGame, setPendingSelectedGame] =
    useState(defaultGameConfig);
  const { isSupported, request } = useWakeLock({
    onRequest() {
      console.log("requested");
    },
    onError(err) {
      console.error(err);
    },
    onRelease() {
      console.log("released");
    },
  });

  function handleSelectGame(game: GameConfig) {
    return function () {
      setPendingSelectedGame(game);
      setShowConfirmDialog(true);
      handleMenuClose();
    };
  }

  function handleAddPlayer() {
    onAddPlayer();
    handleMenuClose();
  }

  function handleResetScores() {
    onClearScores();
    handleMenuClose();
  }

  function handleConfirmDialogClose(confirmed: boolean) {
    if (confirmed) {
      changeGame(pendingSelectedGame);
    }
    setShowConfirmDialog(false);
  }

  function handleMenuClick(event: MouseEvent<HTMLElement>) {
    setMenuAnchor(event.currentTarget);
  }

  function handleMenuClose() {
    setMenuAnchor(null);
  }

  function handleRequestWakeLock() {
    if (isSupported) {
      request();
    }
    handleMenuClose();
  }

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <IconButton onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={menuAnchor}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
          >
            <MenuList>
              <ListSubheader>Actions</ListSubheader>
              <MenuItem onClick={handleAddPlayer} disabled={!canAddPlayer}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText>Add Player</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleResetScores}>
                <ListItemIcon>
                  <DeleteSweepIcon color="error" />
                </ListItemIcon>
                <ListItemText>Reset Scorecard</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleRequestWakeLock}>
                <ListItemIcon>
                  <PhonelinkLockIcon />
                  Keep Screen On
                </ListItemIcon>
              </MenuItem>
              <Divider />
              <ListSubheader>Change Game</ListSubheader>
              {gameConfigurations.map((c) => (
                <MenuItem key={c.name} onClick={handleSelectGame(c)}>
                  {c.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Toolbar>
      </AppBar>
      {showConfirmDialog && (
        <ConfirmDialog
          title="Switch Game?"
          onClose={handleConfirmDialogClose}
        />
      )}
    </>
  );
}
