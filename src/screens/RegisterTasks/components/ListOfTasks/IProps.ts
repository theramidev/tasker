
export type Ttask = {isCompleted: boolean, text: string, index: number}

export interface IProps {
    tasks: Ttask[],
    onAddTask(task: Ttask): void
}