import { Stack } from "expo-router";
import './global.css'
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";

const queryClient = new QueryClient()

export default function RootLayout() {
  useReactQueryDevTools(queryClient);


  return <ClerkProvider tokenCache={tokenCache}>
    <QueryClientProvider client={queryClient}>

      <Stack screenOptions={{ headerShown: false, animation: 'ios_from_right' }} />
    </QueryClientProvider>
  </ClerkProvider>
}
