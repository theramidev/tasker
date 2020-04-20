import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";

export interface IProps {
    navigation?: NavigationScreenProp<NavigationState, NavigationParams>;
    hideVideo: boolean;
    hideaudio: boolean;
    hideImage: boolean;

    openModalColors: () => void;
    openModalDate: () => void;
    openActionSheet: () => void;
    openTakeVideo: () => void;
    openModalTags: () => void;
    openAudio: () => void;
}