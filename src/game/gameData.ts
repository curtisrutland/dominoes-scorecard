import { noOp } from "../util";
import { GameConfig, defaultGameConfig } from "./gameConfiguration";

export interface GameData {
  addToScore(playerIndex: number, value: number): void;
  changePlayerName(playerIndex: number, newName: string): void;
  addPlayer(name: string, defaultScore?: number): void;
  removePlayer(playerIndex: number): void;
  resetScores(): void;
  players: string[];
  playerScores: number[];
  selectedGame: GameConfig;
  changeGame(config: GameConfig): void;
}

export const defaultGameData: GameData = {
  addToScore: noOp,
  changePlayerName: noOp,
  addPlayer: noOp,
  removePlayer: noOp,
  resetScores: noOp,
  players: [],
  playerScores: [],
  selectedGame: defaultGameConfig,
  changeGame: noOp,
};
