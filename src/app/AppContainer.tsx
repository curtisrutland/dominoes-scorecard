import Theme from "./Theme";
import { GameContextProvider } from "../game";
import App from "./App";

export default function AppContainer() {
  return (
    <Theme>
      <GameContextProvider defaultPlayerCount={2}>
        <App />
      </GameContextProvider>
    </Theme>
  );
}
