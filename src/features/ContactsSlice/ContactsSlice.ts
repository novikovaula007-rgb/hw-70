import type {IContact, IContactAPI, IContactInList} from "../../types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {RootState} from "../../app/store.ts";
import {axiosAPI} from "../../axiosAPI.ts";

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

const fetchContacts = createAsyncThunk<IContactInList[]>(
    'contacts/FetchContacts',
    async () => {
        const response = await axiosAPI.get<IContactAPI | null>('contacts');
        const contactsData = response.data;
        if (!contactsData) {
            return []
        } else {
            return Object.keys(contactsData).map(key => {
                const contact = contactsData[key];
                return {
                    name: contact.name,
                    id: key,
                    photo: contact.photo
                }
            });
        }
    }
)

export const ContactsSlice = createSlice({
    name: 'contactsApp',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.loading.loadingFetchContacts = true;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.contacts = action.payload;
                state.loading.loadingFetchContacts = false;
            })
            .addCase(fetchContacts.rejected, (state) => {
                state.loading.loadingFetchContacts = false;
            })
    }
})

export const selectContacts = (state: RootState) => state.contactsApp.contacts;
export const selectSelectedContact = (state: RootState) => state.contactsApp.selectedContact;
export const selectContactsLoading = (state: RootState) => state.contactsApp.loading;

export const ContactsReducer = ContactsSlice.reducer;

