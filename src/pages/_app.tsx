import type { AppProps } from "next/app";
import { Layout } from "components/layout";
import { Web3Provider } from "providers/Web3";
import { ChakraProvider } from "providers/Chakra";
import { useIsMounted } from "hooks/useIsMounted";
import React from "react";
import { useRouter } from "next/router";
import { Head } from "components/layout/Head";

export default function App({ Component, pageProps }: AppProps) {
  const isMounted = useIsMounted();
  const router = useRouter();

  // no layout for the home page
  if (router.pathname === `/`)
    return (
      <ChakraProvider>
        <Head />
        {isMounted && <Component {...pageProps} />}
      </ChakraProvider>
    );
  else {
    //the root component
    return (
      <ChakraProvider>
        <Web3Provider>
          {isMounted && (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </Web3Provider>
      </ChakraProvider>
    );
  }
}
