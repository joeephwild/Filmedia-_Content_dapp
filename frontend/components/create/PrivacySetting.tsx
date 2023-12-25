import { View, Text } from "react-native";
import React, { useRef } from "react";
import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet";
import UserAvatar from "react-native-user-avatar";

type Props = {
  sheetRef: React.RefObject<BottomSheetMethods>;
};

const PrivacySetting = ({ sheetRef }: Props) => {
  return (
    <BottomSheet
      ref={sheetRef}
      height={"50%"}
      style={{
        backgroundColor: "#000",
      }}
    >
      <Text className="text-center justify-center text-[#fff] font-opensans-bold text-[16px]">
        Privacy Settings
      </Text>
      <View className="px-5 mt-9 space-y-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-2">
            <UserAvatar size={50} name="er" />
            <View className="items-start ">
              <Text className="text-[#fff] text-[12px] font-opensans-bold">
                Your Story
              </Text>
              <Text className="text-gray-400 text-[10px] font-opensans-bold">
                Share with everyone
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-row items-center space-x-2">
          <UserAvatar size={50} name="er" />
          <View className="items-start ">
            <Text className="text-[#fff] text-[12px] font-opensans-bold">
              Your Story
            </Text>
            <Text className="text-gray-400 text-[10px] font-opensans-bold">
              Share with everyone
            </Text>
          </View>
        </View>
        <View className="flex-row items-center space-x-2">
          <UserAvatar size={50} name="er" />
          <View className="items-start ">
            <Text className="text-[#fff] text-[12px] font-opensans-bold">
              Your Story
            </Text>
            <Text className="text-gray-400 text-[10px] font-opensans-bold">
              Share with everyone
            </Text>
          </View>
        </View>
      </View>
    </BottomSheet>
  );
};

export default PrivacySetting;
