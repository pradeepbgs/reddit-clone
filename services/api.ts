import { supabase } from "@/lib/supabase";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export function useDebounced<T>(value: T, delay: number = 300): T {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debounced;
}


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
        queryFn: fetchPost,
        staleTime: 10000
    })
}

const fetchPostById = async (id: string) => {
    try {
        const { data, error } = await supabase
            .from('posts')
            .select('*, group:groups(*), user:users!posts_user_id_fkey(*)')
            .eq('id', id)
            .single()

        if (error) {
            throw error
        }
        return data
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error;
    }
}

export function useFetchPostById(id: string) {
    return useQuery({
        queryKey: ['post', id],
        queryFn: () => fetchPostById(id),
        staleTime: 10000
    })
}

const fetchGroups = async (query?: string) => {
    try {
        const { data, error } = await supabase
            .from('groups')
            .select('*')
            .ilike('name', `%${query ?? ''}%`)
            // .limit(10)
            .order('name', { ascending: true })

        if (error) {
            throw error
        }
        return data
    } catch (error) {
        console.error('Error fetching groups:', error);
        throw error;
    }
}
export function useFetchGroups(query?: string) {
    return useQuery({
        queryKey: ['groups', { query }],
        queryFn: () => fetchGroups(query),
        staleTime: 10000,
        placeholderData: (prevData) => prevData
    })
}


const createPost = async (postData: any) => {
    try {
        const { data, error } = await supabase
            .from('posts')
            .insert(postData)
            .select()
            .single()

        if (error) {
            throw error
        }
        return data
    } catch (error) {
        console.error('Error posting:', error);
        throw error;
    }
}

export function usePost() {
    return useMutation({
        mutationKey: ['post'],
        mutationFn: (postData: any) => createPost(postData)
    });
}
