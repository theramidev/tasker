
type noteType = 'Audio' | 'Video' | 'Image';

export class MNoteComplement {
    public complementId: number;
    public noteId: number;
    public type: noteType;
    public path: string;

    constructor(complement: INoteComplement) {
        this.complementId = complement.id;
        this.noteId = complement.note_id;
        this.type = complement.type;
        this.path = complement.path;
    }
}

export interface INoteComplement {
    id: number,
    note_id: number, 
    type: noteType,
    path: string
}