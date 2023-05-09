import Head from "next/head";
import { Provider } from "react-redux";
import store from "../src/redux/store";
import "../styles/globals.css";

import { DAppProvider } from '@usedapp/core';

export const ArbitrumGoerliChain = {
  chainId: 421613,
  chainName: 'Arbitrum Goerli',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0x0000000000000000000000000000000000000000',
  getExplorerAddressLink: (address) => `https://goerli.arbiscan.io/address/${address}`,
  getExplorerTransactionLink: (transactionHash) => `https://goerli.arbiscan.io/tx/${transactionHash}`,
  // Optional parameters:
  rpcUrl: 'https://soft-muddy-fire.arbitrum-goerli.quiknode.pro/52f6f81b9b0ff29b6e5bd53967f1f5138650e2fb',
  blockExplorerUrl: 'https://goerli.arbiscan.io',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  }
}

export const ArbitrumOneChain = {
  chainId: 42161,
  chainName: 'Arbitrum One',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0x0000000000000000000000000000000000000000',
  getExplorerAddressLink: (address) => `https://arbiscan.io/address/${address}`,
  getExplorerTransactionLink: (transactionHash) => `https://arbiscan.io/tx/${transactionHash}`,
  // Optional parameters:
  rpcUrl: 'https://arb1.arbitrum.io/rpc',
  blockExplorerUrl: 'https://arbiscan.io',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  }
}

function MyApp({ Component, pageProps }) {

  const config = {
    readOnlyChainId: ArbitrumOneChain.chainId,
    readOnlyUrls: {
      [ArbitrumOneChain.chainId]: ArbitrumOneChain.rpcUrl
    },
  }

  return (
    <DAppProvider config={config}>


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
    </DAppProvider>

  );
}

export default MyApp;
