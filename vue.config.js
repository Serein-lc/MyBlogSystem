module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "https://test-my-site.com",
            },
        },
        port: 2873,
        open: true,
    },
    configureWebpack: require("./webpack.config"),
}