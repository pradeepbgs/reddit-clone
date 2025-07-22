import { FlatList, Text } from "react-native";
import posts from '../../assets/data/posts.json'
import PostListItem from "@/components/PostListItem";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context';



export default function HomeScreen() {

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
