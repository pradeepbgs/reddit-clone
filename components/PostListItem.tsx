import { View, Text, Image, TouchableOpacity, SafeAreaView } from "react-native";
import { formatDistanceToNowStrict } from 'date-fns';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface PostListItemProps {
    post: {
        id: string;
        title: string;
        created_at: string;
        upvotes: number;
        nr_of_comments: number;
        description: string;
        image: string;
        group: {
            id: string;
            name: string;
            image: string;
        };
        user: {
            id: string;
            name: string;
            image: string;
        };
    };
}

export default function PostListItem({ post }: PostListItemProps) {
    return (
        <SafeAreaView className="px-4 py-3 border-b border-gray-200">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-2">
                <View className="flex-row items-center space-x-2 gap-1">
                    <Image source={{ uri: post.group.image }} className="h-10 w-10 rounded-full" />
                    <View>
                        <Text className="font-semibold">{post.group.name}</Text>
                        {/* <Text className="text-sm">{post.user.name}</Text> */}
                        <Text className="text-xs text-gray-500">
                            {formatDistanceToNowStrict(new Date(post.created_at))} ago
                        </Text>
                    </View>
                </View>

                <TouchableOpacity className="bg-blue-700 px-3 py-1 rounded-full">
                    <Text className="text-white text-sm font-medium">Join</Text>
                </TouchableOpacity>
            </View>

            {/* Title */}
            <Text className="font-bold text-lg mb-2">{post.title}</Text>

            {/* Image or Description */}
            {post.image ? (
                <Image
                    source={{ uri: post.image }}
                    className="h-72 w-full rounded-2xl mb-2"
                    resizeMode="cover"
                />
            ) : (
                post.description && (
                    <Text numberOfLines={3} className="text-gray-700 mb-2">
                        {post.description}
                    </Text>
                )
            )}

            {/* Footer */}
            <View className="flex-row justify-between items-center mt-2">
                {/* Upvotes and Comments */}
                <View className="flex-row space-x-3">
                    <View className="flex-row items-center border border-gray-300 rounded-full px-2 py-1 space-x-1">
                        <MaterialCommunityIcons name="arrow-up-bold-outline" size={18} />
                        <Text className="text-sm">{post.upvotes}</Text>
                        <MaterialCommunityIcons name="arrow-down-bold-outline" size={18} />
                    </View>

                    <View className="flex-row items-center border border-gray-300 rounded-full px-3 py-1 space-x-1">
                        <MaterialCommunityIcons name="comment-outline" size={18} />
                        <Text className="text-sm">{post.nr_of_comments}</Text>
                    </View>
                </View>

                {/* Trophy and Share */}
                <View className="flex-row space-x-3 gap-2">
                    <MaterialCommunityIcons name="trophy-outline" size={20} />
                    <MaterialCommunityIcons name="share-outline" size={20} />
                </View>
            </View>
        </SafeAreaView>
    );
}
