import {
  View,
  Text,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import PostListItem from "@/components/PostListItem";
import CommentListItem from "@/components/CommentListItem";
import posts from "../../assets/data/posts.json";
import comments from "../../assets/data/comments.json";
import { useState, useRef, useMemo, useCallback } from "react";
import { useDeletePostById, useFetchPostById } from "@/services/api";
import { useSupabase } from "@/lib/supabase";

export default function PostScreen() {
  const { id } = useLocalSearchParams();
  const [comment, setComment] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const inputRef = useRef<TextInput>(null);

  const supabase = useSupabase()

  // const detailedPost = useMemo(() => posts.find((post) => post.id === id), [id]);
  const postComments = useMemo(() => comments.filter((comment) => comment.post_id === id), [id])

  const { data: post, isLoading, isError, error } = useFetchPostById(id as string, supabase)
  const { mutate: deletePost } = useDeletePostById(id as string, supabase)

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={25} />
      </View>
    )
  }


  // if (error) {
  //   return (
  //     <View className="flex-1 justify-center items-center">
  //       <Text className="text-red-500 px-5">{error?.message ?? "Something went wrong"}</Text>
  //     </View>
  //   )
  // }

  // if (!detailedPost) return <Text>Post not found</Text>;

  // const handleReplyButtonPress = useCallback((commentId: string) => {
  //   setReplyToId(commentId);
  //   inputRef.current?.focus();
  // }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <Stack.Screen
          options={{
            animation: "slide_from_bottom",
            headerRight: () => (
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Entypo
                  onPress={() => deletePost()}
                  name="trash" size={24} color="white" /> 
                <AntDesign name="search1" size={24} color="white" />
                <MaterialIcons name="sort" size={27} color="white" />
                <Entypo name="dots-three-horizontal" size={24} color="white" />
              </View>
            ),
          }}
        />

        <FlatList
          keyExtractor={(item) => item.id}
          data={postComments}
          ListHeaderComponent={<PostListItem post={post} isDetailedPost />}
          renderItem={({ item }) => (
            <CommentListItem
              comment={item}
              depth={0}
            // handleReplyPress={handleReplyButtonPress}
            />
          )}
          contentContainerStyle={{ paddingBottom: 90 }}
        />

        {/* Input Footer */}
        <View className="flex-row items-end mb-6 gap-2 px-3 ">
          <TextInput
            ref={inputRef}
            placeholder={replyToId ? "Reply to comment..." : "Join the conversation"}
            value={comment}
            onChangeText={setComment}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            multiline
            className="flex-1 bg-gray-200 px-3  rounded text-sm "
          />
          {isInputFocused && <Pressable
            className="bg-blue-800 rounded-2xl px-4 py-2"
            onPress={() => {
              // handle post
            }}
          >
            <Text className="text-white font-bold text-xs">Reply</Text>
          </Pressable>}
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "white",
    padding: 10,
    borderTopColor: "lightgray",
    borderTopWidth: 1,
  },
  textInput: {
    backgroundColor: "#E4E4E4",
    padding: 10,
    borderRadius: 5,
    fontSize: 14,
    minHeight: 40,
  },
  replyButton: {
    backgroundColor: "#0d469b",
    borderRadius: 15,
    alignSelf: "flex-end",
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  replyButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 13,
  },
});
