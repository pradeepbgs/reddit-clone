import { View, Text, Image, Pressable, FlatList } from "react-native";
import { Entypo, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { formatDistanceToNowStrict } from 'date-fns';
import { useState } from "react";


type CommentListItemProps = {
    comment: Comment;
    depth: number;
    handleReplyPress: (commentId: string) => void;
}

const CommentListItem = ({ comment, depth, handleReplyPress }: CommentListItemProps) => {
    const [showReplies, setShowReplies] = useState<boolean>(false)

    return (
        <View
            style={{
                backgroundColor: "white",
                marginTop: 10,
                paddingHorizontal: 10,
                paddingVertical: 5,
                gap: 10,
                borderLeftColor: "#E5E7EB",
            }}
        >
            {/* User Info */}
            <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                <Image
                    source={{
                        uri: comment.user.image || "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/3.jpg",
                    }}
                    style={{ width: 28, height: 28, borderRadius: 15, marginRight: 4 }}
                />
                <Text style={{ fontWeight: "600", color: "#737373", fontSize: 13 }}>{comment.user.name}</Text>
                <Text style={{ color: "#737373", fontSize: 13 }}>&#x2022;</Text>
                <Text style={{ color: "#737373", fontSize: 13 }}>
                    {formatDistanceToNowStrict(new Date(comment.created_at))}
                </Text>
            </View>

            {/* Comment Content */}
            <Text>{comment.comment}</Text>

            {/* Comment Actions */}
            <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", gap: 14 }}>
                <Entypo name="dots-three-horizontal" size={15} color="#737373" />
                <Octicons name="reply" size={16} color="#737373" onPress={() => console.log('Reply button pressed')} />
                <MaterialCommunityIcons name="trophy-outline" size={16} color="#737373" />
                <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                    <MaterialCommunityIcons name="arrow-up-bold-outline" size={18} color="#737373" />
                    <Text style={{ fontWeight: "500", color: "#737373" }}>{comment.upvotes}</Text>
                    <MaterialCommunityIcons name="arrow-down-bold-outline" size={18} color="#737373" />
                </View>
            </View>

            {/* Show Replies Button */}
            {(comment.replies.length > 0 && !showReplies) && (
                <Pressable
                    onPress={() => setShowReplies(!showReplies)}
                    style={{ backgroundColor: '#EDEDED', borderRadius: 3, paddingVertical: 3, alignItems: 'center' }}>
                    <Text style={{ fontSize: 12, letterSpacing: 0.5, fontWeight: '500', color: '#545454' }}>Show Replies</Text>
                </Pressable>
            )}

            {showReplies && (
                <FlatList
                    data={comment.replies}
                    keyExtractor={(reply) => reply.id}
                    renderItem={({ item }) => <CommentListItem comment={item} depth={depth + 1} handleReplyPress={handleReplyPress} />}
                />
            )}

            {
                showReplies && (
                    <Pressable
                        onPress={() => setShowReplies(!showReplies)}
                        style={{ backgroundColor: '#EDEDED', borderRadius: 3, paddingVertical: 3, alignItems: 'center' }}>
                        <Text style={{ fontSize: 12, letterSpacing: 0.5, fontWeight: '500', color: '#545454' }}>Close</Text>
                    </Pressable>
                )
            }
        </View>

    )
};

export default CommentListItem;