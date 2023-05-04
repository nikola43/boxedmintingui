import { useEthers } from '@usedapp/core';
import Link from "next/link";
import { useEffect } from "react";
import { connect } from "react-redux";
import { navigationToggle, walletToggle } from "../redux/actions/siteSettings";
import { stickyNav } from "../utilits";


const Header = ({ walletToggle, navigationToggle }) => {

  const { account, deactivate, activateBrowserWallet } = useEthers()


  useEffect(() => {
    stickyNav();
  }, []);





  /*
  useEffect(() => {
    const isWalletConnected = localStorage.getItem("isWalletConnected");
    const connector = localStorage.getItem("connector");
    if (isWalletConnected === "true" && connector === "injected") {
      activate(injected);
    }
  }, [active]);
  */



  function getWalletAbreviation(
    walletAddress
  ) {
    if (walletAddress !== null && walletAddress !== undefined) {
      return walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4);
    }
    return "";
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
            {account ? (
              <a className="metaportal_fn_button wallet_opener" onClick={deactivate}>
                <span>{getWalletAbreviation(account)}</span>
              </a>
            ) : (

              <a className="metaportal_fn_button wallet_opener" onClick={activateBrowserWallet}>
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
