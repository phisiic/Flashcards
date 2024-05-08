// AuthContext.tsx
import React from 'react';

export const AuthContext = React.createContext({
    isLoggedIn: false,
    setLoggedIn: (value: boolean) => {}
});