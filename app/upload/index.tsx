import {
  Alert,
  Button,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { InputField } from "../../components/FormField";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import {
  _addNFTForArtist,
  _getTokenIdArtist,
  _getWalletAddress,
  _listNFT,
  _safeMintArtist,
} from "../../constants/_helperFunctions";
import { artistNFTAddress } from "../../constants/addresses";

const index = () => {
  const [firstNFT, setFirstNFT] = useState("");
  const [secondNFT, setSecondNFT] = useState("");
  const [thirdNFT, setThirdNFT] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [musicName, setmusicName] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingNFT, setloadingNFT] = useState(false);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const metadata = {
        name: name,
        description: description,
        image: file,
        category: "audio",
      };

      console.log("called");
      //   const data = await axios.post(
      //     `https://jade-drab-crane.cyclic.app/api/pin-data/pin-file`,
      //     metadata
      //   );

      //   console.log("This is the data", data);
      const walletAddress = await _getWalletAddress();
      // call the mint contract
      await _safeMintArtist({
        artistAddress: walletAddress,
        uri: "https://gateway.pinata.cloud/ipfs/QmfDoQdyiBXdZrnD5pZ18KSRX5xHTqThwGdy4cSVXriADP",
      });

      const tokenId = await _getTokenIdArtist();

      await _listNFT({
        _nft: artistNFTAddress,
        tokenId: tokenId.toString(),
        _artistAddr: walletAddress,
      });

      setLoading(false);
      Alert.alert("Successfully Listed NFTS");
    } catch (error) {
      setLoading(false);
      Alert.alert("Not Successful");
      console.log(error);
    }
  };

  const handleSubmitNFTS = async () => {
    try {
      setloadingNFT(true);
      const walletAddress = await _getWalletAddress();

      await _addNFTForArtist({
        _artistAddr: walletAddress,
        nfts: [firstNFT, secondNFT, thirdNFT],
      });

      setLoading(false);
      Alert.alert("Successfully Listed");
    } catch (error) {
      setloadingNFT(false);
      Alert.alert("Not Successful");
      console.log(error);
    }
  };
  const pickDocument = async () => {
    let result: any = await DocumentPicker.getDocumentAsync({
      type: "audio/*", // All audio files
      copyToCacheDirectory: true, // Optional: If true, the picked file is copied to app's cache directory. Defaults to true.
    });

    if (result) {
      // result.uri is the URI to the selected file
      setmusicName(result.assets[0].name);
      const base64 = await getBase64(result.assets[0].uri);
      setFile(base64);
    }
  };

  const getBase64 = async (fileUri: string) => {
    const fileData = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    return fileData;
  };

  return (
    <ScrollView
      style={{ flex: 1, minHeight: "100%", marginBottom: 789 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 760, // Adjust padding as needed
      }}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={{
          uri: "https://images.pexels.com/photos/19230155/pexels-photo-19230155/free-photo-of-a-little-boy-with-curly-hair-standing-outside.jpeg?auto=compress&cs=tinysrgb&w=300",
        }}
        className="h-[296px] object-cover"
        imageStyle={{ resizeMode: "cover" }}
      >
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.01)", "#001F3F"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 180,
          }}
        />
      </ImageBackground>
      <View style={{ position: "absolute", top: 135, right: 0, left: 0 }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 40, fontWeight: "bold", color: "#fff" }}>
            Davido
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#A8A8A8" }}>
            Subscribers 3.7M
          </Text>
        </View>
      </View>

      <View style={styles.inputs}>
        <InputField
          label="Name"
          name="name"
          value={name}
          placeholder="Enter Name"
          onChange={setName}
        />
        <InputField
          label="Description"
          name="description"
          value={description}
          placeholder="Enter Description"
          onChange={setDescription}
        />
        <Button title="SELECT AUDIO" onPress={pickDocument} />
        {musicName && (
          <InputField
            label="Music Name"
            name="musicName"
            value={musicName}
            placeholder="Enter Description"
            onChange={setmusicName}
          />
        )}

        <TouchableOpacity
          onPress={handleSubmit}
          className="py-[16px] px-[40px] items-center bg-[#4169E1] rounded-[40px]"
        >
          <Text className="text-[14px] font-bold text-[#fff]">
            {loading ? "Uploading..." : "Upload"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputs}>
        <Text style={{ color: "white", marginTop: 10, fontSize: 20 }}>
          UPLOAD YOUR NFT'S
        </Text>
        <InputField
          label="FIRST NFT"
          name="name"
          value={firstNFT}
          placeholder="First  NFT"
          onChange={setFirstNFT}
        />
        <InputField
          label="SECOND NFT"
          name="description"
          value={secondNFT}
          placeholder="SECOND  NFT"
          onChange={setSecondNFT}
        />
        <InputField
          label="THIRD NFT"
          name="musicName"
          value={thirdNFT}
          placeholder="THIRD  NFT"
          onChange={setThirdNFT}
        />

        <TouchableOpacity
          onPress={handleSubmitNFTS}
          className="py-[16px] px-[40px] items-center bg-[#4169E1] rounded-[40px]"
        >
          <Text className="text-[14px] font-bold text-[#fff]">
            {loadingNFT ? "Uploading..." : "Upload Your NFTS"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({
  inputs: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
