// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {FilMediaDynamicNFT} from "../src/FilMediaDynamicNFT.sol";

contract DeployDynamicNFT is Script {
    constructor() {}

    FilMediaDynamicNFT _filMediaDynamicNFT;

    address marketplaceAddress = 0x8B9B8E90bf77B6f9e4864BbD8f2EE67f46bdc962;

    function run() external returns (FilMediaDynamicNFT smdxaddr) {
        vm.startBroadcast();
        _filMediaDynamicNFT = new FilMediaDynamicNFT(marketplaceAddress);
        vm.stopBroadcast();
        return _filMediaDynamicNFT;
    }
}
