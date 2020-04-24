import Database from "../..";
import { ResultSet } from "react-native-sqlite-storage";
import { createThingsToDoModel } from "./model";
import { MThingsToDo } from "../../../models/thingsToDo.model";

const listTable = 'things_to_do';
const taskTable = 'task';
const tagTable = 'tag';

/**
 * @description Actualiza el campo de delete
 */
export const updateFoftDelete = (toDoId: number, isDelete: boolean): Promise<ResultSet> => {
    return Database.sentence(
        `UPDATE ${listTable} SET isDelete = ? WHERE list_id = ?`,
        [isDelete ? 1 : 0, toDoId]
    );
}

/**
 * @description Elimina una lista de la base de datos
 */
export const deleteList = (listId: number): Promise<ResultSet> => {
    return Database.sentence(
        `DELETE FROM ${listTable} WHERE list_id = ?`,
        [listId]
    );
}

/**
 * @description Elimina las tareas de una lista
 */
export const deleteTaskList = (listId: number): Promise<ResultSet> => {
    return Database.sentence(
        `DELETE FROM ${taskTable} WHERE list_id = ?`,
        [listId]
    );
}

/**
 * @description Actualiza una lista de tareas en la base de datos
 */
export const updateThingsToDo = ({
    listId,
    title,
    tag,
    color,
    isFavorite,
    isFixed,
    dateReminder
}: MThingsToDo): Promise<ResultSet> => {
    return Database.sentence(
        `UPDATE ${listTable} SET title = ?, tag = ?, color = ?, isFavorite = ?, isFixed = ? date_reminder = ?,
        date_update = ? WHERE list_id = ?`,
        [title, tag, color, isFavorite, isFixed, dateReminder?.toDateString(), new Date().toDateString(), listId]
    );
}

/**
 * @description Obtiene una lista de tareas por su ID de la base de datos
 */
export const getThingsToDoById = (thingsToDoId: number): Promise<ResultSet> => {
    return Database.sentence(
        `SELECT SELECT a.list_id, a.title, a.color, a.isFavorite, a.isFixed, a.date_reminder, a.isDelete,
        a.date_update, a.date_register, b.tag_id, b.name AS tagName, b.color AS tagColor 
        FROM ${listTable} AS a LEFT JOIN ${tagTable} AS b ON a.tag = b.tag_id WHERE list_id = ?`,
        [thingsToDoId]
    );
}

/**
 * @description Obtiene las tareas de una lista
 */
export const getTaskByList = (listId: number): Promise<ResultSet> => {
    return Database.sentence(
        `SELECT *  FROM ${taskTable} WHERE list_id = ?`,
        [listId]
    );
}

/**
 * @description Obtiene todas las listas de tareas de la base de datos
 */
export const getAllThingsToDo = (): Promise<ResultSet> => {
    return Database.sentence(
        `SELECT a.list_id, a.title, a.color, a.isFavorite, a.isFixed, a.date_reminder, a.isDelete,
        a.date_update, a.date_register, b.tag_id, b.name AS tagName, b.color AS tagColor 
        FROM ${listTable} AS a LEFT JOIN ${tagTable} AS b ON a.tag = b.tag_id`
    );
}

/**
 * @description Crea una Tarea de una lista
 */
export const createTask = (taskText: string, listId: number, isCompleted?: boolean): Promise<ResultSet> => {
    return Database.sentence(
        `INSERT INTO ${taskTable} (list_id, text, isCompleted) VALUES(?, ?, ?)`,
        [listId, taskText, isCompleted ? 1 : 0]
    )
}

/**
 * @description Crea una lista de tareas en la basse de datos
 */
export const createThingsToDo = ({
    title,
    tag,
    color,
    isFavorite,
    isFixed,
    dateReminder
}: createThingsToDoModel): Promise<ResultSet> => {
    return Database.sentence(
        `INSERT INTO ${listTable} (title, tag, color, isFavorite, isFixed, date_reminder, date_update, 
        date_register, isDelete) 
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
        [title, tag, color, isFavorite, isFixed, dateReminder?.toDateString(), new Date().toDateString(),
        new Date().toDateString(), 0]
    );
}