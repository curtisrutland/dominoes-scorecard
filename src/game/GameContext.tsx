import { createContext, useState, PropsWithChildren } from "react";
import { defaultGameData } from "./gameData";
import { defaultGameConfig, GameConfig } from "./gameConfiguration";

export const GameContext = createContext(defaultGameData);

function generate(config: GameConfig): [string[], number[]] {
  const scores = new Array(config.minPlayers ?? 2).fill(0);
  const names =
    config.defaultPlayerNames ?? scores.map((_, i) => `Player ${i + 1}`);
  return [names, scores];
}

interface GameContextProviderProps extends PropsWithChildren {}

export function GameContextProvider({ children }: GameContextProviderProps) {
  const [initPlayers, initScores] = generate(defaultGameConfig);
  const [players, setPlayers] = useState(initPlayers);
  const [playerScores, setPlayerScores] = useState(initScores);
  const [selectedGame, setSelectedGame] = useState(defaultGameConfig);

  function addToScore(playerIndex: number, value: number) {
    const newScores = [...playerScores];
    newScores[playerIndex] += value;
    setPlayerScores(newScores);
  }

  function changePlayerName(playerIndex: number, newName: string) {
    const newPlayers = [...players];
    newPlayers[playerIndex] = newName;
    setPlayers(newPlayers);
  }

  function addPlayer(name: string, defaultScore = 0) {
    setPlayers([...players, name]);
    setPlayerScores([...playerScores, defaultScore]);
  }

  function removePlayer(playerIndex: number) {
    const newPlayers: string[] = [];
    const newPlayerScores: number[] = [];
    for (let i = 0; i < players.length; i++) {
      if (i !== playerIndex) {
        newPlayers.push(players[i]);
        newPlayerScores.push(playerScores[i]);
      }
    }
    setPlayers(newPlayers);
    setPlayerScores(newPlayerScores);
  }

  function resetScores() {
    setPlayerScores(playerScores.map((_) => 0));
  }

  function changeGame(config: GameConfig) {
    setSelectedGame(config);
    const [initPlayers, initScores] = generate(config);
    setPlayers(initPlayers);
    setPlayerScores(initScores);
  }

  return (
    <GameContext.Provider
      value={{
        addPlayer,
        addToScore,
        changePlayerName,
        removePlayer,
        resetScores,
        players,
        playerScores,
        selectedGame,
        changeGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
