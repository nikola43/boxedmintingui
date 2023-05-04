
import { useWeb3React } from "@web3-react/core";
import { injected } from "../blockchain/metamaskConnector";
import { useEffect, useState } from "react";
import nftMintContractAbi from "../blockchain/abi/NftMint.json";
import usdtAbi from "../blockchain/abi/Token.json";
import toast, { Toaster } from "react-hot-toast";
import { Contract } from '@ethersproject/contracts'
import { useEthers } from '@usedapp/core';
import { useContractFunction, useTokenAllowance, useTokenBalance } from "@usedapp/core";


const NftMintAddress = "0xf3347271f810401Fa6Fa65B236d331948A3bE4c6";
const USDTAddress = "0x43B552A6A5B97f120788A8751547D5D953eFBBcA";

const About = () => {


  const { account, deactivate, activateBrowserWallet } = useEthers()


  const [isMintingOneLoading, setIsMintingOneLoading] = useState(false);
  const [isApproveLoading, setIsApproveLoading] = useState(false);
  const [cost, setCost] = useState("0");
  const [allowance, setAllowance] = useState("0");
  const [amount, setAmount] = useState(1);
  const [mintedAmount, setMintedAmount] = useState(0);
  const [maxSupply, setMaxSupply] = useState("0");
  const [usdtBalance, setUsdtBalance] = useState("0");

  let nftMintContract;
  let usdtContract;

  nftMintContract = new Contract(NftMintAddress, nftMintContractAbi)
  usdtContract = new Contract(USDTAddress, usdtAbi);

  const { state: approveState, send: approveSend } = useContractFunction(usdtContract, "approve", { transactionName: "approve" });
  const { state: mintState, send: mintSend } = useContractFunction(nftMintContract, "mintNFTs", { transactionName: "mintNFTs" });
  const usdtAllowance = useTokenAllowance(USDTAddress, account, NftMintAddress);
  const usdtUserBalance = useTokenBalance(USDTAddress, account);

  useEffect(() => {
    if (account) {
      setAllowance(usdtAllowance);
      setUsdtBalance(usdtUserBalance);
      //send(NftMintAddress, "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");




      /*getUSDTAllowance().then(() => { });
      getCost().then(() => { });
      getTotalSupply().then(() => { });
      getMaxSupply().then(() => { });
      getUsdtBalance().then(() => { });
      */
    }
  }, [account]);

  async function getTotalSupply() {
    const minted = await nftMintContract.methods
      .totalSupply()
      .call();
    setMintedAmount(parseInt(minted));
  }

  async function approveUSDT() {
    console.log("Approving USDT");
    setIsApproveLoading(true);

    approveSend(NftMintAddress, "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff").then((res) => {
      console.log({ res });
      if (res != undefined) {
        toast.success("Approved Successfully");
        setIsApproveLoading(false);
      }
    })

    setIsApproveLoading(false);
  }



  // function for minting
  async function mintNFTs(mintAmount) {

    if (Number(usdtBalance) < Number(cost) * mintAmount) {
      toast.error(
        "Insufficient USDT Balance, required " +
        Number(formatUnits(cost, "ether")) * mintAmount +
        " USDT"
      );
      return;
    }

    setIsMintingOneLoading(true);

    mintSend(mintAmount).then((res) => {
      console.log({ res });
      if (res != undefined) {
        toast.success("Minted Successfully");
        setIsMintingOneLoading(false);
      }
    }
    )
  }

  function handleChange(event) {
    const inputValue = event.target.value;
    const intValue = parseInt(inputValue);

    if (isNaN(intValue) || intValue < 0) {
      // Don't update the state if the input is not a positive integer
      event.preventDefault();
      return;
    } else {
      setAmount(intValue);
    }

  }



  return (
    <section id="about">
      {/* About Shortcode */}
      <div className="fn_cs_about">
        <div className="left_part">
          <div className="img">
            <div className="img_in" data-bg-img="https://i.ibb.co/C20tSsb/15-Asset-Phantom.png">
              <img src="/img/1x1.jpg" alt="" />
            </div>
          </div>
          <div className="bg_overlay">
            <div className="bg_color" />
            <div className="bg_image" data-bg-img="https://i.ibb.co/YpvTwPd/30-Asset-Mercurial3.png" />
          </div>
        </div>
        <div className="right_part">
          <div className="right_in">
            <h3 className="fn__maintitle" data-text="BOX YOUR ASSET!">
              BOX YOUR ASSET!
            </h3>
            <div className="fn_cs_divider">
              <div className="divider">
                <span />
                <span />
              </div>
            </div>
            <div className="desc">
              <p>
                Our platform allows investors to buy NFTs that represent real-life assets, such as real estate, cars, and other high-value items. Each NFT is backed by a physical asset, making it a secure investment with real-world value.
              </p>
              <p>
                Investors can purchase Boxed NFTs and receive a 10% yield on their investment, with yield times ranging from 1 day to 2 months. After 2 months, investors will receive their yield payment even if the asset has not been sold.
              </p>
              <p>

                Boxed NFTs not only provide investors with a unique investment opportunity, but also help businesses grow by providing them with liquidity for their assets. As the project expands, we plan to add more features and functionality to our platform, making it even easier for investors to access real-world assets.
              </p>
              <p>
                Our platform is built on Arbitrum, a Layer 2 scaling solution for Ethereum, which allows for fast and cost-effective transactions. We also use cutting-edge security measures to ensure that all assets are protected and all transactions are secure.

                Join us in unlocking the potential of real-life assets with Boxed NFTs. Sign up today to start investing and earning yields on your investments!
              </p>
            </div>
            <a
              href="https://t.me/+U6FHko4dC5g4YzA0"
              className="metaportal_fn_button"
              target="_blank"
              rel="noreferrer"
            >
              <span>FIND US ON TELEGRAM</span>
            </a>
          </div>
        </div>
      </div>
      {/* !About Shortcode */}
      <div className="container">
        {/* Mint Shortcode */}
        <div className="fn_cs_mint">
          <div className="left_part">
            <h3 className="fn__maintitle" data-text="How to Mint">
              How to Mint
            </h3>
            <div className="fn_cs_divider">
              <div className="divider">
                <span />
                <span />
              </div>
            </div>
            <div className="desc">
              <p>
                Introducing &quot;Gen0&quot; NFTs, the first batch of Boxed NFTs representing elite soccer footwear. Each of the 160 &quot;Gen0&quot; NFTs is backed by a unique pair of soccer shoes, making them a secure investment with real-world value. Investors who purchase &quot;Gen0&quot; NFTs will receive a 10% yield on their investment as soon as the asset is sold.

              </p>
              <p>

              </p>
              <p>
                &quot;Gen0&quot; NFT holders will also be counted as early supporters of the project and will be eligible for different benefits in future stages. By owning a &quot;Gen0&quot; NFT, you&apos;re not just investing in an asset-backed digital token, you&apos;re also becoming part of the Boxed NFT community and paving the way for the future of asset-backed investing. Don&apos;t miss your chance to become a &quot;Gen0&quot; NFT holder and start your journey with us today!
              </p>
            </div>

            <input style={{ marginBottom: '20px' }} id="name" type="text" placeholder="Amount" onChange={handleChange} />


            {account ? (
              allowance == "0" ? (
                <a className="metaportal_fn_button wallet_opener" onClick={approveUSDT}>
                  <span>Approve</span>
                </a>
              ) : (
                <a className="metaportal_fn_button wallet_opener" onClick={() => {
                  mintNFTs(amount).then(() => { });
                }}>
                  <span>Mint</span>
                </a>
              )
            ) : (
              <a className="metaportal_fn_button wallet_opener" onClick={activateBrowserWallet}>
                <span>Connect Wallet</span>
              </a>
            )}



          </div>
          <div className="right_part">
            {/* Steps Shortcode */}
            <div className="fn_cs_steps">
              <ul>
                <li>
                  <div className="item">
                    <div className="item_in">
                      <h3 className="fn__gradient_title">01</h3>
                      <p>Connect your Wallet</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item">
                    <div className="item_in">
                      <h3 className="fn__gradient_title">02</h3>
                      <p>Select Your Quantity</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item">
                    <div className="item_in">
                      <h3 className="fn__gradient_title">03</h3>
                      <p>Confirm The Transaction</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item">
                    <div className="item_in">
                      <h3 className="fn__gradient_title">04</h3>
                      <p>Receive Your NFT’s</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* !Mint Shortcode */}
      </div>
      <section id="fun_facts">
        <div className="container">
          <div className="fn_cs_counter_list">
            <ul>
              <li>
                <div className="item">
                  <h3 className="fn__gradient_title">
                    <span className="prefix" />
                    <span>1000</span>
                    <span className="suffix" />
                  </h3>
                  <p>Total Items</p>
                  <div className="divider" />
                </div>
              </li>
              <li>
                <div className="item">
                  <h3 className="fn__gradient_title">
                    <span className="prefix" />
                    <span>1000</span>
                    <span className="suffix">k+</span>
                  </h3>
                  <p>Total Owners</p>
                  <div className="divider" />
                </div>
              </li>
              <li>
                <div className="item">
                  <h3 className="fn__gradient_title">
                    <span className="prefix" />
                    <span>1000</span>
                    <span className="suffix" />
                  </h3>
                  <p>Floor Price (ETH)</p>
                  <div className="divider" />
                </div>
              </li>
              <li>
                <div className="item">
                  <h3 className="fn__gradient_title">
                    <span className="prefix" />
                    <span>1000</span>
                    <span className="suffix">k+</span>
                  </h3>
                  <p>Volume Traded (ETH)</p>
                  <div className="divider" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <Toaster />
    </section>

  );
};
export default About;

