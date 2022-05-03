import db from "../models/dataBase.mjs";
import { tasks } from "../models/tasksModels.mjs"

export function getAllTaskController(request, response) {
    db.all(
        `SELECT id, description, done FROM tasks`,
        (err, data) => {
            if (err) {
                console.error(err);
                response.sendStatus(500)
            } else {
                response.json(data)
            }
        }
    )        
}

export function getOnetTaskController(request, response) {
    try {
        const task = task.find(
            item => item.id === parseInt(request.params.id)
        )
        if (task) response.json(task)
        else response.sendStatus(404);
    } catch (err) {
        response.sendStatus(400)
    }
}

export function postTaskController(request, response) {
    const { description, done } = request.body;
    db.run(
        `INSERT INTO tasks(description, done) VALUES ("${description}", ${done})`,
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



/* post task old function
export function postTaskController (request, response) {
    try {
        tasks.push(request.body);
        response.sendStatus(201);
    } catch (err) {
        console.error(err);
        response.sendStatus(500);
    }
}
*/
export function putTaskController (request, response) {
    const updatedTask = request.body;
    const oldTaskIdx = tasks.findIndex(
        item => item.id === updatedTask.id
    )
    tasks[oldTaskIdx] = updatedTask;
    response.sendStatus(200);
}

export function deleteTaskController (request, response) {
    const updatedTask = request.body;
    const oldTaskIdx = tasks.findIndex(
        item => item.id === updatedTask.id
    )
    tasks.splice(oldTaskIdx,1);
    response.sendStatus(200)
}