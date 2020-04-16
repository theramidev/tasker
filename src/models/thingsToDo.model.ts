import { MTask, ITask } from "./task.model";

type stringOrNull = string | null;

export class MThingsToDo {
    public listId: number;
    public title: string;
    public tag: stringOrNull;
    public color: stringOrNull;
    public isFavorite: boolean;
    public isFixed: boolean;
    public dateReminder: Date | null;
    public dateUpdate: Date;
    public dateRegister: Date;
    public tasks: MTask[];

    constructor(thingsToDo: IThingsToDo, tasks: ITask[] = []) {
        this.listId = thingsToDo.list_id;
        this.title = thingsToDo.title;
        this.tag = thingsToDo.tag;
        this.color = thingsToDo.color;
        this.isFavorite = thingsToDo.isFavorite ? true : false;
        this.isFixed = thingsToDo.isFixed ? true : false;
        this.dateReminder = thingsToDo.date_reminder ? new Date(thingsToDo.date_reminder) : null;
        this.dateUpdate = new Date(thingsToDo.date_update);
        this.dateRegister = new Date(thingsToDo.date_register);
        this.tasks = tasks.map(task => new MTask(task));
    }
}

export interface IThingsToDo {
    list_id: number,
    title: string,
    tag: stringOrNull,
    color: stringOrNull,
    isFavorite: 0 | 1,
    isFixed: 0 | 1,
    date_reminder: stringOrNull,
    date_update: string,
    date_register: string,
}