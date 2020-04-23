import { MTask, ITask } from "./task.model";
import { MTag } from "./tag.model";

type stringOrNull = string | null;

export class MThingsToDo {
    public listId: number;
    public title: string;
    public tag: MTag;
    public color: stringOrNull;
    public isFavorite: boolean;
    public isFixed: boolean;
    public dateReminder: Date | null;
    public dateUpdate: Date;
    public dateRegister: Date;
    public isDelete: boolean;
    public tasks: MTask[];

    constructor(thingsToDo: IThingsToDo, tasks: ITask[] = []) {
        this.listId = thingsToDo.list_id;
        this.title = thingsToDo.title;
        this.tag = {
            color: thingsToDo.tagColor,
            name: thingsToDo.tagName,
            tagId: thingsToDo.tag_id
        };
        this.color = thingsToDo.color;
        this.isFavorite = thingsToDo.isFavorite ? true : false;
        this.isFixed = thingsToDo.isFixed ? true : false;
        this.dateReminder = thingsToDo.date_reminder ? new Date(thingsToDo.date_reminder) : null;
        this.dateUpdate = new Date(thingsToDo.date_update);
        this.dateRegister = new Date(thingsToDo.date_register);
        this.isDelete = thingsToDo.isDelete ? true : false;
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
    tag_id: number,
    tagName: string,
    tagColor: string,
    isDelete: number
}