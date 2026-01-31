import {configureStore} from "@reduxjs/toolkit";
import {ContactsReducer} from "../features/ContactsSlice/ContactsSlice.ts";

export const store = configureStore({
    reducer: {
        contactsApp: ContactsReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;