import { View, Text, ImageBackground } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import SubscriptionHeatmap from "../../components/profile/SubscriptionHeatmap";
import LatestRelease from "../../components/profile/LatestRelease";
import TopSongs from "../../components/profile/TopSongs";
import Albums from "../../components/profile/Albums";
import { SafeAreaView } from "react-native-safe-area-context";
import PaymentModal from "../../components/PaymentModal";

const ArtistProfile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <ScrollView
      style={{ flex: 1, minHeight: "100%", marginBottom: 789 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 760, // Adjust padding as needed
      }}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={{
          uri: "https://images.pexels.com/photos/19230155/pexels-photo-19230155/free-photo-of-a-little-boy-with-curly-hair-standing-outside.jpeg?auto=compress&cs=tinysrgb&w=300",
        }}
        className="h-[296px] object-cover"
        imageStyle={{ resizeMode: "cover" }}
      >
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.01)", "#001F3F"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 180,
          }}
        />
      </ImageBackground>
      <View style={{ position: "absolute", top: 135, right: 0, left: 0 }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 40, fontWeight: "bold", color: "#fff" }}>
            Davido
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#A8A8A8" }}>
            Subscribers 3.7M
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            marginTop: 29,
            paddingHorizontal: 24,
            backgroundColor: "#4169E1",
            paddingVertical: 8,
            alignItems: "center",
            justifyContent: "center",
            width: "40%",
            borderRadius: 40,
          }}
          className="mx-auto"
        >
          <Text style={{ fontSize: 12, fontWeight: "bold", color: "#fff" }}>
            Subscribe for $5
          </Text>
        </TouchableOpacity>

        <View style={{ paddingTop: 9 }}>
          <SubscriptionHeatmap />
          <LatestRelease />
          <TopSongs />
          <Albums />
        </View>
      </View>
      <PaymentModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </ScrollView>
  );
};

export default ArtistProfile;
