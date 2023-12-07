import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { InputField } from "../FormField";

const Login = () => {
  const [name, setName] = useState("");
  return (
    <View className="items-center mt-[87px] space-y-[24px]">
      <View className="items-center space-y-[16px]">
        <Text className="text-[24px] font-bold text-[#fff]">
          Log In to your account
        </Text>
        <Text className="text-[14px] font-semibold text-[#fff] text-center">
          Back to the world of Blockchain.
        </Text>
      </View>

      {/** form section */}
      <View className="">
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
      </View>

      <View className="space-y-[8px] pt-[216px]">
        <TouchableOpacity className="py-[16px] px-[40px] items-center bg-[#4169E1] rounded-[40px]">
          <Text className="text-[14px] font-bold text-[#fff]">
            Create Account
          </Text>
        </TouchableOpacity>
        <Text className="text-[14px] text-[#fff] font-bold text-center">
          Don’t have an account? <Text className="text-[#4169E1]">Sign up</Text>
        </Text>
      </View>
    </View>
  );
};

export default Login;
