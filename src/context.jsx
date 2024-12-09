import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';

const AppContext = createContext(null);

const AppProvider = ({children}) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
        });
    
        return () => unsubscribe();
    }, []);

    const sharedState = {
        user
    };

    return (
        <div>
            <AppContext.Provider value={sharedState}>
                {children}
            </AppContext.Provider>
        </div>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === null) {
      throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};

export default AppProvider;

