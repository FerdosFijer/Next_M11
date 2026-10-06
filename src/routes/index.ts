import addRoutes from "../helpres/RouteHandler";
import sendJson from "../helpres/sendJSON";
import parseBody from "../helpres/parseBody";
import { readUsers, writeUsers } from "../helpres/fileDb";

addRoutes("GET", "/", (req, res) => {
    sendJson(res, 200, {
        message: "Hello from nodejs with typescript 2026...",
        path: req.url,
    })
});
addRoutes("GET", "/api", (req, res) => {
    sendJson(res, 200, {
        message: "Health status is ok...",
        path: req.url,
    })
});
addRoutes("POST", "/api/users", async(req, res) => {
    const body = await parseBody(req);
    const users = readUsers();//user json read kortese suru eikan e
    const newUser={
        ...body,
    };
    users?.push(newUser);
    writeUsers(users); //user json write kortese ei line e sas
    sendJson(res, 200,{success: true, data:body});
});
addRoutes("PUT", "/api/users/:id", async(req, res) => {
    const {id} = (req as any).params;
    const body = await parseBody(req);
    const users = readUsers();
    const index = users.findIndex((user: any) => user.id == id);
    if(index === -1){
        sendJson(res, 404, {
            success: false,
            message: "user not found",
        })
    }
    users[index] = {
        ...users[index],
        ...body,
    };
    writeUsers(users);
    sendJson(res, 200, {success: true, message: `id ${id} user updated successfully`, data: users[index]})
});