import http, { IncomingMessage, Server, ServerResponse } from "http"; //http ekta build in module
import config from "./config";
import  { RouteHandler, routes } from "./helpres/RouteHandler";
import "./routes"
import findDynamicRoute from "./helpres/dynamicRouteHandler";

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    console.log("server is running...");
    //! root route using route handler 
    const method = req.method?.toUpperCase() || "";
    const path = req.url || "";
    const methodMap = routes.get(method)
    const handler:RouteHandler | undefined = methodMap?.get(path)
    if(handler){
        handler(req,res);
    }else if(findDynamicRoute(method, path)){
        const match = findDynamicRoute(method, path);
        (req as any).params = match?.params;
        match?.handler(req,res);
    } else{
        res.writeHead(404, {"content-type" : "applicaton/json"});
        res.end(JSON.stringify({
            success: false,
            message: "Route not found",
            path,
        }))
    }

    // root route
    // if (req.url == "/" && req.method == "GET") {
    //         res.writeHead(200, { "content-type": "application/json" });
    //     res.end(
    //         JSON.stringify({
    //             message: "Hello from nodejs with typescript..aaa.",
    //             path: req.url,
    //         })
    //     );
    // }

    // health route
    // if (req.url == "/api" && req.method == "GET") {
    //     res.writeHead(200, { "content-type": "application/json" });
    //     res.end(
    //         JSON.stringify({
    //             message: "Health status is ok...",
    //             path: req.url,
    //         })
    //     );
    // }

    // if (req.url == "/api/users" && req.method == "POST") {
    //     // const user ={
    //     //     id:1,
    //     //     name: "Fijer",
    //     // };
    //     // res.writeHead(200, { "content-type": "application/json" });
    //     // res.end( JSON.stringify(user));
    //     let body = "";
    //     // listen for data chunks
    //     req.on("data", (chunk) => {
    //         body += chunk.toString();
    //     });
    //     req.on("end", () => {
    //         try {
    //             const parseBody = JSON.parse(body);
    //             console.log(parseBody);
    //             console.log("catching current changes now");
    //             res.end(JSON.stringify(parseBody));
    //         } catch (err: any) {
    //             console.log(err?.message);
    //         }
    //     });
    // }
})
server.listen(config.port, () => { console.log(`server is runnign on port ${config.port}`); })
