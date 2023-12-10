import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

export const PROVIDER =
  "https://polygon-mumbai.g.alchemy.com/v2/v5XGTeB99ScNm1Kr5N7y_GsR0hT2NOsZ";
export const filMediaMarketplaceAddress =
  "0x668034547fE00FDdac398995d0cc32016CCcdA49";
export const dynamicNftAddress = "0x37Fcc95854a8E43c5D1b590e9dC0DCe8c62AFEf3";
export const artistNFTAddress = "0x6c89189eCa87d4C121aB2654B7959417d5536424";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri:
    process.env.NEXT_PUBLIC_SUBGRAPH_URL ||
    "https://api.studio.thegraph.com/query/42226/filmedia2/version/latest",
});
