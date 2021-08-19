import React, {useState, useEffect, createContext, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';




export interface IAuthenticationContext {
  currentUser: string;
  isAuthenticated: boolean;

  handleAuthentication: (user: string) => void; 
  handleSignOut: () => void; 
}

const authenticationContext = createContext({} as IAuthenticationContext)

const contexts: React.FC = ({children}) => {

  const [currentUser, setCurrentUser] = useState(''); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function getAuthenticateUserFromStorage() {
      const loggedUser = await AsyncStorage.getItem('@profs/current_user'); 
      if (loggedUser !== null) {
        setCurrentUser(loggedUser); 
        setIsAuthenticated(true); 
      }
    }
    getAuthenticateUserFromStorage(); 
  }, [])


  async function handleSignOut() {
    await AsyncStorage.clear(); 
    setIsAuthenticated(false); 

  }

  async function handleAuthentication(user: string) {

    await AsyncStorage.setItem('@profs/current_user', user);
    setIsAuthenticated(true);
    setCurrentUser(user);
  }

  return (  
    <authenticationContext.Provider value={{currentUser, isAuthenticated, handleAuthentication, handleSignOut}}>
      {children}
    </authenticationContext.Provider>
  );
}

export function useAuth() {
  const authenticationContextItems: IAuthenticationContext = useContext(authenticationContext); 

  return authenticationContextItems;
}

export default contexts;