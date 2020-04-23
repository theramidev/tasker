import { MNoteComplement } from "./noteComplement.model";
import { MTag } from "./tag.model";

type stringOrNull = string | null;

export class MNote {
    public noteId: number;
    public title: string;
    public message: string;
    public tag: MTag | null;
    public color: stringOrNull;
    public isFavorite: boolean;
    public isFixed: boolean;
    public dateReminder: Date | null;
    public dateUpdate: Date;
    public dateRegister: Date;
    public isDelete: boolean;
    public complements: MNoteComplement[];

    constructor(note: INote, complements: MNoteComplement[] = []) {
        this.noteId = note.id;
        this.title = note.title;
        this.message = note.message;
        this.tag = {
            color: note.tagColor,
            name: note.tagName,
            tagId: note.tag_id
        };
        this.color = note.color;
        this.isFavorite = note.isFavorite ? true : false;
        this.isFixed = note.isFixed ? true : false;
        this.dateReminder = note.date_reminder ? new Date(note.date_reminder) : null;
        this.dateUpdate = new Date(note.date_update);
        this.dateRegister = new Date(note.date_register);
        this.isDelete = note.isDelete ? true : false;
        this.complements = complements;
    }
}

export interface INote {
    id: number,
    title: string,
    message: string,
    color: stringOrNull,
    isFavorite: 0 | 1,
    isFixed: 0 | 1,
    date_reminder: string | null,
    date_update: string,
    date_register: string,
    tag_id: number,
    tagName: string,
    tagColor: string,
    isDelete: number
}