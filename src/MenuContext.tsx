import React, { createContext, useState } from 'react';

export const MenuContext = createContext<IContext>({menuRef: undefined, optionSelected: 'All'});

export type menuSelected = 'All' | 'Favorites' | 'Reminders' | 'Voices' | 'Videos' | 'Taks' | 'Tags' | 'Trash';

export const MenuProvider = ({children}: any) => {
    const [menuRef, setMenuRef] = useState<any>(undefined);
    const [optionSelected, setSlected] = useState<menuSelected>('All');

    const value: IContext = {
        menuRef,
        optionSelected,
        setRef: (ref) => setMenuRef(ref),
        setOptionSelected: (selected: menuSelected) => setSlected(selected)
    }


    return(
        <MenuContext.Provider value={value}>
            {children}
        </MenuContext.Provider>
    )

}

interface IContext {
    menuRef: any,
    optionSelected: menuSelected,
    setRef?: (ref: any) => void,
    setOptionSelected?: (selected: menuSelected) => void
}