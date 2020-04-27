import { 
    createList,
    createTask,
    deleteList,
    deleteTaskOfList,
    getAllLists,
    getListById,
    getTaskByList,
    updateList,
    updateSoftDelete,
    updateTask
} from './store';
import { createThingsToDoModel } from './model';
import { MListOfTasks, IListOfTasks } from '../../../models/listOfTasks.model';
import { ITask, MTask } from '../../../models/task.model';

type Ttask = {isCompleted: boolean, text: string}

class TaskController {

    /**
     * @description Actualiza el delete de una lista de tareas
     * @param listId ID de la lista de tareas
     * @param isDelete
     * @return Promise<boolean>
     */
    public static async updateDeleteListOfTask(listId: number, isDelete: boolean): Promise<boolean> {
        try {
            const { rowsAffected } = await updateSoftDelete(listId, isDelete);
            if (rowsAffected) {
                return Promise.resolve(true)
            }
            return Promise.resolve(false);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * @description Elimina una lista de tareas
     * @param listId ID de la lista de tareas que se va a borrar
     * @return Promise<boolean>
     */
    public static async deleteListOfTask(listId: number): Promise<boolean> {
        try {
            const { rowsAffected } = await deleteList(listId);
            if (rowsAffected) {
                return Promise.resolve(true);
            }
            return Promise.resolve(false);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * @description Actualiza una lista de tareas
     * @param list Lista de tareas ACTUALIZADA
     * @param tasks Tareas de la lista ACTUALIZADA
     * @param newTasks Nuevas tareas que van a ser añadidas
     */
    public static async updateListOfTasks(
        List: MListOfTasks, 
        tasks: MTask[] | null = null, 
        newTasks: {text: string, isCompleted?: boolean}[] | null = null
    ): Promise<MListOfTasks> {
        try {
            await updateList(List);
            
            if (tasks) {
                for (const {taskId, text, isCompleted} of tasks) {
                    await updateTask(taskId, text, isCompleted);
                }
            }

            if (newTasks) {
                for (const {text, isCompleted = false} of newTasks) {
                    await createTask(text, List.listId, isCompleted);
                }
            }
            
            const thingsToDoResult: IListOfTasks = (await getListById(List.listId)).rows.item(0);
            const tasksResult: ITask[] = (await getTaskByList(List.listId)).rows.raw();
            return Promise.resolve(new MListOfTasks(thingsToDoResult, tasksResult));
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * @description Obtiene una lista de tareas por su id
     * @param listOfTasksId ID de la lista de tareas
     * @return Promise<MListOfTasks>
     */
    public static async getListOfTaskById(listOfTasksId: number): Promise<MListOfTasks> {
        try {
            const listOfTaskResult: IListOfTasks = (await getListById(listOfTasksId)).rows.item(0);
            const tasks: ITask[] = (await getTaskByList(listOfTasksId)).rows.raw();
            return Promise.resolve(new MListOfTasks(listOfTaskResult, tasks));
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * @description Obtiene todas las tareas
     * @return Promise<MListOfTasks[]>
     */
    public static async getAllListsOfTasks(): Promise<MListOfTasks[]> {
        try {
            const listOfTasksResult: IListOfTasks[] = (await getAllLists()).rows.raw();
            const ListsOfTasks: MListOfTasks[] = await Promise.all(listOfTasksResult.map(async (list) => {
                const tasks: ITask[] = (await getTaskByList(list.list_id)).rows.raw();
                return new MListOfTasks(list, tasks);
            }));

            return Promise.resolve(ListsOfTasks);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * @description Crea una lista de tareas 
     * @param thingsToDo Lista de tareas
     * @param tasksText Tareas de la lista
     * @return Promise<number> --> ID de la lista
     */
    public static async createListOfTasks({
        title,
        tag = null,
        color = '#ffffff',
        isFavorite = 0,
        isFixed = 0,
        dateReminder = null
    }: createThingsToDoModel, tasks: Ttask[]): Promise<number> {
        try {
            const { insertId } = await createList({title, tag, color, isFavorite, isFixed, dateReminder});
            
            for (const task of tasks) {
                await createTask(task.text, insertId, task.isCompleted);
            }

            return Promise.resolve(insertId);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export default TaskController;