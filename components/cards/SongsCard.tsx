import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import useGetNFTs from "../../constants/hooks/useGetNFT";
import { artistNFTAddress } from "../../constants/addresses";
import { Audio } from "expo-av";

type Props = {
  name: string;
  image: string;
  title: string;
  artist: string;
  tokenId: number;
};

const SongsCard = ({ artist, image, name, title, tokenId }: Props) => {
  const [imageURI, tokenName, tokenDescription, category] = useGetNFTs(
    tokenId,
    artistNFTAddress
  );

  async function playSound() {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    try {
      const { sound: playbackObject } = await Audio.Sound.createAsync(
        {
          uri: imageURI,
        },
        { shouldPlay: true }
      );

      playbackObject.stopAsync();
      // await soundObject.playAsync();
      // Your sound is playing!
    } catch (error) {
      console.log("Error loading audio", error);
    }
  }

  console.log(imageURI);
  return (
    <View className="flex-row items-center space-x-2 w-full pb-4">
      <Text className="border-y text-[#fff] border-[#fff]">1</Text>
      <View className="flex-row items-center space-x-[78px]">
        <View className="flex-row items-center space-x-6">
          <Image
            source={{
              uri: image,
            }}
            className="w-[80px] h-[80px] bg-black"
          />
          <View className="">
            <Link href={`/artist/${name}`}>
              <Text className="text-[#fff] text-[16px] font-bold">{name}</Text>
            </Link>
            <Text className="text-[#fff] text-[14px] font-semibold">
              {tokenName}
            </Text>
            <Text className="text-[#fff] text-[14px] font-semibold">
              {tokenDescription}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={playSound}>
          <FontAwesome name="play-circle" color="#fff" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SongsCard;
