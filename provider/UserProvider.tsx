import React, {
  createContext,
  Dispatch,
  FC,
  useContext,
  useState,
} from 'react';
import { User } from '../services/types';

interface UserProvider {
  user?: User;
  setUser: Dispatch<User>;
}

export const UserContext = createContext({} as UserProvider);
export const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User>();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
