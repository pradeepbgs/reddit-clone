import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function AuthRoutesLayout() {
    const { isSignedIn } = useAuth()
    console.log('isSignedIn', isSignedIn)
    if (!isSignedIn) {
        return <Redirect href={'/sign-in'} />
    }

    return <Stack screenOptions={{ headerShown: false }} />
}