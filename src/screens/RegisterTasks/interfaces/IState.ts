import { Ttask } from "../components/ListOfTasks/IProps";

export interface IState {
    title: string,
    isFavorite: boolean,
    isFixed: boolean,
    colorFixed: string,
    tasks: Ttask[]
}