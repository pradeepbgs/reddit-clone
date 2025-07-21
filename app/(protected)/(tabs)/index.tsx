import { FlatList, SafeAreaView } from "react-native";
import posts from '../../../assets/data/posts.json'
import PostListItem from "@/components/PostListItem";
import { StatusBar } from "expo-status-bar";


export default function HomeScreen() {

  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostListItem post={item} />}
      />
    </SafeAreaView>
  );
}
