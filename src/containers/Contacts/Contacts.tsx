import {useAppDispatch, useAppSelect} from "../../hooks.ts";
import {fetchContacts, selectContacts, selectContactsLoading} from "../../features/ContactsSlice/ContactsSlice.ts";
import {useEffect} from "react";
import {Box, Grid, Typography} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";

const Contacts = () => {
    const contactsLoading = useAppSelect(selectContactsLoading).loadingFetchContacts;
    const contacts = useAppSelect(selectContacts);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchContacts())
    }, [dispatch])

    return (
        <Box>
            {contactsLoading && <Spinner/>}
            {!contactsLoading && contacts.length > 0 && contacts.map(contact => {
                return <Grid container spacing={3} key={contact.id} sx={{
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
                    <Grid size={9}><Typography variant='h5' sx={{wordBreak: 'break-all'}}>{contact.name}</Typography></Grid>
                </Grid>
            })}
            {!contactsLoading && contacts.length === 0 && 'There is no contacts yet.'}
        </Box>
    )
};

export default Contacts;