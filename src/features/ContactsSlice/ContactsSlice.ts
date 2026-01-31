import type {IContact, IContactAPI, IContactInList, IContactMutation} from "../../types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {RootState} from "../../app/store.ts";
import {axiosAPI} from "../../axiosAPI.ts";

interface ContactsState {
    contacts: IContactInList[],
    selectedContact: IContact | null,
    loading: {
        loadingForm: boolean,
        loadingModalContact: boolean,
        loadingFetchContacts: boolean,
        loadingDeleteContact: boolean
    }
}

const initialState: ContactsState = {
    contacts: [],
    selectedContact: null,
    loading: {
        loadingForm: false,
        loadingModalContact: false,
        loadingFetchContacts: false,
        loadingDeleteContact: false
    }
}

export const fetchContacts = createAsyncThunk<IContactInList[]>(
    'contacts/fetchContacts',
    async () => {
        const response = await axiosAPI.get<IContactAPI | null>('contacts.json');
        const contactsData = response.data;
        if (!contactsData) {
            return [];
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

export const fetchSelectedContact = createAsyncThunk<IContact, string>(
    'contacts/fetchSelectedContact',
    async(id) => {
        const response = await axiosAPI.get<IContact>(`contacts/${id}.json`);
        return response.data;
    }
)

export const editContact = createAsyncThunk<void, IContact>(
    'contacts/editContact',
    async(contact) => {
        const editedContact: IContactMutation = {
            name: contact.name,
            photo: contact.photo,
            email: contact.email,
            phone: contact.phone
        }
        await axiosAPI.put(`contacts/${contact.id}.json`, editedContact)
    }
)

export const deleteContact = createAsyncThunk<void, string>(
    'contacts/deleteContact',
    async(id) => {
        await axiosAPI.delete(`contacts/${id}.json`)
    }
)

export const addContact = createAsyncThunk<void, IContactMutation>(
    'contacts/addContact',
    async(contact) => {
        await axiosAPI.post('contacts.json', contact)
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
            .addCase(fetchSelectedContact.pending, (state) => {
                state.loading.loadingModalContact = true;
            })
            .addCase(fetchSelectedContact.fulfilled, (state, action) => {
                state.selectedContact = action.payload;
                state.loading.loadingModalContact = false;
            })
            .addCase(fetchSelectedContact.rejected, (state) => {
                state.loading.loadingModalContact = false;
            })
            .addCase(editContact.pending, (state) => {
                state.loading.loadingForm = true;
            })
            .addCase(editContact.fulfilled, (state) => {
                state.loading.loadingForm = false;
            })
            .addCase(editContact.rejected, (state) => {
                state.loading.loadingForm = false;
            })
            .addCase(addContact.pending, (state) => {
                state.loading.loadingForm = true;
            })
            .addCase(addContact.fulfilled, (state) => {
                state.loading.loadingForm = false;
            })
            .addCase(addContact.rejected, (state) => {
                state.loading.loadingForm = false;
            })
            .addCase(deleteContact.pending, (state) => {
                state.loading.loadingDeleteContact = true;
            })
            .addCase(deleteContact.fulfilled, (state) => {
                state.loading.loadingDeleteContact = false;
            })
            .addCase(deleteContact.rejected, (state) => {
                state.loading.loadingDeleteContact = false;
            })
    }
})

export const selectContacts = (state: RootState) => state.contactsApp.contacts;
export const selectSelectedContact = (state: RootState) => state.contactsApp.selectedContact;
export const selectContactsLoading = (state: RootState) => state.contactsApp.loading;

export const ContactsReducer = ContactsSlice.reducer;

