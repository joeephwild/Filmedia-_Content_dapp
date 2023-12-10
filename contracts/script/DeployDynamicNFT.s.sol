// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {FilMediaDynamicNFT} from "../src/FilMediaDynamicNFT.sol";

contract DeployArtistNFT is Script {
    constructor() {}

    FilMediaDynamicNFT _filMediaDynamicNFT;

    address marketplaceAddress = 0x668034547fE00FDdac398995d0cc32016CCcdA49;

    function run() external returns (FilMediaDynamicNFT smdxaddr) {
        vm.startBroadcast();
        _filMediaDynamicNFT = new FilMediaDynamicNFT(marketplaceAddress);
        vm.stopBroadcast();
        return _filMediaDynamicNFT;
    }
}
