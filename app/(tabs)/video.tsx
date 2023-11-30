import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native"
import React from "react"
import IconSearch from "../../components/IconComponents/IconSearch"
import IconArrowForward from "../../components/IconComponents/IconArrowForward"
import IconVerticalDots from "../../components/IconComponents/IconVerticalDots"
import IconDot from "../../components/IconComponents/IconDot"
import ImageBoxWithOverlay from "../../components/ImageBoxWithOverlay"
import LinearGradient from "react-native-linear-gradient"

const video = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.searchContainer}>
        <Text style={styles.searchIconContainer}>
          <IconSearch />
        </Text>
        <TextInput placeholder="Search videos" style={styles.input} />
      </View>
      <View style={styles.viewMoreContainer}>
        <Text style={styles.video}>Video</Text>
        <TouchableOpacity style={styles.viewMoreContainerFlex}>
          <Text style={styles.viewMore}>More</Text>
          <IconArrowForward />
        </TouchableOpacity>
      </View>
      {[1, 2].map((value, index) => {
        return (
          <View key={index} style={styles.box}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: "https://res.cloudinary.com/rashot/image/upload/v1701347221/image_38_val7lf.jpg",
                }}
                style={styles.previewImage}
              />
            </View>
            <View style={styles.grandParent}>
              <View style={styles.titleContainer}>
                <Image
                  source={{
                    uri: "https://res.cloudinary.com/rashot/image/upload/v1701351537/image_31_dst2pw.png",
                  }}
                  style={styles.profileImage}
                />
                <View>
                  <Text style={styles.videoTitle}>
                    I Told Them - Official Music Video
                  </Text>
                  <View style={styles.subTitleContainer}>
                    <Text style={styles.subTitle}>Burna Boy</Text>
                    <View style={styles.subTitleContainerChild}>
                      <IconDot />
                      <Text style={styles.subTitle}>44K views</Text>
                    </View>
                    <View style={styles.subTitleContainerChild}>
                      <IconDot />
                      <Text style={styles.subTitle}>4 months ago</Text>
                    </View>
                  </View>
                </View>
              </View>
              <TouchableOpacity>
                <IconVerticalDots />
              </TouchableOpacity>
            </View>
          </View>
        )
      })}
      <View style={styles.viewMoreContainer}>
        <Text style={styles.video}>Shorts</Text>
        <TouchableOpacity style={styles.viewMoreContainerFlex}>
          <Text style={styles.viewMore}>More</Text>
          <IconArrowForward />
        </TouchableOpacity>
      </View>
      <View style={styles.videocardContainer}>
        <View style={styles.imageContainerSmall}>
          <Image
            source={{
              uri: "https://res.cloudinary.com/rashot/image/upload/v1701365802/image_38_cl1eig.png",
            }}
            style={styles.overlayImage}
          />
          <View style={styles.titleContainerTwo}>
            <Image
              source={{
                uri: "https://res.cloudinary.com/rashot/image/upload/v1701351537/image_31_dst2pw.png",
              }}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.videoTitleTwo}>
                I Told Them - Official Music Video
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.imageContainerSmall}>
          <Image
            source={{
              uri: "https://res.cloudinary.com/rashot/image/upload/v1701365802/image_38_cl1eig.png",
            }}
            style={styles.overlayImage}
          />{" "}
          <View style={styles.titleContainerTwo}>
            <Image
              source={{
                uri: "https://res.cloudinary.com/rashot/image/upload/v1701351537/image_31_dst2pw.png",
              }}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.videoTitleTwo}>
                I Told Them - Official Music Video
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default video

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    paddingVertical: 5,
    position: "relative",
  },

  searchIconContainer: {
    position: "absolute",
    left: 25,
    top: 18,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: "400",
    height: 48,
    outline: "none",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 80,
    color: "#fff",
    paddingLeft: 60,
    backgroundColor: "#001F3F",
  },
  viewMoreContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
  },
  video: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  viewMore: {
    color: "white",
    fontWeight: "700",
    fontSize: 12,
  },
  viewMoreContainerFlex: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    columnGap: 5,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 16,
  },
  previewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  profileImage: {
    width: 40,
    height: 40,
  },
  videoTitle: {
    fontWeight: "700",
    fontSize: 16,
    color: "white",
  },
  videoTitleTwo: {
    fontWeight: "600",
    fontSize: 12,
    color: "white",
  },
  grandParent: {
    marginTop: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 16,
  },
  titleContainerTwo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    columnGap: 16,
    position: "absolute",
    left: 16,
    bottom: 16,
  },
  subTitleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
    marginTop: 4,
  },
  subTitleContainerChild: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 2,
  },
  subTitle: {
    fontSize: 12,
    color: "#979797",
    fontWeight: "400",
  },
  box: {
    marginTop: 20,
  },
  videocardContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    marginTop: 20,
  },
  overlayImage: {
    height: 200,
    width: 164,
    borderRadius: 8,
  },
  imageContainerSmall: {
    borderRadius: 8,
    position: "relative",
    overflow: "hidden",
  },
})
