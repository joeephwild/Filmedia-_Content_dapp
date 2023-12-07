import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const PaymentProcessing = () => {
  return (
    <View className="relative">
      <View className="bg-[#4169E1] w-[40px] mb-96 h-[40px] rounded-full absolute -top-9  right-[130px] p-[10px] items-center justify-center">
        <ActivityIndicator size="large" />
      </View>

      <View className="mt-[16px] items-center ">
        <Text className="text-[14px] font-bod text-[#4169E1]">
          Payment Processing
        </Text>
        <Text className="text-center text-[10px] text-[#010101] font-bold pt-3">
          To complete the process, please approve the transaction and sign from
          wallet. Thank you for your patience!
        </Text>

        <View className="bg-[#B3C3F3] px-[10px] py-[4px] mt-6 rounded-[40px]">
          <Text>5.00 USDT</Text>
        </View>

        <View className="mt-[16px] space-y-[16px]">
          <View className="bg-[#4169E1] px-[24px] py-[8px]  rounded-[40px]">
            <Text className="text-[12px] font-bold text-[#fff]">
              Approve transaction
            </Text>
          </View>
          <View className="bg-[#B3C3F3] px-[24px] py-[8px] items-center  rounded-[40px]">
            <Text>Cancel</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PaymentProcessing;
