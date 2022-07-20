import request from "./request";


export async function getMessages(page = 1, limit = 10) {
    return await request("/api/message", {
        params: {
            page,
            limit,
        },
    })
}

// 提交留言
export async function postMessage(msgInfo) {
    return await request.post("/api/message", msgInfo)
}