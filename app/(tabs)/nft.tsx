import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Profiles,
  Feed,
  Publication,
} from "@lens-protocol/react-native-lens-ui-kit";
import {
  PublicationMetadataDisplayTypes,
  PublicationSortCriteria,
  PublicationTypes,
  PublicationMetadataFilters,
} from "@lens-protocol/react-native-lens-ui-kit/dist/graphql/generated";
import { lensClient } from "../../constants/LensApi";
import { router } from "expo-router";

const nft = () => {
  // useEffect(() => {
  //   const getFeeds = async() => {
  //     const result = await lensClient.feed.fetch({
  //       where: {
  //         for: "PROFILE_ID",
  //       },
  //     });
  //   }
  // })
  return (
    <View className="">
      <Profiles
        onProfilePress={(profile) => router.push(`/artist/${profile.handle}`)}
      />
      {/* <Feed
        publicationsQuery={{
          name: "explorePublications",
          publicationTypes: [
            PublicationTypes.Post,
            // PublicationTypes.Comment,
            // PublicationTypes.Mirror,
          ],
          publicationSortCriteria: PublicationSortCriteria.Latest,
          limit: 20,     
        }}
        
      /> */}
    </View>
  );
};

export default nft;
