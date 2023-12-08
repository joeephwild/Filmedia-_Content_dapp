import { ethers } from "ethers";
import {
  PROVIDER,
  filMediaMarketplaceAddress,
  dynamicNftAddress,
  artistNFTAddress,
} from "./addresses";
import filMediaMarketplaceAbi from "./abis/FilMediaMarketplace.json";
import dynamicNftAbi from "./abis/FilMediaDynamicNFTAbi.json";
import artistNFTAbi from "./abis/FilMediaArtistNFTAbi.json";
import { getAccountPhrase } from "@rly-network/mobile-sdk";

let filMediaMarketplaceContract: any,
  dynamicNftContract: any,
  artistNFTContract: any;

const connect = async () => {
  const mnemonic: any = await getAccountPhrase();
  const mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic);

  let privateKey = mnemonicWallet.privateKey;
  const provider = new ethers.providers.JsonRpcProvider(PROVIDER);

  const signer = new ethers.Wallet(privateKey, provider);

  filMediaMarketplaceContract = new ethers.Contract(
    filMediaMarketplaceAddress,
    filMediaMarketplaceAbi,
    signer
  );
  dynamicNftContract = new ethers.Contract(
    dynamicNftAddress,
    dynamicNftAbi,
    signer
  );
  artistNFTContract = new ethers.Contract(
    artistNFTAddress,
    artistNFTAbi,
    signer
  );
};
connect();

///////////////// MARKETPLACE CONTRACT  //////////////////////////////
// Function to interact with the "listNFT" Solidity function
export const _listNFT = async ({
  _nft,
  tokenId,
  _artistAddr,
}: {
  _nft: string;
  tokenId: number;
  _artistAddr: string;
}): Promise<void> => {
  try {
    const tx = await filMediaMarketplaceContract.listNFT(
      _nft,
      tokenId,
      _artistAddr
    );
    await tx.wait();
    console.log("Transaction successful:", tx.hash);
  } catch (error) {
    console.error("Error listing NFT:", error);
  }
};

// Function to interact with the "addNFTForArtist" Solidity function
export const _addNFTForArtist = async ({
  _artistAddr,
  nfts,
}: {
  _artistAddr: string;
  nfts: string[3];
}): Promise<void> => {
  try {
    const tx = await filMediaMarketplaceContract.addNFTForArtist(
      _artistAddr,
      nfts
    );
    await tx.wait();
    console.log("Transaction successful:", tx.hash);
  } catch (error) {
    console.error("Error adding NFTs for artist:", error);
  }
};

// Function to interact with the "deposit" Solidity function
export const _deposit = async ({ value }: { value: string }): Promise<void> => {
  try {
    const valueToSend = ethers.utils.parseEther(value); // Replace '1' with the desired amount in ETH
    const tx = await filMediaMarketplaceContract.deposit({
      value: valueToSend,
    });
    await tx.wait();
    console.log("Transaction successful:", tx.hash);
  } catch (error) {
    console.error("Error depositing ETH:", error);
  }
};

// Function to interact with the "subcribeToArtist" Solidity function
export const _subcribeToArtist = async ({
  _artistAddr,
}: {
  _artistAddr: string;
}): Promise<void> => {
  try {
    const tx = await filMediaMarketplaceContract.subcribeToArtist(_artistAddr);
    await tx.wait();
    console.log("Transaction successful:", tx.hash);
  } catch (error) {
    console.error("Error subscribing to artist:", error);
  }
};

// Function to interact with the "cancelSubcribtion" Solidity function
export const _cancelSubcribtion = async ({
  _artistAddr,
}: {
  _artistAddr: string;
}): Promise<void> => {
  try {
    const tx = await filMediaMarketplaceContract(_artistAddr);
    await tx.wait();
    console.log("Transaction successful:", tx.hash);
  } catch (error) {
    console.error("Error canceling subscription:", error);
  }
};

// Function to interact with the "setTokenId" Solidity function
export const _setTokenId = async ({
  subcriberAddress,
  artistAddress,
  tokenId,
  nftAddress,
}: {
  subcriberAddress: string;
  artistAddress: string;
  tokenId: number;
  nftAddress: string;
}): Promise<void> => {
  try {
    const tx = await filMediaMarketplaceContract.setTokenId(
      subcriberAddress,
      artistAddress,
      tokenId,
      nftAddress
    );
    await tx.wait();
    console.log("Transaction successful:", tx.hash);
  } catch (error) {
    console.error("Error setting token ID:", error);
  }
};

// Function to interact with the "checkIfUserIsSubcribed" Solidity function
export const _checkIfUserIsSubcribed = async ({
  subcriberAddress,
  artistAddress,
}: {
  subcriberAddress: string;
  artistAddress: string;
}): Promise<void> => {
  try {
    const isSubscribed = await filMediaMarketplaceContract(
      subcriberAddress,
      artistAddress
    );
    console.log("Is user subscribed:", isSubscribed);
  } catch (error) {
    console.error("Error checking subscription status:", error);
  }
};

// Function to interact with the "getSubcribers" Solidity function
export const getSubcribers = async (): Promise<any> => {
  try {
    const subcribers = await filMediaMarketplaceContract.getSubcribers();
    return subcribers;
  } catch (error) {
    console.error("Error calling getSubcribers:", error);
    return [];
  }
};

