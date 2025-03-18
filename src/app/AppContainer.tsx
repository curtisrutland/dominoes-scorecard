import Theme from "./Theme";
import { GameContextProvider } from "../game";
import App from "./App";

export default function AppContainer() {
  return (
    <Theme>
      <GameContextProvider>
        <App />
      </GameContextProvider>
    </Theme>
  );
}
