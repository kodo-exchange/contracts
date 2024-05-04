# Kodo Protocol

This repo contains the contracts for Kodo, an AMM on Taiko inspired by Velodrome & Solidly.

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

Kodo Exchange ensures transparency in terms of risks, changes, and the security audits of smart contracts. As a friendly fork of Velodrome and Solidly, you can find the security records for Velodrome [here](https://github.com/velodrome-finance/docs/blob/main/pages/security.md) and for Solidly [here](https://github.com/froggerdev/solidly).

## Contracts

The contracts we've deployed on Hekla

| Name               | Address                                                                                                                               |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| Kodo               | [0xf3B2442b1f1c37FFaF2f2A2d93a2954eaF660646](https://hekla.taikoscan.network/address/0xf3B2442b1f1c37FFaF2f2A2d93a2954eaF660646) |
| PairFactory        | [0xA2f411B2Fa92276Be7a3901031800C0027a712D3](https://hekla.taikoscan.network/address/0xA2f411B2Fa92276Be7a3901031800C0027a712D3) |
| Router             | [0xF0B1CA5058E9646724A0B7eB3E755Fa60552DF69](https://hekla.taikoscan.network/address/0xF0B1CA5058E9646724A0B7eB3E755Fa60552DF69) |
| BribeFactory       | [0x48a0f01480F47ac57b0140fa9f7E201e040FB2A6](https://hekla.taikoscan.network/address/0x48a0f01480F47ac57b0140fa9f7E201e040FB2A6) |
| GaugeFactory       | [0x4fc297C0Ba13D0C075d3B647D3D1F4f258a3701E](https://hekla.taikoscan.network/address/0x4fc297C0Ba13D0C075d3B647D3D1F4f258a3701E) |
| Voter              | [0xa1915120905739e8f49A4be159F2e8FBa7202F2D](https://hekla.taikoscan.network/address/0xa1915120905739e8f49A4be159F2e8FBa7202F2D) |
| VotingEscrow       | [0xE2A0c1EB3b095cE61c08515aa56c323B38dcB5D3](https://hekla.taikoscan.network/address/0xE2A0c1EB3b095cE61c08515aa56c323B38dcB5D3) |
| VeArtProxy         | [0x3977614016fcAbDa5eAF28AAea82549E02cB97AC](https://hekla.taikoscan.network/address/0x3977614016fcAbDa5eAF28AAea82549E02cB97AC) |
| RewardsDistributor | [0xfCbEE101223cCccc30DAe2d98BF284f541d883DA](https://hekla.taikoscan.network/address/0xfCbEE101223cCccc30DAe2d98BF284f541d883DA) |
| Minter             | [0x5FEca4927Ddfa7fD6e397fA466e1290EC4E7dFa0](https://hekla.taikoscan.network/address/0x5FEca4927Ddfa7fD6e397fA466e1290EC4E7dFa0) |
| tLRC               | [0xfa510751d09a3a1fF34E35c71C4b476D7D5AeAa7](https://hekla.taikoscan.network/address/0xfa510751d09a3a1fF34E35c71C4b476D7D5AeAa7) |
| tMIM               | [0x55940343F4238b5c04c993A47d90C44336a1f809](https://hekla.taikoscan.network/address/0x55940343F4238b5c04c993A47d90C44336a1f809) |



Existing contract legos on Taiko Hekla we've utilized

| Name               | Address                                                                                                                               |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| WETH               | [0xae2C46ddb314B9Ba743C6dEE4878F151881333D9](https://hekla.taikoscan.network/address/0xae2C46ddb314B9Ba743C6dEE4878F151881333D9) |
| USDC               | [0x0011E559da84dde3f841e22dc33F3adbF184D84A](https://hekla.taikoscan.network/address/0x0011E559da84dde3f841e22dc33F3adbF184D84A) |
| TTKOh.t            | [0xebF1f662bF092ff0D913a9fe9D7179B0efEF1611](https://hekla.taikoscan.network/address/0xebF1f662bF092ff0D913a9fe9D7179B0efEF1611) |
| HORSE.t            | [0x2029Ca1e4A5954781a271d6Fa3598bF4434969f5](https://hekla.taikoscan.network/address/0x2029Ca1e4A5954781a271d6Fa3598bF4434969f5) |

## Tokenlist

We are maintaining a [token list](https://raw.githubusercontent.com/kodo-exchange/tokenlist/main/tokenlist.json). If you want your token to be listed, make a PR to this repo([kodo-exchange/tokenlist](https://github.com/kodo-exchange/tokenlist)) and become our partner.
