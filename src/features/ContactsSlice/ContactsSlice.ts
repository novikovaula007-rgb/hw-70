import type {IContact, IContactInList} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import type {RootState} from "../../app/store.ts";

interface ContactsState {
    contacts: IContactInList[],
    selectedContact: IContact | null,
    loading: {
        loadingForm: boolean,
        loadingModalContact: boolean,
        loadingFetchContacts: boolean
    }
}

const initialState: ContactsState = {
    contacts: [],
    selectedContact: null,
    loading: {
        loadingForm: false,
        loadingModalContact: false,
        loadingFetchContacts: false
    }
}

export const ContactsSlice = createSlice({
    name: 'contactsApp',
    initialState,
    reducers: {}
})

export const selectContacts = (state: RootState) => state.contactsApp.contacts;
export const selectSelectedContact = (state: RootState) => state.contactsApp.selectedContact;
export const selectContactsLoading = (state: RootState) => state.contactsApp.loading;

export const ContactsReducer =ContactsSlice.reducer;

