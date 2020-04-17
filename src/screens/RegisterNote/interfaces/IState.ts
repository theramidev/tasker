export interface IState {
    headerColor: string | undefined;
    openModalColors: boolean;
    openModalDate: boolean;
    openActionSheet: boolean;
    favorite: boolean;
    fixed: boolean;
    dateNote: string | Date | null;
    imageNote: string | null;
    videoNote: string | null | any;
}