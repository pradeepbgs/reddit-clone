import { ActivityIndicator, FlatList, Text, View } from "react-native";
import posts from '../../assets/data/posts.json'
import PostListItem from "@/components/PostListItem";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFetchPost } from "@/services/api";

// type Post = Table

export default function HomeScreen() {
  const { data, isLoading, isError, error } = useFetchPost();
  // console.log(data)

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={25} />
      </View>
    )
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 px-5">{error?.message ?? "Something went wrong"}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView className="flex-1">

      <StatusBar style="dark" />
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostListItem post={item} />}
      />
    </SafeAreaView>
  );
}
