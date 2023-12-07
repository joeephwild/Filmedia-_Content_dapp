checkout and perform upkeep function behaviours
    Chainlink Keepers are decentralized services that can automatically perform functions (called "upkeeps") when certain conditions are met.

    The checkUpkeep function is used to determine whether an upkeep is needed. It loops through all the subscriptions in the isSubscribed array and checks if the time since the last payment is greater than a month. If it is, it sets upkeepNeeded to true and stores the details of the last checked subscription in the lastChecked variable.

    The performUpkeep function is called when upkeepNeeded is true. It checks if the time since the last payment is greater than a month. If it is, it retrieves the latest answer from a Chainlink data feed (presumably to get the current price of AVAX in USD), calculates the equivalent in AVAX, and checks if the user's balance is greater than or equal to this amount. If it is, it deducts one AVAX from the user's balance, updates the last payment timestamp, and sets monthlySubscriptionBool to true. If the user's balance is less than the required amount, it sets monthlySubscriptionBool to false and currentlySubscribed to false.

CONTRACT ADDRESSES
0xeF0f3Ac406aE5879f73e07126d544f126Fb8a3F5 - token
<!-- 0xeF0f3Ac406aE5879f73e07126d544f126Fb8a3F5 - NFT -->
<!-- 0xeF0f3Ac406aE5879f73e07126d544f126Fb8a3F5 - MARKETPLACE -->
<!-- 0xeF0f3Ac406aE5879f73e07126d544f126Fb8a3F5 - NFT Dynamic -->