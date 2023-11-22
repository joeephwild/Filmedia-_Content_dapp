import { View, Text, StatusBar } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const explore = () => {
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" />
      <Text className="">explore</Text>
    </SafeAreaView>
  );
};

export default explore;
