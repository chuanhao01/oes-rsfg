import { Helmet } from "react-helmet";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/Home/Home";
import { CssBaseline } from "@mui/material";
import { useState, useMemo, createContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ROUTER_BASE_NAME } from "@/config";

export const ColorModeContext = createContext({
  toggleColorMode: () => {
    // If the toggle color mode breaks for whatever reason, Empty func
  },
});

export default function App() {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const router = createBrowserRouter([{ path: "/", element: <Home /> }], {
    basename: "/oes-rsfg/",
  });

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Helmet>
            <meta charSet="UTF-8" />
            <title>OES-RSFG</title>
          </Helmet>
          <RouterProvider router={router} />
        </CssBaseline>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
