import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { socket, SocketContext } from "../context/socket";
import { UserContext } from "../context/admin";
import { useState } from "react";
import { Users } from "../enums/user";

function MyApp({ Component, pageProps }: AppProps) {
  const [context, setContext] = useState<Users>(Users.USER);
  return (
    <UserContext.Provider value={[context, setContext]}>
      <SocketContext.Provider value={socket}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SocketContext.Provider>
    </UserContext.Provider>
  );
}

export default MyApp;
