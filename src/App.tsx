import { Helmet } from "react-helmet";
import faviconUrl from "@/assets/favicon.png";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/Home/Home";
import { CssBaseline } from "@mui/material";

export default function App() {
  const router = createBrowserRouter([{ path: "/", element: <Home /> }]);
  return (
    <CssBaseline>
      <Helmet>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/png " href={faviconUrl} />
        <title>OES-RSFG</title>
      </Helmet>
      <RouterProvider router={router} />
    </CssBaseline>
  );
}
