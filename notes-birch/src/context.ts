import React from 'react';
import { AppContext } from './types/types';

export const Context = React.createContext<AppContext>({} as AppContext);