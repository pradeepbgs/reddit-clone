import { SupabaseClient } from "@supabase/supabase-js";

export const uploadImage = async (
    localUri: string,
    supabase: SupabaseClient
) => {
    const fileRes = await fetch(localUri);
    const arrayBuffer = await fileRes.arrayBuffer();

    const fileExt = localUri.split(".").pop()?.toLowerCase() ?? "jpeg";
    const path = `${Date.now()}.${fileExt}`;

    const { error, data } = await supabase.storage
        .from("images")
        .upload(path, arrayBuffer);

    if (error) {
        throw error;
    } else {
        return data.path;
    }
};


export const getPublicImageUrl = async (
    path: string,
    supabase: SupabaseClient
): Promise<string> => {
    try {
        // console.log("Requested image path:", path);

        const { data, error } = await supabase
            .storage
            .from("images")
            .createSignedUrl(path, 60 * 60); // valid for 1 hour

        if (error) {
            // console.error("Failed to generate signed URL:", error);
            return '';
        }

        // console.log("Generated signed URL:", data?.signedUrl);
        return data?.signedUrl ?? '';
    } catch (err) {
        console.error("Unexpected error in getPublicImageUrl:", err);
        return '';
    }
};




// Function to download image from Supabase
export const downloadImage = async (
    image: string,
    supabase: SupabaseClient
) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { error, data } = await supabase.storage
                .from("images")  // Access the "images" storage bucket
                .download(image); // Download the file using its path

            if (error) {
                return reject(error); // If there's an error, reject the Promise
            }

            const fr = new FileReader(); // Create a FileReader instance
            fr.readAsDataURL(data); // Convert the fetched binary data to a Data URL
            fr.onload = () => {
                resolve(fr.result as string); // Once loaded, resolve the Promise with the Data URL
            };
        } catch (error) {
            reject(error); // Handle unexpected errors
        }
    });
};