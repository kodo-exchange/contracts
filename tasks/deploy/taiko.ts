import { task, types } from "hardhat/config";

import taikoConfig from "./constants/taikoConfig";
// import taikoConfig from "./constants/testTaikoConfig";

task("deploy:taiko", "Deploys Taiko contracts")
  .addParam("initializeMinter", "Whether to run minter.initialize", "false", types.boolean)
  .setAction(async function (
    taskArguments,
    hre
  ) {

    const TAIKO_CONFIG = taikoConfig;

    const gasPrice = hre.ethers.utils.parseUnits(TAIKO_CONFIG.PRICE, 'wei');

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
      MerkleClaim,
    ] = await Promise.all([
      hre.ethers.getContractFactory("Kodo"),
      hre.ethers.getContractFactory("GaugeFactory"),
      hre.ethers.getContractFactory("BribeFactory"),
      hre.ethers.getContractFactory("PairFactory"),
      hre.ethers.getContractFactory("Router"),
      hre.ethers.getContractFactory("KodoLibrary"),
      hre.ethers.getContractFactory("VeArtProxy"),
      hre.ethers.getContractFactory("VotingEscrow"),
      hre.ethers.getContractFactory("RewardsDistributor"),
      hre.ethers.getContractFactory("Voter"),
      hre.ethers.getContractFactory("Minter"),
      hre.ethers.getContractFactory("MerkleClaim"),
    ]);

    const kodo = await Kodo.deploy({ gasPrice });
    await kodo.deployed();
    console.log("Kodo deployed to: ", kodo.address);
    
    const gaugeFactory = await GaugeFactory.deploy({ gasPrice });
    await gaugeFactory.deployed();
    console.log("GaugeFactory deployed to: ", gaugeFactory.address);

    const bribeFactory = await BribeFactory.deploy({ gasPrice });
    await bribeFactory.deployed();
    console.log("BribeFactory deployed to: ", bribeFactory.address);

    const pairFactory = await PairFactory.deploy({ gasPrice });
    await pairFactory.deployed();
    console.log("PairFactory deployed to: ", pairFactory.address);

    const router = await Router.deploy(pairFactory.address, TAIKO_CONFIG.WETH, { gasPrice });
    await router.deployed();
    console.log("Router deployed to: ", router.address);
    console.log("Args: ", pairFactory.address, TAIKO_CONFIG.WETH, "\n");

    const library = await Library.deploy(router.address, { gasPrice });
    await library.deployed();
    console.log("KodoLibrary deployed to: ", library.address);
    console.log("Args: ", router.address, "\n");

    const artProxy = await VeArtProxy.deploy({ gasPrice });
    await artProxy.deployed();
    console.log("VeArtProxy deployed to: ", artProxy.address);

    const escrow = await VotingEscrow.deploy(kodo.address, artProxy.address, { gasPrice });
    await escrow.deployed();
    console.log("VotingEscrow deployed to: ", escrow.address);
    console.log("Args: ", kodo.address, artProxy.address, "\n");

    const distributor = await RewardsDistributor.deploy(escrow.address, { gasPrice });
    await distributor.deployed();
    console.log("RewardsDistributor deployed to: ", distributor.address);
    console.log("Args: ", escrow.address, "\n");

    const voter = await Voter.deploy(
      escrow.address,
      pairFactory.address,
      gaugeFactory.address,
      bribeFactory.address,
      { gasPrice }
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
      { gasPrice }
    );
    await minter.deployed();
    console.log("Minter deployed to: ", minter.address);
    console.log("Args: ", 
      voter.address,
      escrow.address,
      distributor.address,
      "\n"
    );

    // Airdrop
    const claim = await MerkleClaim.deploy(escrow.address, TAIKO_CONFIG.merkleRoot, 4*7, { gasPrice }); // 4 weeks
    await claim.deployed();
    console.log("MerkleClaim deployed to: ", claim.address);
    console.log("Args: ", escrow.address, TAIKO_CONFIG.merkleRoot, 4*7, "\n");

    // Initialize
    await kodo.initialMint(TAIKO_CONFIG.teamEOA, { gasPrice });
    console.log("Initial minted");

    await kodo.setMinter(minter.address, { gasPrice });
    console.log("Minter set");

    await pairFactory.setPauser(TAIKO_CONFIG.teamMultisig, { gasPrice });
    console.log("Pauser set");

    await pairFactory.setFeeManager(TAIKO_CONFIG.teamMultisig, { gasPrice });
    console.log("Fee Manager set");

    await escrow.setVoter(voter.address, { gasPrice });
    console.log("Voter set");

    await escrow.setTeam(TAIKO_CONFIG.teamMultisig, { gasPrice });
    console.log("Team set for escrow");

    await voter.setGovernor(TAIKO_CONFIG.teamMultisig, { gasPrice });
    console.log("Governor set");

    await voter.setEmergencyCouncil(TAIKO_CONFIG.teamMultisig, { gasPrice });
    console.log("Emergency Council set");

    await distributor.setDepositor(minter.address, { gasPrice });
    console.log("Depositor set");

    let ts = Math.floor(Date.now() / 1000);
    let epochStartTs = Math.floor(ts / (7 * 24 * 3600) + 1) * 7 * 24 * 3600;
    await claim.setStartTime(epochStartTs, { gasPrice });
    console.log("Airdrop start time set: ", new Date(epochStartTs * 1000).toUTCString());

    // Whitelist
    const nativeToken = [kodo.address];
    const tokenWhitelist = nativeToken.concat(TAIKO_CONFIG.tokenWhitelist);
    await voter.initialize(tokenWhitelist, minter.address, { gasPrice });
    console.log("Whitelist set");

    if (taskArguments.initializeMinter) {
      const tx = await minter.initialize(
        TAIKO_CONFIG.partnerAddrs,
        TAIKO_CONFIG.partnerAmts,
        TAIKO_CONFIG.partnerMax,
        { gasLimit: 6000000, gasPrice }  // Set a manual gas limit
      );
      console.log("veKODO distributed");
    }

    await minter.setTeam(TAIKO_CONFIG.teamMultisig, { gasPrice })
    console.log("Team set for minter");

    console.log("Taiko contracts deployed");
  });
