import { Ttask } from "../components/ListOfTasks/IProps";

export interface IState {
    openModalColors: boolean;
    openModalDate: boolean;

    title: string,
    isFavorite: boolean,
    isFixed: boolean,
    colorFixed: string | null,
    tasks: Ttask[];
    dateNote: string | Date | null;
}