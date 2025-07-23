import { supabase } from "@/lib/supabase";
import { useMutation, useQuery } from "@tanstack/react-query";

const fetchPost = async () => {
    try {
        const { data, error } = await supabase
            .from('posts')
            .select('*, group:groups(*), user:users!posts_user_id_fkey(*)')
            .order('created_at', { ascending: false })
            .limit(10)

        if (error) {
            throw error
        }
        return data
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}

export function useFetchPost() {
    return useQuery({
        queryKey: ['posts'],
        queryFn: fetchPost
    })
}