import Link from "next/link";
import { useEffect } from "react";
import { connect } from "react-redux";
import { navigationToggle, walletToggle } from "../redux/actions/siteSettings";
import { stickyNav } from "../utilits";
import { useWeb3React } from "@web3-react/core";
import { injected, swithNetwork } from "../blockchain/metamaskConnector";
import ChainParams from "../blockchain/chainParams";

const Header = ({ walletToggle, navigationToggle }) => {
  useEffect(() => {
    stickyNav();
  }, []);

  const selectedChainId = 421613;
  const { active, account, library, activate, deactivate, chainId } =
    useWeb3React();

  useEffect(() => {
    swithNetwork(ChainParams[0]);

    /*
    if (active && chainId !== selectedChainId) {
      swithNetwork(ChainParams[0]);
    }
    */
  }, [chainId]);

  useEffect(() => {
    const isWalletConnected = localStorage.getItem("isWalletConnected");
    const connector = localStorage.getItem("connector");
    if (isWalletConnected === "true" && connector === "injected") {
      activate(injected);
    }
  }, [active]);

  async function connectMetamaks() {
    try {
      await activate(injected, undefined, true);
      localStorage.setItem("connector", "injected");
      localStorage.setItem("isWalletConnected", "true");
    } catch (ex) {
      console.log(ex.code);
    }
  }

  function getWalletAbreviation(
    walletAddress
  ) {
    if (walletAddress !== null && walletAddress !== undefined) {
      return walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4);
    }
    return "";
  }

  async function disconnectMetamaks() {
    try {
      deactivate();
      localStorage.setItem("isWalletConnected", "false");
      localStorage.removeItem("connector");
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <header id="header">
      <div className="header">
        <div className="header_in">
          <div className="trigger_logo">
            <div className="logo">
              <Link href="/">
                <a>
                  <img src="/img/logo.png" alt="" />
                </a>
              </Link>
            </div>
          </div>
          <div className="nav" style={{ opacity: 1 }}>
            <ul>
              <li>
                <Link href="/#home">
                  <a className="creative_link">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/#about">
                  <a className="creative_link">About</a>
                </Link>
              </li>
              <li>
                <Link href="/#collection">
                  <a className="creative_link">Collection</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="wallet">
            {active ? (
              <a className="metaportal_fn_button wallet_opener" onClick={disconnectMetamaks}>
                <span>{getWalletAbreviation(account)}</span>
              </a>
            ) : (

              <a className="metaportal_fn_button wallet_opener" onClick={connectMetamaks}>
                <span>Connect Wallet</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { walletToggle, navigationToggle })(
  Header
);
