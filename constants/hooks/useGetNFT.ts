import React, { useEffect, useState } from "react";
import { _getTokenUriArtist } from "../_helperFunctions";

const useGetNFTs = (tokenId: number, nft: any) => {
  const [imageURI, setImageURI] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenDescription, setTokenDescription] = useState("");
  const [category, setCategory] = useState("");

  async function updateUI() {
    console.log(tokenId, " thsususuuuuuuuuuuuuuuuuuuu");
    const tokenURI: string | null = await _getTokenUriArtist({
      tokenId: tokenId,
    });

    console.log(`The TokenURI is ${tokenURI}`);
    // We are going to cheat a little here...
    if (tokenURI != null) {
      // IPFS Gateway: A server that will return IPFS files from a "normal" URL.
      const requestURL = "https://ipfs.io/ipfs/" + tokenURI;
      const tokenURIResponse = await (await fetch(requestURL)).json();
      console.log(tokenURIResponse);
      const imageURI = tokenURIResponse.image;
      const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/");
      setImageURI(imageURIURL);
      setTokenName(tokenURIResponse.name);
      setTokenDescription(tokenURIResponse.description);
      setCategory(tokenURIResponse.category);

      // We could render the Image on our sever, and just call our sever.
      // For testnets & mainnet -> use moralis server hooks
      // Have the world adopt IPFS
      // Build our own IPFS gateway
    }
    // get the tokenURI
    // using the image tag from the tokenURI, get the image
  }

  useEffect(() => {
    // if (location.pathname.includes("nftmarketplace")) {
    updateUI();
    // }
  }, [tokenId]);

  return [imageURI, tokenName, tokenDescription, category, updateUI];
};

export default useGetNFTs;
