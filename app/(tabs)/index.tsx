import { ActivityIndicator, FlatList, SafeAreaView, Text, View } from "react-native";
import PostListItem from "@/components/PostListItem";
import { StatusBar } from "expo-status-bar";
import { useFetchPost } from "@/services/api";
import { useSupabase } from "@/lib/supabase";

// type Post = Table

export default function HomeScreen() {
  const supabase = useSupabase()

  const { data: posts, isLoading, error, isRefetching, refetch } = useFetchPost(supabase);
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
    <SafeAreaView
      style={{ flex: 1 }}
    // edges={['top']}
    >

      <StatusBar style="dark" />
      <FlatList
        data={posts}
        refreshing={isRefetching}
        onRefresh={refetch}
        renderItem={({ item }) => <PostListItem post={item} />}
      />
    </SafeAreaView>
  );
}