export const About2 = () => (
  <section id="about2">
    <div className="container small">
      <div className="fn_cs_shortabout">
        <div className="about_left">
          <h3 className="fn__maintitle" data-text="The Rise of Legends">
            The Rise of Legends
          </h3>
          <div className="fn_cs_divider">
            <div className="divider">
              <span />
              <span />
            </div>
          </div>
          <div className="desc">
            <p>
              As the first hero of the Meta Legends, collection has over 9,999
              unique skins drawn from the different missions and challenges he
              faced throughout his life.
            </p>
            <p>
              The artwork has been hand-drawned by Robert Green in the
              traditional anime style and composited by Layla Efiyo.
            </p>
          </div>
          <a
            href="https://discord.com/"
            className="metaportal_fn_button"
            target="_blank"
            rel="noreferrer"
          >
            <span>Find us On Discord</span>
          </a>
        </div>
        <div className="about_right">
          <div className="abs_img" data-bg-img="/img/about/2.jpg" />
        </div>
      </div>
      <div className="fn_cs_collection_info">
        <h3 className="fn__gradient_title">10,000</h3>
        <h3
          className="fn__maintitle upper"
          data-text="Total Items in Collection"
        >
          Total Items in Collection
        </h3>
        <p>
          There are many variations of passages of lorem ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which {`don't`} look even slightly
          believable.
        </p>
      </div>
    </div>
    <div className="fn_cs_video bg">
      <div className="abs_img" data-bg-img="/img/video/1.jpg" />
      <a
        className="popup-youtube"
        href="https://www.youtube.com/embed/7e90gBu4pas"
      >
        <img src="/svg/play.svg" alt="" className="fn__svg" />
      </a>
    </div>
    <div className="container">
      {/* Steps Shortcode */}
      <div className="fn_cs_steps gap" data-cols={4} data-gap={60}>
        <ul>
          <li>
            <div className="item">
              <div className="item_in">
                <h3 className="fn__gradient_title">01</h3>
                <p>Connect your Wallet</p>
              </div>
            </div>
          </li>
          <li>
            <div className="item">
              <div className="item_in">
                <h3 className="fn__gradient_title">02</h3>
                <p>Select Your Quantity</p>
              </div>
            </div>
          </li>
          <li>
            <div className="item">
              <div className="item_in">
                <h3 className="fn__gradient_title">03</h3>
                <p>Confirm The Transaction</p>
              </div>
            </div>
          </li>
          <li>
            <div className="item">
              <div className="item_in">
                <h3 className="fn__gradient_title">04</h3>
                <p>Receive Your {`NFT’s`}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      {/* !Steps Shortcode */}
      <div className="fn_cs_join">
        <div className="join_in">
          <h3 className="fn__maintitle upper" data-text="Join Our Community">
            Join Our Community
          </h3>
          <p>
            There are many variations of passages of lorem ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which {`don't`} look even slightly
            believable.
          </p>
          <div className="buttons">
            <a
              href="https://opensea.io/"
              className="metaportal_fn_button"
              target="_blank"
              rel="noreferrer"
            >
              <span>Buy On Opensea</span>
            </a>
            <a
              href="#"
              className="metaportal_fn_button"
              target="_blank"
              rel="noreferrer"
            >
              <span>WhiteList Now</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);
