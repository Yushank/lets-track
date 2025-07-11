"use client"

import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";


export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {children}
                </PersistGate>
            </Provider>
        </SessionProvider>
    )
}