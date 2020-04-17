import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";

export interface IProps {
    navigation?: NavigationScreenProp<NavigationState, NavigationParams>;
    openModalColors: () => void;
    openModalDate: () => void;
    openActionSheet: () => void;
    openTakeVideo: () => void;
}