
import { FlatList, Text, KeyboardAvoidingView, Platform, Pressable, View, TextInput, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import groups from '../assets/data/groups.json'
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { useSetAtom } from "jotai";
import { selectedGroupAtom } from "./atoms";

export default function GroupSelector() {
    const [search, setSearch] = useState('')
    const setGroup = useSetAtom(selectedGroupAtom)


    const filteredGroups = groups
        .filter(group => group.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))

    const onGroupSelected = (group: any) => {
        setGroup(group);
        router.back()
    }

    return (
        <SafeAreaView className="px-2">
            <StatusBar style="dark" />
            <View className="flex-row items-center justify-between px-1 mt-4">
                <AntDesign
                    name="close"
                    size={26} />
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
                data={filteredGroups}
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