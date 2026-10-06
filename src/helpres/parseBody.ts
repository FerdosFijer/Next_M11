import { IncomingMessage } from "http";

async function parseBody(req: IncomingMessage): Promise<any> {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (err: any) {
                reject(err);
            }
        });
        req.on("error", reject);
    })
}
export default parseBody;