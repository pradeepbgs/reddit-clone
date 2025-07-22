import { View, Text, SafeAreaView, KeyboardAvoidingView, FlatList } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import posts from '../../assets/data/posts.json'
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import PostListItem from "@/components/PostListItem";
import comments from '../../assets/data/comments.json'
import CommentListItem from "@/components/CommentListItem";

export default function PostScreen() {
  const { id } = useLocalSearchParams();

  const detailedPost = posts.find(post => post.id === id)
  if (!detailedPost) {
    return <Text>Post not found</Text>
  }

  const postComments = comments.filter((comment) => comment.post_id === id)

  return (
    <KeyboardAvoidingView>
      <Stack.Screen
        options={{
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Entypo
                // onPress={() => remove()}
                name="trash"
                size={24}
                color="white"
              />

              <AntDesign name="search1" size={24} color="white" />
              <MaterialIcons name="sort" size={27} color="white" />
              <Entypo name="dots-three-horizontal" size={24} color="white" />
            </View>
          ),
          animation: "slide_from_bottom",
        }}
      />
      {/* <PostListItem post={detailedPost} isDetailedPost={true} /> */}
      <FlatList
        ListHeaderComponent={
          <PostListItem post={detailedPost} isDetailedPost />
        }
        data={postComments}
        renderItem={({ item }) => <CommentListItem comment={item} depth={0} />}
      />
    </KeyboardAvoidingView>
  );
}
