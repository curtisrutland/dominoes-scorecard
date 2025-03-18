import { PropsWithChildren } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Theme({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>{children}</main>
    </ThemeProvider>
  );
}
