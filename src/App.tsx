import { Helmet } from "react-helmet";
import faviconUrl from "@/assets/favicon.png";

export default function App() {
  return (
    <main>
      <Helmet>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/png " href={faviconUrl} />
        <title>OES-RSFG</title>
      </Helmet>
    </main>
  );
}
