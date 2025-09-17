import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// Reducers Imports
import UserReducer from './reducers/UserReducer'

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
    user: UserReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export {store,persistor}