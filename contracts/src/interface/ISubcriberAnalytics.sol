// SPDX-License-Identifier: GPL-2.0-or-later

pragma solidity ^0.8.18;

interface ISubcriberAnalytics {
    struct SubriberAnalytics {
        // subcriber analystics
        uint256 lastPaymentTimestamp;
        bool currentlySubcribed;
        address artist;
        address subcriber;
        uint256 subcribedDate;
    }
}
