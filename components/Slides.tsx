import React from "react";
import {
  View,
  Text,
  ImageBackground,
<<<<<<< HEAD
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
=======
  Dimensions,
  Animated,
  Platform,
>>>>>>> 627d239580b3f3b02bf99f9def94090fe1ad2a1c
} from "react-native";
// import Animated from 'react-native-reanimated';
import { pagesData } from "../utils";

type Props = {
  backgroundColor: string;
  image: any;
  title: string;
  subtitle: string;
  currentIndex: number;
  scrollX: any;
};

const { width, height } = Dimensions.get("window");

const Slides = ({
  backgroundColor,
  image,
  subtitle,
  title,
  currentIndex,
  scrollX,
}: Props) => {
  const scroll = new Animated.Value(0);
<<<<<<< HEAD
  return (
    <View className="min-h-screen w-[391px] items-center">
      <ImageBackground
        source={image}
        className="h-[393px] w-[393px] object-cover"
=======

  const ios = Platform.OS === "ios";
  return (
    <View className="min-h-screen w-[409px]">
      <ImageBackground
        source={image}
        className="h-[399px] w-[100%] object-cover"
>>>>>>> 627d239580b3f3b02bf99f9def94090fe1ad2a1c
      />
      {/** indicators */}

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        {pagesData.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const color = scrollX.interpolate({
            inputRange,
            outputRange: ["#808080", "#4169E1", "#808080"],
            extrapolate: "clamp",
          });
<<<<<<< HEAD
=======
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 30, 10], // change the width here
            extrapolate: "clamp",
          });
>>>>>>> 627d239580b3f3b02bf99f9def94090fe1ad2a1c
          return (
            <Animated.View
              key={i}
              style={{
                height: 10,
<<<<<<< HEAD
                width: 10,
=======
                width: dotWidth,
>>>>>>> 627d239580b3f3b02bf99f9def94090fe1ad2a1c
                borderRadius: 5,
                backgroundColor: color,
                margin: 10,
              }}
            />
          );
        })}
      </View>

      <View className="px-[16px] space-y-[16px] mt-[43px]">
        <Text className="text-[24px] font-bold text-[#fff] text-center">
          {title}
        </Text>
        <Text className="text-[14px] font-bold text-[#fff] text-center">
          {subtitle}
        </Text>
      </View>
    </View>
  );
};

<<<<<<< HEAD
export default Slides;
=======
export default Slides;
>>>>>>> 627d239580b3f3b02bf99f9def94090fe1ad2a1c
