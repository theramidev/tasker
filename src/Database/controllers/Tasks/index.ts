import { 
    createThingsToDo,
    createTask,
    getAllThingsToDo,
    getTaskByList,
    getThingsToDoById,
    updateThingsToDo,
    deleteTaskList,
    deleteList
} from './store';
import { createThingsToDoModel } from './model';
import { IThingsToDo, MThingsToDo } from '../../../models/thingsToDo.model';
import { ITask, MTask } from '../../../models/task.model';

class TaskController {

    /**
     * @description Elimina una lista de tareas
     * @param listId ID de la lista de tareas que se va a borrar
     * @return Promise<boolean>
     */
    public static deleteThingsToDo(listId: number): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const { rowsAffected } = await deleteList(listId);
                if (rowsAffected) {
                    resolve(true);
                    return;
                }
                resolve(false);
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * @description Actualiza una lista de tareas
     * @param thingsToDo Lista de tareas ACTUALIZADA
     * @param tasks Tareas de la lista ACTUALIZADA
     */
    public static updateThingsToDo(thingsToDo: MThingsToDo, tasks?: MTask[]): Promise<MThingsToDo> {
        return new Promise(async (resolve, reject) => {
            try {
                await updateThingsToDo(thingsToDo);
                if (tasks && tasks.length > 0) {
                    await deleteTaskList(thingsToDo.listId);
                    for (const task of tasks) {
                        await createTask(task.text, thingsToDo.listId, task.isCompleted);
                    }
                }
                const thingsToDoResult: IThingsToDo = (await getThingsToDoById(thingsToDo.listId)).rows.item(0);
                const tasksResult: ITask[] = (await getTaskByList(thingsToDo.listId)).rows.raw();
                resolve(new MThingsToDo(thingsToDoResult, tasksResult));
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * @description Obtiene una lista de tareas por su id
     * @param thingsToDoId ID de la lista de tareas
     * @return Promise<MThingsToDo>
     */
    public static getThingsToDoById(thingsToDoId: number): Promise<MThingsToDo> {
        return new Promise(async (resolve, reject) => {
            try {
                const thingsToDo: IThingsToDo = (await getThingsToDoById(thingsToDoId)).rows.item(0);
                const tasks: ITask[] = (await getTaskByList(thingsToDoId)).rows.raw();
                resolve(new MThingsToDo(thingsToDo, tasks));
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * @description Obtiene todas las tareas
     * @return Promise<MThingsToDo[]>
     */
    public static getAllThingsToDo(): Promise<MThingsToDo[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const thingsToDoResult: IThingsToDo[] = (await getAllThingsToDo()).rows.raw();
                const thingsToDo: MThingsToDo[] = await Promise.all(thingsToDoResult.map(async (toDo) => {
                    const tasks: ITask[] = (await getTaskByList(toDo.list_id)).rows.raw();
                    return new MThingsToDo(toDo, tasks);
                }));

                resolve(thingsToDo);
            } catch (error) {
                reject(error);
            }
        })
    }

    /**
     * @description Crea una lista de tareas 
     * @param thingsToDo Lista de tareas
     * @param tasksText Tareas de la lista
     * @return Promise<number> --> ID de la lista
     */
    public static createThingsToDo({
        title,
        tag = null,
        color = '#ffffff',
        isFavorite = 0,
        isFixed = 0,
        dateReminder = null
    }: createThingsToDoModel, tasksText: string[]): Promise<number> {
        return new Promise(async (resolve, reject) => {
            try {
                const { insertId } = await createThingsToDo({title, tag, color, isFavorite, isFixed, dateReminder});
                
                for (const task of tasksText) {
                    await createTask(task, insertId);
                }

                resolve(insertId);
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default TaskController;