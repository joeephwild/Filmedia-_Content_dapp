// SPDX-License-Identifier: GPL-2.0-or-later

pragma solidity ^0.8.18;

import {IStructs} from "./IStructs.sol";

interface IMarketplace is IStructs {
    // Functions
    function checkIfUserIsSubcribed(
        address artistAddr
    ) external view returns (SubriberAnalytics memory _analytics);

    function getSubcribers() external view returns (SubriberAnalytics[] memory);

    function getAnalytics(
        address subcriberAddress,
        address artistAddress
    ) external view returns (SubriberAnalytics memory);

    function getTokenId(
        address subcriberAddress,
        address artistAddress
    ) external view returns (uint256);

    function getArtist(
        address artistAddress
    ) external view returns (Artist memory);

    function checkIfUserIsSubcribed(
        address subcriberAddress,
        address artistAddress
    ) external view returns (bool _isSubcribedBool);
}
