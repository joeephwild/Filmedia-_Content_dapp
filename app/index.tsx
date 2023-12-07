import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  Pressable,
} from "react-native";
import React, { useRef, useState } from "react";
import Onboarding from "react-native-onboarding-swiper";
import { pagesData } from "../utils";
import Slides from "../components/Slides";

const { width, height } = Dimensions.get("window");

const OnboardingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollX = new Animated.Value(0);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    console.log(nextIndex);
    if (nextIndex < pagesData.length) {
      // Only proceed to the next slide if it exists
      // You can update currentIndex or perform any other action
      setCurrentIndex(nextIndex);
      // Scroll to the next index
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    } else {
      // Handle reaching the end of the onboarding slides
      // You can navigate to the next screen or perform any other action
    }
  };

  const handleSkip = () => {
    const lastIndex = pagesData.length - 1;
    setCurrentIndex(lastIndex);
    if (flatListRef.current !== null) {
      flatListRef.current.scrollToIndex({ index: lastIndex, animated: true });
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <FlatList
        ref={flatListRef}
        data={pagesData}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        onMomentumScrollEnd={(ev) => {
          const newIndex = Math.round(ev.nativeEvent.contentOffset.x / width);
          console.log(newIndex)
          setCurrentIndex(newIndex);
        }}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        renderItem={({ item, index }) => (
          <Slides
            backgroundColor={item.backgroundColor}
            image={item.image}
            title={item.title}
            subtitle={item.subtitle}
            currentIndex={index}
            scrollX={scrollX}
          />
        )}
      />

      <View className="flex-row items-center justify-evenly w-full mb-[30px]">
        <Pressable
          onPress={handleSkip}
          className="bg-transparent px-[40px] py-[16px] rounded-[40px] items-center justify-center"
        >
          <Text className="text-[14px] text-[#4169E1] font-bold">Skip</Text>
        </Pressable>
        <Pressable
          onPress={handleNext}
          className="bg-[#4169E1] px-[40px] py-[16px] rounded-[40px] items-center justify-center"
        >
          <Text className="text-[14px] font-bold text-white">
            {currentIndex === 2 ? "Create Account" : "Next"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default OnboardingPage;
=======
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  Pressable,
  StatusBar,
} from "react-native";
import React, { useRef, useState } from "react";
import Onboarding from "react-native-onboarding-swiper";
import { pagesData } from "../utils";
import Slides from "../components/Slides";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

const OnboardingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollX = new Animated.Value(0);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    console.log(nextIndex);
    if (nextIndex < pagesData.length) {
      // Only proceed to the next slide if it exists
      // You can update currentIndex or perform any other action
      setCurrentIndex(nextIndex);
      // Scroll to the next index
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    } else {
      // Handle reaching the end of the onboarding slides
      // You can navigate to the next screen or perform any other action
      router.push("/(auth)");
    }
  };

  const handleSkip = () => {
    const lastIndex = pagesData.length - 1;
    setCurrentIndex(lastIndex);
    if (flatListRef.current !== null) {
      flatListRef.current.scrollToIndex({ index: lastIndex, animated: true });
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <StatusBar barStyle="light-content" />
      <FlatList
        ref={flatListRef}
        data={pagesData}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        onMomentumScrollEnd={(ev) => {
          const newIndex = Math.round(ev.nativeEvent.contentOffset.x / width);
          console.log(newIndex);
          setCurrentIndex(newIndex);
        }}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        renderItem={({ item, index }) => (
          <Slides
            backgroundColor={item.backgroundColor}
            image={item.image}
            title={item.title}
            subtitle={item.subtitle}
            currentIndex={index}
            scrollX={scrollX}
          />
        )}
      />

      <View className="flex-row items-center justify-evenly w-full mb-[30px]">
        <Pressable
          onPress={handleSkip}
          className="bg-transparent px-[40px] py-[16px] rounded-[40px] items-center justify-center"
        >
          <Text className="text-[14px] text-[#4169E1] font-bold">Skip</Text>
        </Pressable>
        <Pressable
          onPress={handleNext}
          className="bg-[#4169E1] px-[40px] py-[16px] rounded-[40px] items-center justify-center"
        >
          <Text className="text-[14px] font-bold text-white">
            {currentIndex === 2 ? "Create Account" : "Next"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default OnboardingPage;
