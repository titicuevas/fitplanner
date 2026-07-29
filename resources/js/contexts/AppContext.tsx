import { createContext, PropsWithChildren, useContext, useState } from 'react';

type UserData = {
    name: string;
    email: string;
} | null;

type AppContextType = {
    userData: UserData;
    setUserData: (data: UserData) => void;
};

const AppContext = createContext<AppContextType>({
    userData: null,
    setUserData: () => {},
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }: PropsWithChildren) => {
    const [userData, setUserData] = useState<UserData>(null);

    return (
        <AppContext.Provider value={{ userData, setUserData }}>
            {children}
        </AppContext.Provider>
    );
};
