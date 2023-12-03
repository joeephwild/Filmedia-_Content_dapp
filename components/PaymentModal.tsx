import React, { useState } from "react";
import { Modal, Text, TouchableHighlight, View, Alert } from "react-native";
import SelectOption from "./PaymentSteps/SelectOption";

type Props = {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalVisible: boolean;
};

const PaymentModal = ({ modalVisible, setModalVisible }: Props) => {
  return (
    <View style={{ marginTop: 22 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
        style={{}}
      >
        <View
          style={{
            marginTop: 200,
            backgroundColor: "white",
            padding: 20,
            shadowColor: "#000",
            width: 345,
            marginHorizontal: 20,
            height: "auto",
            borderRadius: 16,
          }}
        >
          <SelectOption
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </View>
      </Modal>
    </View>
  );
};

export default PaymentModal;
