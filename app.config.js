import 'dotenv/config';

export default {
    expo: {
        name: 'cleddit',
        slug: 'cleddit-app',
        version: '1.0.0',
        android: {
            package: 'com.exvillager.cleddit',
        },
        extra: {
            clerkKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
            supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
            supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
            jwtSecret: process.env.JWT_SECRET,
            eas: {
                projectId: "fbe6a2c4-bbf4-4ffd-bb53-eb11c37e0d0b",
            }
        },
    },
};
