import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "@/features/sidebar/sidebarSlice"
import darkModeReducer from "@/features/darkmode/darkmodeSlice"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist";

const darkModePersistConfig = {
    key: "darkMode",
    storage
}

const persistedDarkModeReducer = persistReducer(darkModePersistConfig, darkModeReducer);

export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        darkMode: persistedDarkModeReducer
    }
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;