import { ApolloClient, InMemoryCache } from "@apollo/client";

export const PROVIDER =
  "https://polygon-mumbai.g.alchemy.com/v2/rTSTOJ-A9kZEEPNn_VUbjqnUFgtYQ2Kd";
export const filMediaMarketplaceAddress =
  "0x8B9B8E90bf77B6f9e4864BbD8f2EE67f46bdc962";
export const dynamicNftAddress = "0x79B48E1dF8735fD260cEBCA4FA63D9A16cD3b540";
export const artistNFTAddress = "0xd0200d3b63ec7be9838ce1bea93a2771efeaae9d";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri:
    process.env.NEXT_PUBLIC_SUBGRAPH_URL ||
    "https://api.studio.thegraph.com/query/42226/filmedia3/0.0.1",
});
