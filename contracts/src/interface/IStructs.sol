// SPDX-License-Identifier: GPL-2.0-or-later

pragma solidity ^0.8.18;

interface IStructs {
    struct SubriberAnalytics {
        // subcriber analystics
        uint256 lastPaymentTimestamp;
        bool currentlySubcribed;
        address artist;
        address subcriber;
        uint256 subcribedDate;
    }
    struct Artist {
        address artistAddress;
        uint256[] tokenIds; /// THIS IS THE MUSIC ID THAT WOULD BE USED TO IDENTIFY ARTIST MUSICS
        address[] allSubcribers;
        string[] nfts;
    }
}
