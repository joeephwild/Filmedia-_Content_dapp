import { View, Text, Image } from "react-native";
import React from "react";

type Props = {
  name: string;
  image: string;
  title: string;
  artist: string;
};

const ArtistCard = ({ artist, image, name, title }: Props) => {
  return (
    <View className="flex-row items-center space-x-3 pb-5">
      <Text className="text-[14px] text-[#fff] font-bold">1</Text>
      <View className="flex-row items-center space-x-8">
        <Image
          source={{
            uri: image,
          }}
          className="w-[90px] rounded-full h-[90px] bg-black"
        />
        <View>
          <Text className="text-[14px] text-[#fff] font-bold">{artist}</Text>
          <Text className="text-[10px] text-[#808080] font-bold">
            81.1m Total Plays 81.1m Total Plays
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ArtistCard;
