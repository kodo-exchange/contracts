# Kodo Protocol

This repo contains the contracts for Kodo, an AMM on Taiko inspired by Velodrome & Solidly. [Learn more](https://docs.kodo.exchange/)

## Testing

This repo uses both Foundry (for Solidity testing) and Hardhat (for deployment).

Foundry Setup

```ml
forge init
forge build
forge test
```

Hardhat Setup

```ml
npm i
npx hardhat compile
```

## Deployment

This project's deployment process uses [Hardhat tasks](https://hardhat.org/guides/create-task.html). The scripts are found in `tasks/`.

Deployment guide:

`npx hardhat deploy:taiko` which deploys the core contracts to Taiko.

## Security

Kodo Exchange ensures transparency in terms of risks, changes, and the security audits of smart contracts. As a friendly fork of Velodrome and Solidly, you can find the security records for Velodrome [here](https://github.com/velodrome-finance/docs/blob/main/pages/security.md) and for Solidly [here](https://github.com/froggerdev/solidly). We will soon publish our own audit results.

## Contracts

The contracts we've deployed on Taiko

| Name               | Address                                                                                                               |
| :----------------- | :-------------------------------------------------------------------------------------------------------------------- |
| Kodo               | [0x7e91F29F8a213c8311712A8FC8c61219fb9477CB](https://taikoscan.io/address/0x7e91F29F8a213c8311712A8FC8c61219fb9477CB) |
| PairFactory        | [0x535E02960574d8155596a73c7Ad66e87e37Eb6Bc](https://taikoscan.io/address/0x535E02960574d8155596a73c7Ad66e87e37Eb6Bc) |
| Router             | [0xd04d75E1CDe512b195E70C6c18Cf7Ec4b2B12f41](https://taikoscan.io/address/0xd04d75E1CDe512b195E70C6c18Cf7Ec4b2B12f41) |
| BribeFactory       | [0x7149E14784f9d88B5497a9bf135c643151379F95](https://taikoscan.io/address/0x7149E14784f9d88B5497a9bf135c643151379F95) |
| GaugeFactory       | [0x3a9E14D73AD40E70baFaFfefE8893Eb318Fc2312](https://taikoscan.io/address/0x3a9E14D73AD40E70baFaFfefE8893Eb318Fc2312) |
| Voter              | [0xbf6fabcc707aC239Be2D7818797745F678A411ad](https://taikoscan.io/address/0xbf6fabcc707aC239Be2D7818797745F678A411ad) |
| VotingEscrow       | [0x6c4A102B7aafFA9a8C9440c08A5c09deECAFB324](https://taikoscan.io/address/0x6c4A102B7aafFA9a8C9440c08A5c09deECAFB324) |
| VeArtProxy         | [0x8ba3C594Dc3796c171a1B7F0e143577abE03300F](https://taikoscan.io/address/0x8ba3C594Dc3796c171a1B7F0e143577abE03300F) |
| RewardsDistributor | [0x1A805BBcE7F87365daC956cFD8d078ef827E73d1](https://taikoscan.io/address/0x1A805BBcE7F87365daC956cFD8d078ef827E73d1) |
| Minter             | [0x0e16aA850AF7956B476Ad6056ead67A32f099504](https://taikoscan.io/address/0x0e16aA850AF7956B476Ad6056ead67A32f099504) |
| MerkleClaim        | [0x7E034Ef620D2fb403e8bB6a1130670110287A7a1](https://taikoscan.io/address/0x7E034Ef620D2fb403e8bB6a1130670110287A7a1) |
| KodoLibrary        | [0x46E9cef07e01ab5a73E9B10cfb423E9319cD68c9](https://taikoscan.io/address/0x46E9cef07e01ab5a73E9B10cfb423E9319cD68c9) |

Existing contract legos on Taiko we've utilized

| Name               | Address                                                                                                               |
| :----------------- | :-------------------------------------------------------------------------------------------------------------------- |
| WETH               | [0xA51894664A773981C6C112C43ce576f315d5b1B6](https://taikoscan.io/address/0xA51894664A773981C6C112C43ce576f315d5b1B6) |
| USDC               | [0x07d83526730c7438048D55A4fc0b850e2aaB6f0b](https://taikoscan.io/address/0x07d83526730c7438048D55A4fc0b850e2aaB6f0b) |
| USDT               | [0x2DEF195713CF4a606B49D07E520e22C17899a736](https://taikoscan.io/address/0x2DEF195713CF4a606B49D07E520e22C17899a736) |
| USDC.e             | [0x19e26B0638bf63aa9fa4d14c6baF8D52eBE86C5C](https://taikoscan.io/address/0x19e26B0638bf63aa9fa4d14c6baF8D52eBE86C5C) |
| LRC                | [0xd347949f8c85d9f3d6b06bfc4f8c2e07c161f064](https://taikoscan.io/address/0xd347949f8c85d9f3d6b06bfc4f8c2e07c161f064) |
| TAIKO              | [0xA9d23408b9bA935c230493c40C73824Df71A0975](https://taikoscan.io/address/0xA9d23408b9bA935c230493c40C73824Df71A0975) |
| Multicall3         | [0xcb2436774C3e191c85056d248EF4260ce5f27A9D](https://taikoscan.io/address/0xcb2436774C3e191c85056d248EF4260ce5f27A9D) |

## Tokenlist

We are maintaining a [tokenlist](https://raw.githubusercontent.com/kodo-exchange/tokenlist/main/tokenlist.json). If you want your token to be listed, make a PR to this repo([kodo-exchange/tokenlist](https://github.com/kodo-exchange/tokenlist)) and become our partner.
