import db from "../models/dataBase.mjs";

export function postUserController(request, response) {
    const { name, password } = request.body;
    db.run(
        `INSERT INTO users(name, password) VALUES ("${name}", "${password}")`,
        (err) => {
            if (err) {
                console.error(err);
                response.sendStatus(500)
            } else {
                response.sendStatus(201)
            }
        }
    )
}