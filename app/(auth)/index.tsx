import { View, Text, StatusBar } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SignUp from "../../components/AuthSteps/SignUp";
import Login from "../../components/AuthSteps/Login";

const index = () => {
  const [currentScreen, setCurrentScreen] = useState(0);

  const goToNextScreen = () => {
    setCurrentScreen(currentScreen + 1);
  };

  const goToPreviousScreen = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const handleScreeChange = () => {
    switch (currentScreen) {
      case 0:
        return <SignUp setCurrentScreen={setCurrentScreen} />;
      case 1:
        return <Login setCurrentScreen={setCurrentScreen} />;
      default:
        break;
    }
  };
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" />
      <Text className="text-center mt-[33.93px] text-[24px] font-bold text-[#fff]">
        Filmedia
      </Text>

      <View>{handleScreeChange()}</View>
    </SafeAreaView>
  );
};

export default index;
