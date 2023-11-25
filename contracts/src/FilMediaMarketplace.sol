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

pragma solidity ^0.8.18;

import {FilMediaToken} from "./FilMediaToken.sol";
import {IERC20} from "./interface/IERC20.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract FilMediaMarketplace {
    AggregatorV3Interface internal dataFeed;

    /////// STRUCTS ////////
    struct Artist {
        address artistAddress;
        uint256[] tokenId; /// THIS IS THE MUSIC ID THAT WOULD BE USED TO IDENTIFY ARTIST MUSICS
        address[] allSubcribers;
    }
    struct User {
        address userAddress;
        address[] subcribeToAddress;
    }

    struct ListMusicNFT {
        address nft;
        uint256 tokenId;
        address artist;
    }

    // help get the number of streams
    struct Music {
        uint256 tokenId;
        uint256 streams;
        address artist;
    }

    /////////// MAPPING /////////////////
    mapping(address artistAddress => Artist) artist;
    mapping(address userAddress => User) user;
    mapping(address artist => mapping(uint256 _tokenId => ListMusicNFT))
        internal _listMusicNfts;
    mapping(address userAddress => mapping(address artistAddr => bool trueOrFalse)) currentlySubcribed; // check if a user is currently subcribed
    mapping(uint256 tokenId => Music) music;

    ////////////// EVENTS /////////////////
    event ListedMusicNFT(
        address indexed nft,
        uint256 indexed tokenId,
        address indexed artist,
        uint256 chainid
    );

    event SubcribedToArtist(
        address indexed subcriber,
        address indexed artist,
        uint256 chainid
    );

    event CanceledSubcription(
        address indexed subcriber,
        address indexed artist,
        uint256 chainid
    );

    /**
     * Network: Avalanche Testnet
     * Aggregator: AVAX / USD
     * Address: 0x5498BB86BC934c8D34FDA08E81D444153d0D06aD
     */
    constructor() {
        dataFeed = AggregatorV3Interface(
            0x5498BB86BC934c8D34FDA08E81D444153d0D06aD
        );
    }

    // @notice For Listing Artist music to the DB
    // @dev this adds the a user to the artist struct
    // @param no params
    function listNFT(
        address _nft,
        uint256 _tokenId,
        address _artistAddr
    ) public {
        Artist _artist = artist[_artistAddr];

        // @state changes
        _artist.tokenId.push(_tokenId);
        _artist.allSubcribers.push(msg.sender);

        _listMusicNfts[_artistAddr][_tokenId] = ListedMusicNFT({
            nft: _nft,
            tokenId: _tokenId,
            artist: _artistAddr
        });

        music[_tokenId] = Music({
            nft: _nft,
            tokenId: _tokenId,
            artist: _artistAddr
        });

        emit ListedMusicNFT(_nft, _tokenId, _artist, block.chainid);
    }

    // @notice For Subcribing to a particular artist
    // @dev this adds the a user to the artist struct
    // @param no params
    function subcribeToArtist(address _artistAddr) public payable {
        // @DO's
        // check if a user has enough enough token (up to 1dollar)
        // tranfser the token from the user
        // check if the user is already in the artist subcribers
        // YES -> SKIP next
        // NO -> add the user to the artist subcribers
        // call the chainlink func to call this same function 1 month
        // change user currently subcrib to true
        int answer = getChainlinkDataFeedLatestAnswer();

        uint256 avaxUsd = 1e18 / uint256(answer);
        uint256 balanceOfUser = msg.sender.balance;
        bool isSucribed = currentlySubcribed[msg.sender][_artistAddr];

        User storage _user = user[msg.sender];
        Artist storage _aritst = artist[_artistAddr];

        for (uint i = 0; i < _user.subcribeToAddress.length; i++) {
            if (_user.subcribeToAddress[i] != _artistAddr) {
                _aritst.allSubcribers.push(msg.sender);
                _user.subcribeToAddress.push(_artistAddr);
            }
        }

        // @checks
        require(isSucribed, "Not subcribed");
        require(balanceOfUser >= avaxUsd, "Insufficient Balance");

        (bool success, ) = address(this).call{value: msg.value}("");
        require(success, "Unable to send Avax");
        bool _currentlySubribed = currentlySubcribed[msg.sender][_artistAddr];
        _currentlySubribed = true;

        // call the chainlink func
        emit SubcribedToArtist(msg.sender, _artistAddr, block.chainid);
    }

    function cancelSubcribtion(address _artistAddr) public {
        // @DO's
        // remove the user from the artist address
        // change user currently subcrib to false
        /// after removing, VRF wont be able to deduct money
        bool _currentlySubribed = currentlySubcribed[msg.sender][_artistAddr];

        // @state changes
        _currentlySubribed = false;

        emit CanceledSubcription(msg.sender, _artistAddr, block.chainid);
    }

    function getChainlinkDataFeedLatestAnswer() public view returns (int) {
        // prettier-ignore
        (
            /* uint80 roundID */,
            int answer,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = dataFeed.latestRoundData();
        return answer;
    }
    //////////////// GETTERS (PURE AND VIEW)/////////////////////////
}
