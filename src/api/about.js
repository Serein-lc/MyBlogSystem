import request from "./request";


export async function getAbout() {
    return await request("/api/about")
}