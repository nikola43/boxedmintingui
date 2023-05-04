import Link from "next/link";
import { Fragment, useState } from "react";
import { connect } from "react-redux";
import { navigationToggle, walletToggle } from "../redux/actions/siteSettings";
import { useEthers } from '@usedapp/core';
const MobileNavigation = ({ walletToggle, navigationToggle }) => {

  const { account, deactivate, activateBrowserWallet } = useEthers()
  const [toggle, setToggle] = useState(false);

  function getWalletAbreviation(
    walletAddress
  ) {
    if (walletAddress !== null && walletAddress !== undefined) {
      return walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4);
    }
    return "";
  }




  return (
    <Fragment>
      <div className="metaportal_fn_mobnav">
        <div className="mob_top">
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
        <div className="mob_mid">
          <div className="logo">
            <Link href="/">
              <a>
                <img src="/img/logo.png" alt="" width="50px" height="50px" />
              </a>
            </Link>
          </div>
          <div
            className={`trigger ${toggle ? "active" : ""}`}
            onClick={() => setToggle(!toggle)}
          >
            <span />
          </div>
        </div>
        <div className="mob_bot" style={{ display: toggle ? "block" : "none" }}>
          <ul>
            <li>
              <a className="creative_link" href="#home">
                Home
              </a>
            </li>
            <li>
              <a className="creative_link" href="#about">
                About
              </a>
            </li>
            <li>
              <a className="creative_link" href="#mint">
                Mint
              </a>
            </li>
            <li>
              <a className="creative_link" href="#collection">
                Collection
              </a>
            </li>
            <li>
              <a className="creative_link" href="#roadmap">
                Roadmap
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  navigation: state.site.navigation,
});

export default connect(mapStateToProps, { walletToggle, navigationToggle })(
  MobileNavigation
);
