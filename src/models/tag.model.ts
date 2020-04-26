
export class MTag {
    public tagId: number;
    public name: string;
    public color: string;

    constructor(tag: ITag) {
        this.tagId = tag.tag_id;
        this.name = tag.tag_name;
        this.color = tag.tag_color;
    }
}

export interface ITag {
    tag_id: number,
    tag_name: string,
    tag_color: string,
}