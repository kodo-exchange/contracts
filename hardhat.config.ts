import "@nomiclabs/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-preprocessor";
import "hardhat-abi-exporter";

import "./tasks/accounts";
import "./tasks/deploy";

import fs from "fs";
import { resolve } from "path";

import { config as dotenvConfig } from "dotenv";
import { HardhatUserConfig, task } from "hardhat/config";
import taikoConfig from "./tasks/deploy/constants/taikoConfig";

dotenvConfig({ path: resolve(__dirname, "./.env") });

const remappings = fs
  .readFileSync("remappings.txt", "utf8")
  .split("\n")
  .filter(Boolean)
  .map((line) => line.trim().split("="));

const accounts = {
  count: 10,
  initialIndex: process.env.MNEMONIC_INDEX ? parseInt(process.env.MNEMONIC_INDEX) : 0,
  mnemonic: process.env.MNEMONIC,
  path: "m/44'/60'/0'/0",
};

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0,
      // forking: {
      //   url: `https://opt-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      //   blockNumber: 16051852
      // }
    },
    taiko: {
      url: "https://rpc.mainnet.taiko.xyz",
      accounts: accounts,
    },
    taikoA7: {
      url: "https://rpc.hekla.taiko.xyz",
      accounts: accounts,
    },
    taikoA6: {
      url: "https://rpc.katla.taiko.xyz",
      accounts: accounts,
    },
    holesky: {
      url: "https://ethereum-holesky-rpc.publicnode.com",
      accounts: accounts,
    },
    opera: {
      url: "https://rpc.fantom.network",
      accounts: [process.env.PRIVATE_KEY!],
    },
    ftmTestnet: {
      url: "https://rpc.testnet.fantom.network",
      accounts: [process.env.PRIVATE_KEY!],
    },
    optimisticEthereum: {
      url: "https://mainnet.optimism.io",
      accounts: [process.env.PRIVATE_KEY!],
    },
    optimisticKovan: {
      url: "https://kovan.optimism.io",
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.13",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.5.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000000,
          },
        },
      },
    ],
  },
  // This fully resolves paths for imports in the ./lib directory for Hardhat
  preprocess: {
    eachLine: (hre) => ({
      transform: (line: string) => {
        if (!line.match(/^\s*import /i)) {
          return line;
        }

        const remapping = remappings.find(([find]) => line.match('"' + find));
        if (!remapping) {
          return line;
        }

        const [find, replace] = remapping;
        return line.replace('"' + find, '"' + replace);
      },
    }),
  },
  etherscan: {
    apiKey: {
      taikoA6: "routescan", // apiKey is not required, just set a placeholder
      taikoA7: process.env.ETHERSCAN_API_KEY,
      taiko: process.env.ETHERSCAN_API_KEY,
    },
    customChains: [
      {
        network: "taiko",
        chainId: 167000,
        urls: {
          apiURL: "https://api.taikoscan.io/api",
          browserURL: "https://taikoscan.io"
        }
      },
      {
        network: "taikoA7",
        chainId: 167009,
        urls: {
          apiURL: "https://api-testnet.taikoscan.io/api",
          browserURL: "https://hekla.taikoscan.io"
        }
      },
      {
        network: "taikoA6",
        chainId: 167008,
        urls: {
          apiURL: "https://api.routescan.io/v2/network/testnet/evm/167008/etherscan",
          browserURL: "https://routescan.io"
        }
      }
    ]
  },
  sourcify: {
    enabled: false
  }

};

export default config;