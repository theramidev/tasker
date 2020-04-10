import { ReactNode } from 'react';

export interface IProps {
    isVisible: boolean,
    onClose(): void,
    options: IOpton[],
    title: string
}

export interface IOpton {
    title: string,
    onPress(): void,
    icon: ReactNode
}