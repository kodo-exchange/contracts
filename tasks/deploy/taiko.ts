import { task } from "hardhat/config";

import testTaikoConfig from "./constants/testTaikoConfig";

task("deploy:taiko", "Deploys Taiko contracts").setAction(async function (
  taskArguments,
  { ethers }
) {

  const TAIKO_CONFIG = testTaikoConfig;

  // Load
  const [
    Kodo,
    GaugeFactory,
    BribeFactory,
    PairFactory,
    Router,
    Library,
    VeArtProxy,
    VotingEscrow,
    RewardsDistributor,
    Voter,
    Minter,
    // VeloGovernor,
    // RedemptionReceiver,
    MerkleClaim,
    // Multicall3
  ] = await Promise.all([
    ethers.getContractFactory("Kodo"),
    ethers.getContractFactory("GaugeFactory"),
    ethers.getContractFactory("BribeFactory"),
    ethers.getContractFactory("PairFactory"),
    ethers.getContractFactory("Router"),
    ethers.getContractFactory("KodoLibrary"),
    ethers.getContractFactory("VeArtProxy"),
    ethers.getContractFactory("VotingEscrow"),
    ethers.getContractFactory("RewardsDistributor"),
    ethers.getContractFactory("Voter"),
    ethers.getContractFactory("Minter"),
    // ethers.getContractFactory("VeloGovernor"),
    // ethers.getContractFactory("RedemptionReceiver"),
    ethers.getContractFactory("MerkleClaim"),
    // ethers.getContractFactory("Multicall3"),
  ]);

  const kodo = await Kodo.deploy();
  await kodo.deployed();
  console.log("Kodo deployed to: ", kodo.address);

  const gaugeFactory = await GaugeFactory.deploy();
  await gaugeFactory.deployed();
  console.log("GaugeFactory deployed to: ", gaugeFactory.address);

  const bribeFactory = await BribeFactory.deploy();
  await bribeFactory.deployed();
  console.log("BribeFactory deployed to: ", bribeFactory.address);

  const pairFactory = await PairFactory.deploy();
  await pairFactory.deployed();
  console.log("PairFactory deployed to: ", pairFactory.address);

  const router = await Router.deploy(pairFactory.address, TAIKO_CONFIG.WETH); // here needs WETH
  await router.deployed();
  console.log("Router deployed to: ", router.address);
  console.log("Args: ", pairFactory.address, TAIKO_CONFIG.WETH, "\n");

  const library = await Library.deploy(router.address);
  await library.deployed();
  console.log("KodoLibrary deployed to: ", library.address);
  console.log("Args: ", router.address, "\n");

  const artProxy = await VeArtProxy.deploy();
  await artProxy.deployed();
  console.log("VeArtProxy deployed to: ", artProxy.address);

  const escrow = await VotingEscrow.deploy(kodo.address, artProxy.address);
  await escrow.deployed();
  console.log("VotingEscrow deployed to: ", escrow.address);
  console.log("Args: ", kodo.address, artProxy.address, "\n");

  const distributor = await RewardsDistributor.deploy(escrow.address);
  await distributor.deployed();
  console.log("RewardsDistributor deployed to: ", distributor.address);
  console.log("Args: ", escrow.address, "\n");

  const voter = await Voter.deploy(
    escrow.address,
    pairFactory.address,
    gaugeFactory.address,
    bribeFactory.address,
  );
  await voter.deployed();
  console.log("Voter deployed to: ", voter.address);
  console.log("Args: ", 
    escrow.address,
    pairFactory.address,
    gaugeFactory.address,
    bribeFactory.address,
    "\n"
  );

  const minter = await Minter.deploy(
    voter.address,
    escrow.address,
    distributor.address, 
  );
  await minter.deployed();
  console.log("Minter deployed to: ", minter.address);
  console.log("Args: ", 
    voter.address,
    escrow.address,
    distributor.address,
    "\n"
  );

  // Airdrop is not available now. It's just a placeholder.
  const claim = await MerkleClaim.deploy(kodo.address, TAIKO_CONFIG.merkleRoot); // hey, merkleRoot is not available now.
  await claim.deployed();
  console.log("MerkleClaim deployed to: ", claim.address);
  console.log("Args: ", kodo.address, TAIKO_CONFIG.merkleRoot, "\n");

  // Initialize
  await kodo.initialMint(TAIKO_CONFIG.teamEOA);
  console.log("Initial minted");

  // await velo.setRedemptionReceiver(receiver.address);
  // console.log("RedemptionReceiver set");

  await kodo.setMerkleClaim(claim.address);
  console.log("MerkleClaim set");

  await kodo.setMinter(minter.address);
  console.log("Minter set");

  await pairFactory.setPauser(TAIKO_CONFIG.teamMultisig);
  console.log("Pauser set");

  await escrow.setVoter(voter.address);
  console.log("Voter set");

  await escrow.setTeam(TAIKO_CONFIG.teamMultisig);
  console.log("Team set for escrow");

  await voter.setGovernor(TAIKO_CONFIG.teamMultisig);
  console.log("Governor set");

  await voter.setEmergencyCouncil(TAIKO_CONFIG.teamMultisig);
  console.log("Emergency Council set");

  await distributor.setDepositor(minter.address);
  console.log("Depositor set");

  // await receiver.setTeam(OP_CONFIG.teamMultisig)
  // console.log("Team set for receiver");

  // await governor.setTeam(OP_CONFIG.teamMultisig)
  // console.log("Team set for governor");

  // Whitelist
  const nativeToken = [kodo.address];
  const tokenWhitelist = nativeToken.concat(TAIKO_CONFIG.tokenWhitelist);
  await voter.initialize(tokenWhitelist, minter.address);
  console.log("Whitelist set");

  const tx = await minter.initialize(
    TAIKO_CONFIG.partnerAddrs,
    TAIKO_CONFIG.partnerAmts,
    TAIKO_CONFIG.partnerMax,
    { gasLimit: 6000000 }  // Set a manual gas limit
  );
  console.log("veKDO distributed");

  await minter.setTeam(TAIKO_CONFIG.teamMultisig)
  console.log("Team set for minter");

  console.log("Taiko contracts deployed");
});
