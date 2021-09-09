const express = require("express");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const apiPaths = {
    "/auth": {
        target: "http://localhost:8000",
        pathRewrite: {
            "^/auth": "/auth",
        },
        changeOrigin: true,
    },
    "/user":{
      target:"http://localhost:8000",
      pathRewrite:{
        "^/user":"/user",
      },
      changeOrigin:true
    }
};

const isDevelopment = process.env.NODE_ENV !== "production";

app.prepare()
    .then(() => {
        const server = express();

        if (isDevelopment) {
            server.use("/auth", createProxyMiddleware(apiPaths["/auth"]));
            server.use("/user", createProxyMiddleware(apiPaths["/user"]));
        }

        server.all("*", (req, res) => {
            return handle(req, res);
        });

        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.log("Error:::::", err);
    });
