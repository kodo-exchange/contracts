import { ethers } from "ethers";

const TOKEN_DECIMALS = ethers.BigNumber.from("10").pow(
  ethers.BigNumber.from("18")
);
const MILLION = ethers.BigNumber.from("10").pow(ethers.BigNumber.from("6"));

const TWENTY_MILLION = ethers.BigNumber.from("20")
  .mul(MILLION)
  .mul(TOKEN_DECIMALS);

const VE_MAX = ethers.BigNumber.from("140")
  .mul(MILLION)
  .mul(TOKEN_DECIMALS);

const DEV_EOA = "0x37024E51Ab673bE9E8bA572c2b0cA318a5BB7521";
const TEAM_EOA = "0xa7E999D2d877DAe6b84e352F307F8C5DDA0E530A";
const TEAM_MULTISIG = "0x9CAB32e31193C9aF37896A5b2717f3D36e71CF56";
const DRUM_GUILD = "0x4Ce948ACF92F80650fA270c8eb2EFD6f394477d0"; // Drum Guild EOA, will be multisig
const TAIKO_EOA = "0x0906C1606CB06c30F7eB3acAEfFF981B1f0d2Fc2"; // Kodo Custody, will transfer to Taiko's vault

const WETH = "0xA51894664A773981C6C112C43ce576f315d5b1B6"
const USDC = "0x07d83526730c7438048d55a4fc0b850e2aab6f0b"
const TAIKO = "0xa9d23408b9ba935c230493c40c73824df71a0975"

const testTaikoConfig = {

  // Gas Price
  PRICE: "1000000000", // 1000000000 wei

  // Tokens
  WETH: WETH,
  USDC: USDC,
  TAIKO: TAIKO,

  // Addresses
  devEOA: DEV_EOA,
  teamEOA: TEAM_EOA,
  teamMultisig: TEAM_MULTISIG, // will transfer to multisig

  merkleRoot:
    "0x5a3e655dd9c015529bd57acd0a1ee32e728c80a77cb1f2698436887902adcccf",
  
  tokenWhitelist: [
    WETH,
    USDC,
    TAIKO,
  ],
  
  partnerAddrs: [
    TAIKO_EOA,
    TAIKO_EOA,
    DRUM_GUILD,
    DRUM_GUILD,
    DRUM_GUILD,
    DRUM_GUILD,
    TEAM_EOA,
  ],
  partnerAmts: [
    TWENTY_MILLION, // 5% for Taiko Labs
    TWENTY_MILLION, // 5% for Taiko Labs -- totalled 10%
    TWENTY_MILLION, // 5% for Drum Guild
    TWENTY_MILLION, // 5% for Drum Guild
    TWENTY_MILLION, // 5% for Drum Guild
    TWENTY_MILLION, // 5% for Drum Guild -- totalled 30%
    TWENTY_MILLION, // 5% for KODO pools -- totalled 35% (140M)
  ],
  partnerMax: VE_MAX, // 140M
};

export default testTaikoConfig;
