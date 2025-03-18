import { useContext } from "react";
import { GameContext } from "./GameContext";
import { GameData } from "./gameData";

export function useGameContext(): GameData {
  const data = useContext(GameContext);
  return { ...data };
}
