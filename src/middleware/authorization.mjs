import { db } from "../models/dataBase.mjs";
function decodeAuthBasic (headerContent) {
    try {
        const [ method, token ] = headerContent.split(" ");
        const tokenString = atob(token);
        const [ name, password ] = tokenString.split(":");
        return { method, name, password }
    } catch (error) {
        throw "Malformed authentication";
    }
}

export function authMiddleware( request, response, next ) {
   
        const { method, name, password } = decodeAuthBasic(request.headers.authorization);
        db.get(
            `SELECT * FROM users WHERE
            name = ${name}
            AND password = ${password}`,
            (error, data) => {
                if (error) response.sendStatus(500);
                else if (data) next();
                else response.sendStatus(401);
            })
}