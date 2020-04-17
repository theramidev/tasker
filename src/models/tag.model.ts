
export class MTag {
    public tagId: number;
    public name: string;
    public color: string;

    constructor(tag: ITag) {
        this.tagId = tag.tag_id;
        this.name = tag.name;
        this.color = tag.color;
    }
}

export interface ITag {
    tag_id: number,
    name: string,
    color: string,
}