// Function to interact with the "getAnalytics" Solidity function
export const _getAnalytics = async ({
  subcriberAddress,
  artistAddress,
}: {
  subcriberAddress: string;
  artistAddress: string;
}): Promise<any> => {
  try {
    const analytics = await filMediaMarketplaceContract.getAnalytics(
      subcriberAddress,
      artistAddress
    );
    return analytics;
  } catch (error) {
    console.error("Error calling getAnalytics:", error);
  }
};

// Function to interact with the "getTokenId" Solidity function
export const _getTokenId = async ({
  subcriberAddress,
  artistAddress,
}: {
  subcriberAddress: string;
  artistAddress: string;
}): Promise<number> => {
  try {
    const tokenId = await filMediaMarketplaceContract.getTokenId(
      subcriberAddress,
      artistAddress
    );
    return tokenId;
  } catch (error) {
    console.error("Error calling getTokenId:", error);
    return 0;
  }
};

// Function to interact with the "getMusicNFT" Solidity function
export const _getMusicNFT = async ({
  tokenId,
  artistAddress,
}: {
  tokenId: number;
  artistAddress: string;
}): Promise<any> => {
  try {
    const musicNFT = await filMediaMarketplaceContract.getMusicNFT(
      tokenId,
      artistAddress
    );
    return musicNFT;
  } catch (error) {
    console.error("Error calling getMusicNFT:", error);
  }
};

// Function to interact with the "getMusic" Solidity function
export const _getMusic = async ({
  tokenId,
}: {
  tokenId: number;
}): Promise<any> => {
  try {
    const musicInfo = await filMediaMarketplaceContract.getMusic(tokenId);
    return musicInfo;
  } catch (error) {
    console.error("Error calling getMusic:", error);
  }
};

// Function to interact with the "getArtist" Solidity function
export const _getArtist = async ({
  artistAddress,
}: {
  artistAddress: string;
}): Promise<any> => {
  try {
    const artistInfo = await filMediaMarketplaceContract.getArtist(
      artistAddress
    );
    return artistInfo;
  } catch (error) {
    console.error("Error calling getArtist:", error);
  }
};

// Function to interact with the "getUser" Solidity function
export const _getUser = async ({
  userAddress,
}: {
  userAddress: string;
}): Promise<any> => {
  try {
    const userInfo = await filMediaMarketplaceContract.getUser(userAddress);
    return userInfo;
  } catch (error) {
    console.error("Error calling getUser:", error);
  }
};

// Function to interact with the "getUserBalance" Solidity function
export const _getUserBalance = async ({
  userAddress,
}: {
  userAddress: string;
}): Promise<number> => {
  try {
    const balance = await filMediaMarketplaceContract.getUserBalance(
      userAddress
    );
    return balance;
  } catch (error) {
    console.error("Error calling getUserBalance:", error);
    return 0;
  }
};

///////////////// DYNAMIC NFT CONTRACT  //////////////////////////////
// Function to interact with the "safeMint" Solidity function
export const _safeMint = async ({
  artistAddress,
}: {
  artistAddress: string;
}): Promise<void> => {
  try {
    const tx = await dynamicNftContract.safeMint(artistAddress);
    await tx.wait();
    console.log("Transaction successful:", tx.hash);
  } catch (error) {
    console.error("Error calling safeMint:", error);
  }
};

// Function to interact with the "getTokenUri" Solidity function
export const _getTokenUri = async ({
  tokenId,
}: {
  tokenId: number;
}): Promise<void> => {
  try {
    const uri = await dynamicNftContract.getTokenUri(tokenId);
    console.log("Token URI:", uri);
  } catch (error) {
    console.error("Error calling getTokenUri:", error);
  }
};

// Function to interact with the "getTokenId" Solidity function
export const _getTokenIdDynamicNFT = async (): Promise<void> => {
  try {
    const tokenId = await dynamicNftContract.getTokenId();
    console.log("Token ID:", tokenId);
  } catch (error) {
    console.error("Error calling getTokenId:", error);
  }
};

///////////////// ARRIST NFT CONTRACT  //////////////////////////////
// Function to interact with the "safeMint" Solidity function
export const _safeMintArtist = async ({
  artistAddress,
  uri,
}: {
  artistAddress: string;
  uri: string;
}): Promise<void> => {
  try {
    const tx = await artistNFTContract.mint(artistAddress, uri);
    await tx.wait();
    console.log("Transaction successful:", tx.hash);
  } catch (error) {
    console.error("Error calling safeMint:", error);
  }
};

export const _getTokenUriArtist = async ({
  tokenId,
}: {
  tokenId: number;
}): Promise<void> => {
  try {
    const uri = await artistNFTContract.tokenURI(tokenId);
    console.log("Token URI:", uri);
  } catch (error) {
    console.error("Error calling getTokenUri:", error);
  }
};

// Function to interact with the "getTokenId" Solidity function
export const _getTokenIdArtist = async (): Promise<void> => {
  try {
    const tokenId = await artistNFTContract.getCurrentTokenId();
    console.log("Token ID:", tokenId);
  } catch (error) {
    console.error("Error calling getTokenId:", error);
  }
};
