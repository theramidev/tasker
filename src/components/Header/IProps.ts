import { NavigationState, NavigationParams, NavigationScreenProp } from "react-navigation";

export interface IProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
    title: string,
    mode?: 'menu' | 'back' | 'none',
    iconLibrary?: 'Material' | 'Ionic' | 'FontAwesome',
    iconName?: string,
    onPress?: () => void,
    onMenuOpen?: () => void
}