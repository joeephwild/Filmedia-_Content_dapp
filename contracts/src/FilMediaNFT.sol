// Layout of Contract:
// version
// imports
// errors
// interfaces, libraries, contracts
// Type declarations
// State variables
// Events
// Modifiers
// Functions

// Layout of Functions:
// constructor
// receive function (if exists)
// fallback function (if exists)
// external
// public
// internal
// private
// internal & private view & pure functions
// external & public view & pure functions

// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";

contract DynamicArtwork is
    ERC721Enumerable,
    ERC721URIStorage,
    AutomationCompatibleInterface
{
    uint256 private lastCheckedBlock;

    uint256 private _nextTokenId;

    string[] ipfsUri = [
        "https://bafkreibn2ed22zc4h7rhtknra2c5vjjfxtkh7y36nd3mbtd6q6bh5pjs5a.ipfs.nftstorage.link/",
        "https://bafkreidl6qnywykf6p2swigniocenwzkyc432uwrt4ocf5ig7kzduo4hr4.ipfs.nftstorage.link/",
        "https://bafkreicxa5zvfzwckqewjd7fdxphwrgwz3awww772nja4fptmjo4nim4ha.ipfs.nftstorage.link/"
    ];

    constructor() ERC721("DynamicNft", "DNFT") {
        lastCheckedBlock = block.number; // Initialize with the current block number
    }

    function safeMint() public {
        _nextTokenId++;
        _safeMint(msg.sender, _nextTokenId);
        _setTokenURI(_nextTokenId, ipfsUri[0]);
    }

    function checkUpkeep(
        bytes calldata /*checkData*/
    )
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory performData)
    {
        // Check if the block number has changed since the last check
        bool blockNumberChanged = block.number > lastCheckedBlock;

        if (blockNumberChanged) {
            // If the block number has changed, set upkeepNeeded to true
            return (true, abi.encode(block.number));
        }

        // If the block number hasn't changed, return false
        return (false, bytes(""));
    }

    function performUpkeep(bytes calldata performData) external override {
        // Decode the performData to get the latest block number
        uint256 latestBlockNumber = abi.decode(performData, (uint256));

        // Ensure that the latest block number is valid and has changed since the last check
        require(
            latestBlockNumber > lastCheckedBlock,
            "Block number hasn't changed."
        );

        // Implement the logic to change the dynamic image based on the latest block number
        updateDynamicImage(latestBlockNumber);

        // Update the lastCheckedBlock to the latest block number
        lastCheckedBlock = latestBlockNumber;
    }

    function updateDynamicImage(uint256 latestBlockNumber) internal {
        // Determine the parity of the latest block number (even or odd)
        bool isEvenBlock = latestBlockNumber % 2 == 0;

        // Use the parity to choose an image
        string memory newImageURI;

        if (isEvenBlock) {
            // If the latest block number is even, use one image
            newImageURI = "https://bafkreidl6qnywykf6p2swigniocenwzkyc432uwrt4ocf5ig7kzduo4hr4.ipfs.nftstorage.link/";
        } else {
            // If the latest block number is odd, use another image
            newImageURI = "https://bafkreicxa5zvfzwckqewjd7fdxphwrgwz3awww772nja4fptmjo4nim4ha.ipfs.nftstorage.link/";
        }

        // Update the token URI of all NFTs with the new image URI
        for (uint256 tokenId = 0; tokenId < balanceOf(msg.sender); tokenId++) {
            _setTokenURI(tokenOfOwnerByIndex(msg.sender, tokenId), newImageURI);
        }
    }

    function getTokenUri(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
    }

    //determine the stage of the NFT
    function getStage(uint256 tokenId) public view returns (uint256) {
        string memory _uri = tokenURI(tokenId);

        uint256 id;
        //seed
        if (
            keccak256(abi.encodePacked((_uri))) ==
            keccak256(
                abi.encodePacked(
                    (
                        "https://bafkreibn2ed22zc4h7rhtknra2c5vjjfxtkh7y36nd3mbtd6q6bh5pjs5a.ipfs.nftstorage.link/"
                    )
                )
            )
        ) {
            return id = 0;
        }
        return id;
    }

    // The following functions are overrides required by Solidity.
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721Enumerable, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
