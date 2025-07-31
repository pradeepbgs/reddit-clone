import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import { formatDistanceToNowStrict } from 'date-fns';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from "expo-router";
import React from "react";
import { useSupabase } from "@/lib/supabase";
import { useFetchPostUpvotes, useUpvote } from "@/services/api";

interface Post {
    id: string;
    title: string;
    created_at: string;
    upvotes: { count: number }[] | number;
    nr_of_comments: number;
    description: string;
    image: string;
    group: {
        id: string;
        name: string;
        image: string;
    };
    user?: {
        name: string;
    };
}

function PostListItem({ post, isDetailedPost }: { post: Post, isDetailedPost?: boolean }) {
    const supabase = useSupabase();
    const { mutate: handleUpvote, isPending: isUpvoting } = useUpvote(post.id, supabase);

    const { data:upvoteCount } = useFetchPostUpvotes(post.id, supabase)

    return (
        <Pressable
            onPress={() => !isDetailedPost && router.push(`/post/${post.id}`)}
            className="px-4 py-4 border-b border-gray-300 bg-white"
        >
            {/* Header */}
            <View className="flex-row justify-between items-center mb-3">
                <View className="flex-row items-center gap-2">
                    <Image source={{ uri: post.group.image }} className="h-10 w-10 rounded-full" />
                    <View>
                        <Text className="font-semibold text-base">{post.group.name}</Text>
                        {isDetailedPost && post.user?.name && (
                            <Text className="text-sm text-gray-600">{post.user.name}</Text>
                        )}
                        <Text className="text-xs text-gray-400">
                            {formatDistanceToNowStrict(new Date(post.created_at))} ago
                        </Text>
                    </View>
                </View>
                <TouchableOpacity className="bg-blue-600 px-3 py-1 rounded-full">
                    <Text className="text-white text-sm font-medium">Join</Text>
                </TouchableOpacity>
            </View>

            {/* Title */}
            <Text className="text-xl font-bold mb-2">{post.title}</Text>

            {/* Image */}
            {post.image && (
                <Image
                    source={{ uri: post.image }}
                    className="h-60 w-full rounded-2xl mb-3"
                    resizeMode="cover"
                />
            )}

            {/* Description */}
            {isDetailedPost && post.description && (
                <Text className="text-gray-700 text-base mb-3">
                    {post.description}
                </Text>
            )}

            {/* Footer Actions */}
            <View className="flex-row justify-between items-center">
                {/* Upvote / Comment */}
                <View className="flex-row gap-3">
                    {/* Upvote button */}
                    <Pressable
                        onPress={() => !isUpvoting && handleUpvote()}
                        className="flex-row items-center gap-1 px-3 py-1 rounded-full border border-gray-300"
                    >
                        <MaterialCommunityIcons
                            name="arrow-up-bold-outline"
                            size={20}
                            color={isUpvoting ? "gray" : "black"}
                        />
                        <Text className="text-sm font-medium">{upvoteCount}</Text>
                    </Pressable>

                    {/* Comment */}
                    <View className="flex-row items-center gap-1 px-3 py-1 rounded-full border border-gray-300">
                        <MaterialCommunityIcons name="comment-outline" size={20} />
                        <Text className="text-sm font-medium">{post.nr_of_comments}</Text>
                    </View>
                </View>

                {/* Trophy and Share */}
                <View className="flex-row gap-4">
                    <MaterialCommunityIcons name="trophy-outline" size={20} />
                    <MaterialCommunityIcons name="share-outline" size={20} />
                </View>
            </View>
        </Pressable>
    );
}

export default React.memo(PostListItem);
