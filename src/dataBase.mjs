import sqlite3 from "sqlite3";
//solo se crea la tabla de users

const db = new sqlite3.Database('src/tasks.db', (err)=>{
    if (err) {
        console.log(err.message);
    }
    console.log('Conected to the tasks application database')
});

db.run (`
    CREATE TABLE
        IF NOT EXISTS
        users(
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            password TEXT NOT NULL
        )
`);

db.run(`
    CREATE TABLE
        IF NOT EXISTS
        tasks (
            id INTEGER PRIMARY KEY,
            description TEXT NOT NULL
            
        )
`);

export function sqlCallback (error, data) {
    console.log("error:",error, "data:", data);
    if (error) throw error;
}

export function insertUser ( userObject, callback ) {
    const { id, name, password } = userObject;
    const sql = `
        INSERT INTO users (id, name, password)
        values (${id}, "${name}", "${password}");
    `;
    db.run(sql,callback);
}

export function insertTask (taskObject, callback) {
    const { id, description, done } = taskObject;
    const sql = `
    INSERT INTO tasks (id, description, done)
    values (${id}, "${description}, ${done})
    `;
    db.run(sql,callback)
}



export default db;