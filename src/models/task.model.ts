
export class MTask {
    public taskId: number;
    public text: string;
    public isCompleted: boolean;

    constructor(task: ITask) {
        this.taskId = task.task_id;
        this.text = task.text;
        this.isCompleted = task.isComplete ? true : false;
    }
}

export interface ITask {
    task_id: number,
    text: string,
    isComplete: 0 | 1
}