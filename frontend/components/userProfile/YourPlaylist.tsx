import { View, Text, Image } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";

const YourPlaylist = () => {
  const data = {
    playlists: [
      {
        id: 1,
        name: "Next Level Songs",
        ownerWalletAddress: "0x3D980E50508CFd41a13837A60149927a11c03731",
        image:
          "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg",
        songs: [
          {
            id: 1,
            name: "Song 1",
            artist: "Artist 1",
            duration: "3:15",
          },
          {
            id: 2,
            name: "Song 2",
            artist: "Artist 2",
            duration: "4:20",
          },
        ],
      },
      {
        id: 2,
        name: "Radar Africa",
        ownerWalletAddress: "0x3D980E50508CFd41a13837A60149927a11c03732",
        image:
          "https://images.pexels.com/photos/167093/pexels-photo-167093.jpeg",
        songs: [
          {
            id: 3,
            name: "Song 3",
            artist: "Artist 3",
            duration: "2:45",
          },
          {
            id: 4,
            name: "Song 4",
            artist: "Artist 4",
            duration: "3:30",
          },
        ],
      },
      // ... add more playlists as needed
    ],
  };
  return (
    <View className="px-[20px]">
      <View className="flex-row items-center justify-between">
        <Text className="text-[#fff] font-opensans-bold text-[16px]">
          Your Playlist
        </Text>
        <Text className="text-gray-400 font-opensans-regular text-[12px]">
          More
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="gap-5 pt-2"
      >
        {data.playlists.map((item, index) => (
          <View key={index}>
            <Image
              source={{
                uri: item.image,
              }}
              className="h-[170px] w-[170px]"
            />
            <Text className="text-[16px] font-opensans-bold text-[#fff]">
              {item.name}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default YourPlaylist;
