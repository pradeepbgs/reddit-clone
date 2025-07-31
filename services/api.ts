import { useSupabase } from "@/lib/supabase";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { goBack } from "expo-router/build/global-state/routing";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

export function useDebounced<T>(value: T, delay: number = 300): T {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debounced;
}

const fetchPost = async (supabase: any) => {
    try {
        const { data, error } = await supabase
            .from("posts")
            .select("*, group:groups(*)")
            .order("created_at", { ascending: false })
            .limit(10);

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
};

export function useFetchPost(supabase: any) {
    return useQuery({
        queryKey: ["posts"],
        queryFn: () => fetchPost(supabase),
        staleTime: 10000,
    });
}

const fetchPostById = async (id: string, supabase: any) => {
    try {
        const { data, error } = await supabase
            .from("posts")
            .select("*, group:groups(*)")
            .eq("id", id)
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error fetching post:", error);
        throw error;
    }
};

export function useFetchPostById(id: string, supabase: any) {
    return useQuery({
        queryKey: ["post", id],
        queryFn: () => fetchPostById(id, supabase),
        staleTime: 10000,
    });
}

const fetchGroups = async (query: string | undefined, supabase: any) => {
    try {
        const { data, error } = await supabase
            .from("groups")
            .select("*")
            .ilike("name", `%${query ?? ""}%`)
            .order("name", { ascending: true });

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error fetching groups:", error);
        throw error;
    }
};

export function useFetchGroups(query?: string, supabase?: any) {
    return useQuery({
        queryKey: ["groups", { query }],
        queryFn: () => fetchGroups(query, supabase),
        staleTime: 10000,
        placeholderData: (prevData) => prevData,
    });
}

const createPost = async (postData: any, supabase: any) => {
    try {
        const { data, error } = await supabase
            .from("posts")
            .insert(postData)
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error posting:", error);
        throw error;
    }
};

export function usePost() {
    return useMutation({
        mutationKey: ["post"],
        mutationFn: ({ postData, supabase }: { postData: any; supabase: any }) =>
            createPost(postData, supabase),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            goBack();
        },
    });
}


const deletePostById = async (id: string, supabase: any) => {
    try {
        const { error } = await supabase.from("posts").delete().eq("id", id);

        if (error) throw error;
    } catch (error) {
        console.error("Error deleting post:", error);
        throw error;
    }
 
}
export function useDeletePostById(id: string, supabase: any) {
    return useMutation({
        mutationKey: ["deletePost", id],
        mutationFn: () => deletePostById(id, supabase),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            goBack();
        },
    });
}