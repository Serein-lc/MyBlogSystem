import request from "./request"

/**
 * 获取博客列表数据
 * @param {Number} page 当前页码
 * @param {*} limit 每一页的容量
 * @param {*} categoryid 所属分类  -1 为全部
 */
export async function getBlogs(page = 1, limit = 10, categoryid = -1) {

    return await request.get("/api/blog", {
        // axios传参现在需要这样子，请阅读文档
        params: {
            page,
            limit,
            categoryid
        }
    })

}


/**
 * 获取博客分类
 */
export async function getBlogTypes() {
    return request.get("/api/blogtype")
}

/**
 * 获取单个博客
 * @param {*} id 
 * @returns 
 */
export async function getBlog(id) {
    return await request.get(`/api/blog/${id}`);
}


/**
 * 提交评论
 * @param {*} commentInfo 
 * @returns 
 */
export async function postComment(commentInfo) {
    return await request.post(`/api/comment`, commentInfo);
}


/**
 * 分页获取评论
 * @param {*} page 
 * @param {*} limit 
 * @param {*} blogId 
 * @returns 
 */
export async function getComments(blogId, page = 1, limit = 10) {
    return await request.get(`/api/comment`, {
        params: {
            blogId,
            page,
            limit
        }
    });
}