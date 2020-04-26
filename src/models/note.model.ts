import {MTag} from './tag.model';

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
  public image: string | null;
  public video: string | null;
  public audio: string | null;

  constructor(note: INote) {
    this.noteId = note.id;
    this.title = note.title;
    this.message = note.message;
    this.tag = note.tag_id
      ? {
          color: note.tag_color,
          name: note.tag_name,
          tagId: note.tag_id,
        }
      : null;
    this.color = note.color;
    this.isFavorite = note.isFavorite ? true : false;
    this.isFixed = note.isFixed ? true : false;
    this.dateReminder = note.date_reminder
      ? new Date(note.date_reminder)
      : null;
    this.dateUpdate = new Date(note.date_update);
    this.dateRegister = new Date(note.date_register);
    this.isDelete = note.isDelete ? true : false;
    this.image = note.image;
    this.video = note.video;
    this.audio = note.audio;
  }
}

export interface INote {
  id: number;
  title: string;
  message: string;
  color: stringOrNull;
  isFavorite: 0 | 1;
  isFixed: 0 | 1;
  date_reminder: number | null;
  date_update: number;
  date_register: number;
  tag_id: number;
  tag_name: string;
  tag_color: string;
  isDelete: number;
  audio: string | null;
  image: string | null;
  video: string | null;
}
