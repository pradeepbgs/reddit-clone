import { AntDesign, Feather } from "@expo/vector-icons";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useAtom } from "jotai";
import { useState } from "react";
import { Alert, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { selectedGroupAtom } from "../atoms";
import { usePost } from "@/services/api";
import { useAuth } from "@clerk/clerk-expo";
import { useSupabase } from "@/lib/supabase";
import * as ImagePicker from 'expo-image-picker';
import { uploadImage } from "@/utils/supabaseImages";

export default function CreateScreen() {
  const { userId } = useAuth()
  const [title, setTitle] = useState<any>('')
  const [body, setBody] = useState<any>('')
  const [image, setImage] = useState<string | null>(null);
  const [group, setGroup] = useAtom(selectedGroupAtom)

  const supabase = useSupabase()

  function goBack() {
    setTitle('')
    setBody('')
    setGroup(null)
    setImage(null)
    router.back()
  }

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Please allow access to media library to select an image.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });


    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const { mutateAsync: handlePost, isError, isPending, error } = usePost()

  const handleCreatePost = async () => {
    if (!group) {
      Alert.alert('select a group first')
      return;
    }

    let imageUrl: string | null = null;

    if (image) {
      try {
        imageUrl = await uploadImage(image, supabase);
      } catch (err) {
        console.error("Image upload failed", err);
        Alert.alert("Failed to upload image");
        return;
      }
    }

    await handlePost({
      postData: {
        title,
        group_id: group?.id,
        user_id: userId,
        description: body,
        image:imageUrl
      },
      supabase
    })
    setTitle('');
    setBody('');
    setGroup(null);
    setImage(null);
    router.canGoBack()
  }

  if (isError) {
    Alert.alert("Failed to create post")
  }

  return (
    <SafeAreaView className="flex-1 px-5">
      {/* Header  */}
      <View className="flex-row justify-between px-1 mt-4">
        <AntDesign
          onPress={goBack}
          name="close"
          size={26} />
        <Pressable
          onPress={handleCreatePost}
          disabled={isPending}
        >
          <Text className="bg-[#115BCA] text-white py-1 px-2 rounded-full">
            {
              isPending ? 'Posting...' : 'Post'
            }
          </Text>
        </Pressable>
      </View >

      {/* Community Selector  */}
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView>
          <Link href="/GroupSelector" asChild>
            <Pressable className="flex-row self-start mt-3 bg-[#dbd7d7] rounded-full px-3 py-2 gap-2">
              {
                group ? (
                  <>
                    <Image
                      source={{ uri: group.image }}
                      style={{ width: 25, height: 25, borderRadius: 15 }}
                    />
                    <Text className="font-bold">
                      {group.name}
                    </Text>
                  </>
                )
                  : (
                    <>
                      <Text className="bg-black text-white px-1 rounded-full">/r</Text>
                      <Text className="font-bold">
                        Select a community
                      </Text>
                    </>
                  )}
            </Pressable>
          </Link>


          {/* Inputs  */}
          <TextInput
            placeholder="Title"
            className="text-2xl font-bold py-4"
            multiline
            value={title}
            onChangeText={(text) => setTitle(text)}
          />

          {image && (
            <View style={{ paddingBottom: 20 }}>
              <AntDesign
                name="close"
                size={25}
                color="white"
                onPress={() => setImage(null)}
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  right: 10,
                  top: 10,
                  padding: 5,
                  backgroundColor: '#00000090',
                  borderRadius: 20,
                }}
              />
              <Image source={{ uri: image }} style={{ width: '100%', aspectRatio: 1 }} />
            </View>
          )}

          <TextInput
            placeholder="Body text (optional)"
            className="text-md py-4"
            multiline
            value={body}
            onChangeText={(text) => setBody(text)}
          />
        </ScrollView>
        <View style={{ flexDirection: 'row', gap: 20, padding: 10 }}>
          <Feather name="link" size={20} color="black" />
          <Feather
            onPressIn={() => pickImage()}
            name="image" size={20} color="black" onPress={pickImage} />
          <Feather name="youtube" size={20} color="black" />
          <Feather name="list" size={20} color="black" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
}