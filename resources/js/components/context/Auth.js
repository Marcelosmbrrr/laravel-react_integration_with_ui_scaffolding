import * as React from 'react';

const AuthContext = React.createContext();

// Provider
// Get the chilren component
export function AuthProvider({children}){

    const [auth, setAuth] = React.useState({status: "unset"});

    return(

        // Put the children component inside the Provider
        // Value receives the values that is shared between the wraped components
        <AuthContext.Provider value = {{auth, setAuth}}>

            {children} 

        </AuthContext.Provider>
    )
}

// Custom Hook
// Return the shared values 
export function useAuth(){

    //Context recebe o atual valor do contexto
    const context = React.useContext(AuthContext);

    //O retorno de context é o retornar de um objeto {auth, setAuth} com valores atualizados
    return context;

}