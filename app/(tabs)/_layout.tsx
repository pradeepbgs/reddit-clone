import { Redirect, Tabs } from "expo-router";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
    const { isLoaded, isSignedIn, signOut } = useAuth()
    if (!isLoaded) return null

    if (!isSignedIn) {
        return <Redirect href={'/sign-in'} />
    }

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'black',
                headerShown: false,
                headerRight: () => (
                    <Feather
                        name="log-out"
                        size={20}
                        color={'red'}
                        className="mr-3"
                        onPress={() => signOut()}
                    />
                ),
            }}
        >
            <StatusBar style="dark" />
            <Tabs.Screen
                name="index"
                options={{
                    headerShown:true,
                    headerTitle: 'Reddit',
                    title: 'Home',
                    headerTintColor: "#FF5700",
                    tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="communities"
                options={{
                    title: 'Communities',
                    tabBarIcon: ({ color }) => <Feather name="users" size={24} color={color} />
                }}
            />
            <Tabs.Screen
                name="create"
                options={{
                    title: 'Create',
                    tabBarIcon: ({ color }) => <AntDesign name="plus" size={24} color={color} />,
                    headerShown: false,
                    tabBarStyle: { display: 'none' },
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    title: 'Chat',
                    tabBarIcon: ({ color }) => <Ionicons name="chatbubble-ellipses-outline" size={24} color={color} />
                }}
            />
            <Tabs.Screen
                name="inbox"
                options={{
                    title: 'Inbox',
                    tabBarIcon: ({ color }) => <Feather name="bell" size={24} color={color} />
                }}
            />
        </Tabs>
    )
}