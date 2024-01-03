import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, View, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import MusicPlayer from "../../components/MusicPlayer";

// function Fon(props: {
//   name: React.ComponentProps<typeof FontAwesome>["name"];
//   color: string;
// }) {
//   return <FontAwesome5 size={20} style={{ marginBottom: -3 }} {...props} />;
// }

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { playerOpen, currentlyPlayed } = useAuth();
  return (
    <View style={{ flex: 1, flexDirection: "column-reverse" }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#fc3c44",
          tabBarInactiveTintColor: "",
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#1B1212",
            // borderTopColor: "transparent",
          },
        }}
        sceneContainerStyle={{
          backgroundColor: "#191414",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Explore",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="compass" color={color}  size={20}/>
            ),
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            title: "Search",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="search" color={color} size={20} />
            ),
          }}
        />
        <Tabs.Screen
          name="music"
          options={{
            title: "Music",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="music" color={color} size={20}/>
            ),
          }}
        />
        <Tabs.Screen
          name="videos"
          options={{
            title: "Videos",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="video" color={color} size={20} />
            ),
          }}
        />
        <Tabs.Screen
          name="ticket"
          options={{
            title: "Ticket",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="ticket-alt" color={color} size={20}/>
            ),
          }}
        />
        <Tabs.Screen
          name="live"
          options={{
            title: "Live Event",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="broadcast-tower" color={color} size={20} />
            ),
          }}
        />
      </Tabs>
      {playerOpen && <MusicPlayer currentlyplayed={currentlyPlayed} />}
    </View>
  );
}
