import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";

export interface IProps {
    openModal: boolean;
    onClose(palette: string | null): void;
}