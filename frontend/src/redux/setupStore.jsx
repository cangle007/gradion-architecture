import { configureStore } from '@reduxjs/toolkit';
import mainReducer from '../redux/reducers/mainReducer';

export const setupStore = () => configureStore({ reducer: mainReducer });
