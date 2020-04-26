import Database from '../..';
import { ResultSet } from 'react-native-sqlite-storage';
import { MTag } from '../../../models/tag.model';

const tagTable = 'tag';
const noteTable = 'note';
const listTable = 'things_to_do';

/**
 * @description Elmina un tag de la base de datos
 */
export const deleteTag = (tagId: number): Promise<ResultSet> => {
    return Database.sentence(
        `DELETE FROM ${tagTable} WHERE tag_id = ?`,
        [tagId]
    );
}

/**
 * @description Elimina el tag de la lista de tareas
 */
export const deleteTagFromList = (tagId: number): Promise<ResultSet> => {
    return Database.sentence(
        `UPDATE ${listTable} SET tag = ? WHERE tag = ?`,
        [null, tagId]
    );
}

/**
 * @description Elimina el tag de la lista de notas
 */
export const deleteTagFromNote = (tagId: number): Promise<ResultSet> => {
    return Database.sentence(
        `UPDATE ${noteTable} SET tag = ? WHERE tag = ?`,
        [null, tagId]
    );
}

/**
 * @description Obtiene un tag de la base de datos
 */
export const getTagById = (tagId: number): Promise<ResultSet> => {
    return Database.sentence(
        `SELECT * FROM ${tagTable} WHERE tag_id = ?`,
        [tagId]
    );
}

/**
 * @description Actualiza un tag de la base de datos
 */
export const updateTag = ({
    color,
    name,
    tagId
}: MTag): Promise<ResultSet> => {
    return Database.sentence(
        `UPDATE ${tagTable} SET tag_name = ?, tag_color = ? WHERE tag_id = ?`,
        [name.toLowerCase(), color.toLowerCase(), tagId]
    );
}

/**
 * @description Obtiene todos los tags de la base de datos
 */
export const getAllTags = (): Promise<ResultSet> => {
    return Database.sentence(
        `SELECT * FROM ${tagTable} ORDER BY tag_id DESC`
    );
}

/**
 * @description Crea un tag en la base de datos 
 */
export const createTag = (name: string, color: string): Promise<ResultSet> => {
    return Database.sentence(
        `INSERT INTO ${tagTable} (tag_name, tag_color) VALUES(?, ?)`,
        [name.toLowerCase(), color.toLowerCase()]
    );
}