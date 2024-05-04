import { ethers } from "ethers";

const TOKEN_DECIMALS = ethers.BigNumber.from("10").pow(
  ethers.BigNumber.from("18")
);
const MILLION = ethers.BigNumber.from("10").pow(ethers.BigNumber.from("6"));

const HUNDRED_MILLION = ethers.BigNumber.from("100")
  .mul(MILLION)
  .mul(TOKEN_DECIMALS);
const VE_MAX = ethers.BigNumber.from("200")
  .mul(MILLION)
  .mul(TOKEN_DECIMALS);

const DEV_EOA = "";
const TEAM_EOA = "";
const TEAM_MULTISIG = "";

const testTaikoConfig = {
  // Tokens
  WETH: "0xae2C46ddb314B9Ba743C6dEE4878F151881333D9",
  USDC: "0x0011E559da84dde3f841e22dc33F3adbF184D84A",

  // Addresses
  devEOA: DEV_EOA,
  teamEOA: TEAM_EOA,
  teamMultisig: TEAM_MULTISIG,
  // emergencyCouncil: "0xcC2D01030eC2cd187346F70bFc483F24488C32E8",

  merkleRoot:
    "0xbb99a09fb3b8499385659e82a8da93596dd07082fe86981ec06c83181dee489d",
  tokenWhitelist: [
    "0xae2C46ddb314B9Ba743C6dEE4878F151881333D9", // WETH
    "0xebF1f662bF092ff0D913a9fe9D7179B0efEF1611", // TTKOh.t (Bridged Taiko Token Hekla (⭀17000))
    "0x0011E559da84dde3f841e22dc33F3adbF184D84A", // USDC
    "0x2029Ca1e4A5954781a271d6Fa3598bF4434969f5", // HORSE.t (Bridged Horse Token (⭀17000))
    "0xfa510751d09a3a1fF34E35c71C4b476D7D5AeAa7", // LRC
    "0x55940343F4238b5c04c993A47d90C44336a1f809", // MIM
  ],
  partnerAddrs: [
    TEAM_EOA,
    DEV_EOA,
  ],
  partnerAmts: [
    HUNDRED_MILLION,
    HUNDRED_MILLION,
  ],
  partnerMax: VE_MAX,
};

export default testTaikoConfig;
