// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.13;

/// ============ Imports ============

import {IKodo} from "contracts/interfaces/IKodo.sol";
import {IVotingEscrow} from "contracts/interfaces/IVotingEscrow.sol";
import {MerkleProof} from "openzeppelin-contracts/contracts/utils/cryptography/MerkleProof.sol"; // OZ: MerkleProof
import {Ownable} from "openzeppelin-contracts/contracts/access/Ownable.sol";

/// @title MerkleClaim
/// @notice Claims KODO for members of a merkle tree
/// @author Modified from Merkle Airdrop Starter (https://github.com/Anish-Agnihotri/merkle-airdrop-starter/blob/master/contracts/src/MerkleClaimERC20.sol)
contract MerkleClaim is Ownable {
    /// @notice max lock period 26 weeeks
    uint256 public constant LOCK = 86400 * 7 * 52 * 4;

    uint256 public duration;
    uint256 public startTime;

    IVotingEscrow public ve;
    /// @notice KODO token to claim
    IKodo public KODO;
    /// @notice ERC20-claimee inclusion root
    bytes32 public merkleRoot;    

    /// @notice Mapping of addresses who have claimed tokens
    mapping(address => uint256) public claimedAmounts;

    /// ============ Constructor ============

    /// @notice Creates a new MerkleClaim contract
    /// @param _ve address
    /// @param _merkleRoot of claimees
    /// @param _duration duration for airdrop (in days)
    constructor(address _ve, bytes32 _merkleRoot, uint256 _duration) {
        ve = IVotingEscrow(_ve);
        KODO = IKodo(IVotingEscrow(_ve).token());
        merkleRoot = _merkleRoot;
        duration = _duration;
    }

    /// ============ Events ============

    /// @notice Emitted after a successful token claim
    /// @param to recipient of claim
    /// @param amount of veTokens claimed
    /// @param tokenId veToken NFT Id
    event Claim(address indexed to, uint256 amount, uint256 tokenId);

    /// @notice Emitted after a successful withdrawal of remaining tokens
    /// @param recipient recipient of remaining tokens
    /// @param amount of remaining tokens
    event Withdrawal(address indexed recipient, uint256 amount);

    event MerkleRootSet(bytes32 newMerkleRoot);

    /// ============ Functions ============
    /// @notice set start time for airdrop
    /// @param _startTime start time (in seconds)
    function setStartTime(uint256 _startTime) external onlyOwner {
        require(_startTime > block.timestamp, "Invalid start time");
        startTime = _startTime;
    }

    /// @notice set duration for airdrop
    /// @param _duration duration (in days)
    function setDuration(uint256 _duration) external onlyOwner {
        require(_duration > 0, "Invalid duration days");
        duration = _duration;
    }

    /// @notice set merkle root
    function setMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
        merkleRoot = _merkleRoot;
        emit MerkleRootSet(_merkleRoot);
    }

    /// @notice Allows claiming tokens if address is part of merkle tree
    /// @param to address of claimee
    /// @param amount of tokens owed to claimee
    /// @param proof merkle proof to prove address and amount are in tree
    function claim(
        address to,
        uint256 amount,
        bytes32[] calldata proof
    ) external {
        uint256 endTime = startTime + duration * 86400;
        // check valid timestamp
        require(block.timestamp >= startTime && block.timestamp <= endTime, "Airdrop is not started yet or already finished");

        // Throw if address has already claimed tokens
        uint256 alreadyClaimed = claimedAmounts[to];
        require(alreadyClaimed < amount, "ALREADY_CLAIMED_FULL_AMOUNT");
        uint256 claimableAmount = amount - alreadyClaimed;

        // Verify merkle proof, or revert if not in tree
        bytes32 leaf = keccak256(abi.encodePacked(to, amount));
        bool isValidLeaf = MerkleProof.verify(proof, merkleRoot, leaf);
        require(isValidLeaf, "NOT_IN_MERKLE");

        // Set address to claimed
        claimedAmounts[to] = amount;
        KODO.approve(address(ve), claimableAmount);
        // Claim tokens for address
        uint256 tokenId = ve.create_lock_for(claimableAmount, LOCK, to);

        // Emit claim event
        emit Claim(to, claimableAmount, tokenId);
    }

    /// @notice withdraw remaining tokens if airdrop is finished
    function withdrawKODO(address _recipient) external onlyOwner {
        require(block.timestamp > startTime + duration * 86400, "Airdrop is not finished yet");
        uint256 remaining = KODO.balanceOf(address(this));
        require(remaining > 0, "No remaining tokens");
        KODO.transfer(_recipient, remaining);
        // Emit withdrawal event
        emit Withdrawal(_recipient, remaining);
    }

    function setClaimedAmount(address[] memory _accounts, uint256[] memory _amounts) external onlyOwner {
        for (uint256 i = 0; i < _accounts.length; i++) {
            claimedAmounts[_accounts[i]] = _amounts[i];
        }
    }
}