import React, { createContext, useState } from 'react';

export const MenuContext = createContext<IContext>({menuRef: undefined});

export const MenuProvider = ({children}: any) => {
    const [menuRef, setMenuRef] = useState<any>(undefined);

    const value: IContext = {
        menuRef,
        setRef: (ref) => {
            setMenuRef(ref);
        }
    }


    return(
        <MenuContext.Provider value={value}>
            {children}
        </MenuContext.Provider>
    )

}

interface IContext {
    menuRef: any,
    setRef?: (ref: any) => void
}