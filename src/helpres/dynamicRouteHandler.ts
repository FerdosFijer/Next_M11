import { routes } from "./RouteHandler";

function findDynamicRoute(method:string, url: string){
    const methodMap =routes.get(method);
    if(!methodMap) return null;

    for(const [routePath, handler] of methodMap.entries()){
        const routeParts = routePath.split("/"); // "/api/users/:id" --> ["api", "users", ":id"]
        const urlParts = url.split("/"); // "/api/users/:2" --> ["api", "users", "2"]

        if(routeParts.length !== urlParts.length) continue;

        const params:any = {}; //{id: 2}
        let matched = true;

        // "/api/users/:id"
        for(let i = 0; i<routeParts.length; i++){
            if(routeParts[i]?.startsWith(":")){
                params[routeParts[i]?.substring(1)!]= urlParts[i];
            }else if(routeParts[i] !== urlParts[i]){
                matched = false;
                break;
            }
        }
        if(matched){
            return{handler, params};
        }
    }
    return null;
}
export default findDynamicRoute;