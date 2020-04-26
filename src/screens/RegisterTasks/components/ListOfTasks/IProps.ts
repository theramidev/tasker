
export type Ttask = {isCompleted: boolean, text: string}

export interface IProps {
    tasks: Ttask[],
    onAddTask(task: Ttask): void
    onChangeTask: (task: Ttask, index: number) => void;
}