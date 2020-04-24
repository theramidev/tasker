export interface IProps {
    text: string,
    isCompleted: boolean,
    onChange(text: string, isCompleted: boolean, index: number): void,
    index: number
}