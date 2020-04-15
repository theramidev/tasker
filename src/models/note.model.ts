import { MNoteComplement } from "./noteComplement.model";

type stringOrNull = string | null;

export class MNote {
    public noteId: number;
    public title: string;
    public message: string;
    public tag: stringOrNull;
    public color: stringOrNull;
    public isFavorite: boolean;
    public isFixed: boolean;
    public dateReminder: Date | null;
    public dateUpdate: Date;
    public dateRegister: Date;
    public complements: MNoteComplement[];

    constructor(note: INote, complements: MNoteComplement[] = []) {
        this.noteId = note.id;
        this.title = note.title;
        this.message = note.message;
        this.tag = note.tag;
        this.color = note.color;
        this.isFavorite = note.isFavorite ? true : false;
        this.isFixed = note.isFixed ? true : false;
        this.dateReminder = note.date_reminder ? new Date(note.date_reminder) : null;
        this.dateUpdate = new Date(note.date_update);
        this.dateRegister = new Date(note.date_register);
        this.complements = complements;
    }
}

export interface INote {
    id: number,
    title: string,
    message: string,
    tag: stringOrNull,
    color: stringOrNull,
    isFavorite: 0 | 1,
    isFixed: 0 | 1,
    date_reminder: string | null,
    date_update: string,
    date_register: string
}