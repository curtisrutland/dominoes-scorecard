export interface GameConfig {
  name: string;
  maxPlayers?: number;
  minPlayers?: number;
  buttons: number[];
  defaultPlayerNames?: string[];
}

const fivesConfig: GameConfig = {
  name: "Fives",
  maxPlayers: 4,
  minPlayers: 2,
  buttons: [-10, -5, 5, 10],
};
const fourtyTwoConfig: GameConfig = {
  name: "Fourty Two",
  maxPlayers: 2,
  minPlayers: 2,
  buttons: [-1, +1],
  defaultPlayerNames: ["Us", "Them"],
};
const moonConfig: GameConfig = {
  name: "Moon",
  maxPlayers: 3,
  minPlayers: 3,
  buttons: [-1, +1],
};

export const gameConfigurations: GameConfig[] = [
  fivesConfig,
  fourtyTwoConfig,
  moonConfig,
];

export const defaultGameConfig = fourtyTwoConfig;