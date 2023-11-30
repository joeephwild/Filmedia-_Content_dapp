import React from "react"
import {View, Image, StyleSheet} from "react-native"
import LinearGradient from "react-native-linear-gradient"

const ImageBoxWithOverlay = ({imageUrl}: {imageUrl: string}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: imageUrl}} style={styles.image} />
      <LinearGradient
        colors={["rgba(1, 1, 1, 0.00)", "#010101"]}
        style={styles.overlay}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 150,
    borderRadius: 8,
    overflow: "hidden",
    margin: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
})

export default ImageBoxWithOverlay
