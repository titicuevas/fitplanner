import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

// Custom hook para acceder al contexto
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    return (
        <AppContext.Provider value={{ userData, setUserData }}>
            {children}
        </AppContext.Provider>
    );
};
