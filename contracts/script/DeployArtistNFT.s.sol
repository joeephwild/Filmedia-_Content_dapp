// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {FilMediaArtistNFT} from "../src/FilMediaArtistNFT.sol";

contract DeployArtistNFT is Script {
    constructor() {}

    FilMediaArtistNFT _filMediaArtistNFT;

    function run() external returns (FilMediaArtistNFT smdxaddr) {
        vm.startBroadcast();
        _filMediaArtistNFT = new FilMediaArtistNFT();
        vm.stopBroadcast();
        return _filMediaArtistNFT;
    }
}
