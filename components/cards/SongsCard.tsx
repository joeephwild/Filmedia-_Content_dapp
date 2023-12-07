import { View, Text, Image } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";

type Props = {
  name: string;
  image: string;
  title: string;
  artist: string;
};

const SongsCard = ({ artist, image, name, title }: Props) => {
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
              First Person Shooter
            </Text>
          </View>
        </View>
        <FontAwesome name="play-circle" color="#fff" size={24} />
      </View>
    </View>
  );
};

export default SongsCard;
