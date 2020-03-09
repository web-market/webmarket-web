import { createContext } from 'react';
import { initialState } from './reducer';

export const FormsGlobalContext = createContext(initialState);

export const ADD_FORM_IN_GLOBAL_CONTEXT = 'ADD_FORM_IN_GLOBAL_CONTEXT';
export const REMOVE_FORM_IN_GLOBAL_CONTEXT = 'REMOVE_FORM_IN_GLOBAL_CONTEXT';
