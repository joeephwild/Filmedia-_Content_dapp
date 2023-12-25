import { View, Text, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { router, useLocalSearchParams } from "expo-router";
import { artistsArr } from "../utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import YourPlaylist from "../components/userProfile/YourPlaylist";

interface ArtistProfile {
  name: string;
  owner: string;
  description: string;
  image: string;
  external_url: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
}

const ArtistProfile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [artistprofile, setArtistProfile] = useState<ArtistProfile>();
  const params = useLocalSearchParams();
  const { address } = params;

  useEffect(() => {}, []);

  useEffect(() => {
    const filteredArtists = artistsArr.filter(
      (artist) => artist.owner === address
    );
    setArtistProfile(filteredArtists[0]);
  });

  return (
    <ScrollView
      style={{ flex: 1, minHeight: "100%", marginBottom: 789 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 60, // Adjust padding as needed
      }}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={{
          uri: "https://images.pexels.com/photos/2911379/pexels-photo-2911379.jpeg?auto=compress&cs=tinysrgb&w=600",
        }}
        className="h-[350px] object-cover"
        imageStyle={{ resizeMode: "cover" }}
      >
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.01)", "#191414"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 180,
          }}
        />
        <SafeAreaView className="flex-1">
          <View className="flex-row  items-center justify-between px-9">
            <FontAwesome onPress={() => router.back()} name="arrow-left" size={20} color="#fff" />
            <View className="flex-row items-center space-x-3">
              <FontAwesome5 name="wallet" size={20} color="#fff" />
              <FontAwesome5 name="cog" size={20} color="#fff" />
            </View>
          </View>
          <View
            style={{ alignItems: "center" }}
            className="flex-1 mt-[70px] justify-end"
          >
            <Text style={{ fontSize: 40, fontWeight: "bold", color: "#fff" }}>
              Davido
            </Text>
            <Text
              style={{ fontSize: 15, fontWeight: "bold", color: "#A8A8A8" }}
            >
              200:00 TLC
            </Text>
          </View>
          <View className="flex-row items-end justify-end flex-1 mx-auto">
            <TouchableOpacity className="mx-auto items-center mr-4 mt-7 px-6 py-2">
              <Text className="font-opensans-bold text-[#fff] text-[20px]">
                20.9k
              </Text>
              <Text
                style={{ fontSize: 12, fontWeight: "bold", color: "#fff" }}
                className="font-opensans-regular"
              >
                Following
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => follow()}
              className="mx-auto mt-7 px-6 py-2 items-center"
            >
              <Text className="font-opensans-bold text-[#fff] text-[20px]">
                20.9k
              </Text>
              <Text
                style={{ fontSize: 12, fontWeight: "bold", color: "#fff" }}
                className="font-opensans-regular"
              >
                Subscribers
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>

      <View className="flex-1 min-h-screen">
        <YourPlaylist />
      </View>
    </ScrollView>
  );
};

export default ArtistProfile;
