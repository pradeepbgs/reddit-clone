import { FlatList, SafeAreaView, Text, View } from "react-native";
import posts from '../../assets/data/posts.json'
import PostListItem from "@/components/PostListItem";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen() {
  const post = posts[0];
  return (
    <SafeAreaView>
      <StatusBar style="dark"/>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostListItem post={item} />}
      />
    </SafeAreaView>
  );
}
