import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { InputField } from "../FormField";

type Props = {
  setCurrentScreen: React.Dispatch<React.SetStateAction<number>>;
};

const SignUp = ({ setCurrentScreen }: Props) => {
  const [name, setName] = useState("");
  return (
    <View className="items-center mt-[87px] space-y-[24px]">
      <View className="items-center space-y-[16px]">
        <Text className="text-[24px] font-bold text-[#fff]">
          Set up your account
        </Text>
        <Text className="text-[14px] font-semibold text-[#fff] text-center">
          Create your account and dive into a world of Blockchain.
        </Text>
      </View>

      {/** form section */}
      <View className="">
        <InputField
          label="Name"
          value={name}
          placeholder="John Doe"
          onChange={setName}
        />
        <InputField
          label="E-mail"
          value={name}
          placeholder="example@gmail.com"
          onChange={setName}
        />
        <InputField
          label="Password"
          value={name}
          placeholder="*********"
          onChange={setName}
        />
        <InputField
          label="Confirm Password"
          value={name}
          placeholder="*********"
          onChange={setName}
        />
      </View>

      <View className="space-y-[8px]">
        <TouchableOpacity className="py-[16px] px-[40px] items-center bg-[#4169E1] rounded-[40px]">
          <Text className="text-[14px] font-bold text-[#fff]">
            Create Account
          </Text>
        </TouchableOpacity>
        <Text className="text-[14px] text-[#fff] font-bold text-center">
          Already signed up?{" "}
          <Text onPress={() => setCurrentScreen(1)} className="text-[#4169E1]">
            Log In
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default SignUp;
