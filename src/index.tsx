import React from 'react';
import App from './App';
import { MenuProvider } from './MenuContext';

export default () => {

    return(
        <MenuProvider>
            <App />
        </MenuProvider>
    )
}