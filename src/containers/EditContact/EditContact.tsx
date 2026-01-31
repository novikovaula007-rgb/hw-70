import {useParams} from "react-router-dom";
import {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelect} from "../../hooks.ts";
import {fetchSelectedContact, selectSelectedContact} from "../../features/ContactsSlice/ContactsSlice.ts";
import ContactForm from "../../components/ContactForm/ContactForm.tsx";

const EditContact = () => {
    const {idContact} = useParams();
    const selectedContact = useAppSelect(selectSelectedContact);
    const dispatch = useAppDispatch();

    const fetchContact = useCallback(async () => {
        if (idContact) {
            dispatch(fetchSelectedContact(idContact));
        }
    }, [dispatch, idContact])

    useEffect(() => {
        void fetchContact()
    }, [fetchContact]);

    return (
        <>
            {selectedContact && idContact && <ContactForm
                isEditing
                initialValueForm={selectedContact}
                editId={idContact}
            />}

        </>
    );
};

export default EditContact;