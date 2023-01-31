import Logo from "@/assets/logo.png";
import HelloWorld from "@/components/HelloWorld/HelloWorld";
import { Helmet } from "react-helmet";

export default function App() {
  return (
    <main>
      <Helmet>
        <meta charSet="UTF-8" />
        <title>OES-RSFG</title>
      </Helmet>
    </main>
  );
}
