
import { FlatList, Text, KeyboardAvoidingView, Platform, Pressable, View, TextInput, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { useSetAtom } from "jotai";
import { selectedGroupAtom } from "./atoms";
import { useDebounced, useFetchGroups } from "@/services/api";

export default function GroupSelector() {
    const [search, setSearch] = useState('')
    const debouncedSearch = useDebounced(search, 300);

    const [refreshing, setRefreshing] = useState(false);

    const setGroup = useSetAtom(selectedGroupAtom)

    const { data: groups, isLoading, isError, error, refetch } = useFetchGroups(debouncedSearch)

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size={25} />
            </View>
        )
    }

    if (isError) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-red-500 px-5">{error?.message ?? "Something went wrong"}</Text>
            </View>
        )
    }

    const onGroupSelected = (group: any) => {
        setGroup(group);
        router.back()
    }


    const handleRefresh = async () => {
        try {
            setRefreshing(true);
            await refetch();
        } finally {
            setRefreshing(false);
        }
    };


    return (
        <SafeAreaView className="px-2">
            <StatusBar style="dark" />
            <View className="flex-row items-center justify-between px-1 mt-4">
                <AntDesign
                    name="close"
                    size={26} 
                    onPress={() => router.back()}
                    />
                <Pressable className="flex-1 mx-4">
                    <Text className="text-black text-center font-bold py-1 px-2 rounded-full">Post to</Text>
                </Pressable>
                <View style={{ width: 26 }} />
            </View>

            <KeyboardAvoidingView
                className="flex-row items-center mt-3 gap-2 px-3 "
                style={{ backgroundColor: 'lightgrey' }}
            >
                <AntDesign name="search1" size={20} />
                <TextInput
                    placeholder="Search"
                    className="text-1xl font-bold py-3 flex-1"
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                />
            </KeyboardAvoidingView>

            <FlatList
                data={groups}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                renderItem={({ item }) => (
                    <>
                        <Pressable
                            className="flex-row items-center px-1 mt-4"
                            onPress={() => onGroupSelected(item)}
                        >
                            <Image
                                source={{ uri: item.image }}
                                className="w-10 h-10 rounded-full"
                            />
                            <Text className="font-bold py-1 px-2 rounded-full">{item.name}</Text>
                        </Pressable>
                    </>
                )}
            />
        </SafeAreaView>
    )
}              