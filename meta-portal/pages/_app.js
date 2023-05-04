import Head from "next/head";
import { Provider } from "react-redux";
import store from "../src/redux/store";
import "../styles/globals.css";
//const Web3 = require('web3');
//const web3 = new Web3();
import { Web3ReactProvider } from '@web3-react/core'
import { initializeConnector } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { Web3Provider } from "@ethersproject/providers";

/*
export const [metaMask, hooks] = initializeConnector < MetaMask > ((actions) => new MetaMask({ actions }))

const connectors = [
  [metaMask, metaMaskHooks]
]
*/

function MyApp({ Component, pageProps }) {

  function getLibrary(provider, connector) {
    return new Web3Provider(provider);
  }
  /*

  */
  /*
 

      <Web3ReactProvider connectors={connectors}>

  */

  /*
  function getLibrary(provider) {
    return new Web3(provider)
  }
  */

  return (
    <Web3ReactProvider getLibrary={getLibrary}>


      <Provider store={store}>

        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Heebo:wght@100;200;300;400;500;600;700;800;900&family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
          {/* !Google Fonts */}
          {/* Styles */}
          <link
            type="text/css"
            rel="stylesheet"
            href="/css/plugins.css?ver=4.1"
          />
          <link type="text/css" rel="stylesheet" href="/css/style.css?ver=4.1" />
        </Head>
        <Component {...pageProps} />
      </Provider>
    </Web3ReactProvider>

  );
}

export default MyApp;
