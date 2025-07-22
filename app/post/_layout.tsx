import { Stack } from "expo-router";

export default function PostLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#FF5700', 
        },
        headerTintColor: 'white', 
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitle:'',
        animation: 'none',  
      }}
    />
  );
}
