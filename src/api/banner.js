import request from "./request";

export async function getBanners() {
    //得到数据
    return await request.get("/api/banner");
}