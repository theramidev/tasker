import { ReactNode } from "react";
import { menuSelected } from '../../MenuContext';

export interface IProps {
    id: menuSelected,
    title: string,
    icon: ReactNode,
    index: number,
    isSelected: boolean,
    onSelect(selected: menuSelected): void
}