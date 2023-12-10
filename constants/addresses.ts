import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

export const PROVIDER =
  "https://polygonzkevm-testnet.g.alchemy.com/v2/0HUhRNHaWQm6WVJXb4ApKkzN8HLlrCB3";
export const filMediaMarketplaceAddress =
  "0xd0200d3b63ec7be9838ce1bea93a2771efeaae9d";
export const dynamicNftAddress = "0x1d1Af5cde8042E43d9787Ae5f2a6cAc09A673c90";
export const artistNFTAddress = "0x9928Cc97fE9138FcF5DD2c635279A27768fa9324";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri:
    process.env.NEXT_PUBLIC_SUBGRAPH_URL ||
    "https://api.studio.thegraph.com/query/42226/filmedia2/version/latest",
});
