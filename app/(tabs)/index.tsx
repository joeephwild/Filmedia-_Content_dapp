import { View, Text, StatusBar, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const explore = () => {
  return (
    <View className="min-h-screen flex-1">
      <StatusBar barStyle="default" />
      <ScrollView>
        <Text className="">explore</Text>
      </ScrollView>
    </View>
  );
};

export default explore;
