import { STRAPI_API_KEY, STRAPI_API_URL } from "@/config";

export async function getBlogContent () {
    const res = await fetch(`${STRAPI_API_URL}/api/blogs`, {
        headers: {
            Authorization: `Bearer ${STRAPI_API_KEY}`,
        },
    });
    if (!res.ok) {
        throw new Error("Failed to fetch blogs");
    }
    const { data } = await res.json();
    return data;
}
