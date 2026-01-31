import {useAppDispatch, useAppSelect} from "../../hooks.ts";
import {fetchContacts, selectContacts, selectContactsLoading} from "../../features/ContactsSlice/ContactsSlice.ts";
import {useEffect, useState} from "react";
import {Box, Grid, Typography} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import ModalContact from "../../components/ModalContact/ModalContact.tsx";

const Contacts = () => {
    const contactsLoading = useAppSelect(selectContactsLoading).loadingFetchContacts;
    const contacts = useAppSelect(selectContacts);
    const dispatch = useAppDispatch();

    const [openModal, setOpenModal] = useState(false);
    const [idSelected, setIdSelected] = useState<string | null>(null);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);


    const selectContact = (id: string) => {
        handleOpenModal();
        setIdSelected(id)
    }

    useEffect(() => {
        dispatch(fetchContacts())
    }, [dispatch])

    return (
        <Box>
            {contactsLoading && <Spinner/>}
            {!contactsLoading && contacts.length > 0 && contacts.map(contact => {
                return <Box key={contact.id}>
                    <Grid container spacing={3} onClick={() => selectContact(contact.id)} sx={{
                        width: '100%',
                        height: '101px',
                        border: '1px solid #ccc',
                        borderRadius: '5%',
                        margin: '10px 20px',
                        alignItems: 'center'
                    }}>
                        <Grid size={3}>
                            <img alt={contact.name} src={contact.photo} style={{
                                width: '100px',
                                height: '100px',
                                objectFit: 'cover',
                                border: '1px solid #ccc',
                                borderRadius: '5%'
                            }}/>
                        </Grid>
                        <Grid size={9}><Typography variant='h5'
                                                   sx={{wordBreak: 'break-all'}}>{contact.name}</Typography></Grid>
                    </Grid>
                    <ModalContact isOpen={openModal} idSelectedContact={idSelected} handleClose={handleCloseModal}/>
                </Box>
            })}
            {!contactsLoading && contacts.length === 0 && 'There is no contacts yet.'}
        </Box>
    )
};

export default Contacts;