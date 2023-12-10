// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {FilMediaMarketplace} from "../src/FilMediaMarketplace.sol";

contract DeployFilMediaMarketplace is Script {
    constructor() {}

    FilMediaMarketplace _filMediaMarketplace;

    function run() external returns (FilMediaMarketplace smdxaddr) {
        vm.startBroadcast();
        _filMediaMarketplace = new FilMediaMarketplace();
        vm.stopBroadcast();
        return _filMediaMarketplace;
    }
}
