import {Box, Button, CircularProgress, Dialog, DialogContent, Grid, IconButton, Stack, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import PhoneIcon from '@mui/icons-material/Phone';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import React, {useEffect} from "react";

import {
    fetchSelectedContact,
    selectContactsLoading,
    selectSelectedContact,
    deleteContact, fetchContacts
} from "../../features/ContactsSlice/ContactsSlice.ts";
import {useAppDispatch, useAppSelect} from "../../hooks.ts";
import {NavLink} from "react-router-dom";

interface Props {
    isOpen: boolean,
    idSelectedContact: string | null,
    handleClose: () => void,
}

const ModalContact: React.FC<Props> = ({isOpen, handleClose, idSelectedContact}) => {
    const modalLoading = useAppSelect(selectContactsLoading).loadingModalContact;
    const dispatch = useAppDispatch();
    const selectedContact = useAppSelect(selectSelectedContact);

    const deleteSelectedContact = async () => {
        if (idSelectedContact) {
            await dispatch(deleteContact(idSelectedContact));
            await dispatch(fetchContacts());
            handleClose();
        }
    }

    useEffect(() => {
        if (idSelectedContact) {
            dispatch(fetchSelectedContact(idSelectedContact));
        }
    }, [dispatch, idSelectedContact])

    if (!idSelectedContact || !selectedContact) return null;

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            fullWidth
            maxWidth="xs"
            slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    }
                }
            }}
            PaperProps={{
                elevation: 0,
                sx: {
                    borderRadius: '8px',
                    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #ccc',
                }
            }}
        >
            <IconButton
                onClick={handleClose}
                sx={{position: 'absolute', right: 8, top: 8}}
            >
                <CloseIcon/>
            </IconButton>

            <DialogContent sx={{mt: 2}}>
                {modalLoading && <CircularProgress/>}
                {!modalLoading && selectedContact && (<Box>
                    <Box display="flex" gap={3} alignItems="flex-start" mb={3}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <img alt={selectedContact.name} src={selectedContact.photo} style={{
                                width: '120px',
                                height: '120px',
                                objectFit: 'cover',
                                border: '1px solid #ccc',
                                borderRadius: '5%'
                            }}/>
                        </Box>
                        <Box>
                            <Typography variant="h5" fontWeight="bold" sx={{mb: '10px', wordBreak: 'break-all', width: '200px'}}>
                                {selectedContact.name}
                            </Typography>

                            <Stack direction="row" spacing={1} alignItems="center" sx={{mb: '10px'}}>
                                <PhoneIcon fontSize="small"/>
                                <Typography>
                                    {selectedContact.phone}
                                </Typography>
                            </Stack>

                            <Stack direction="row" spacing={1} alignItems="center">
                                <EmailIcon fontSize="small"/>
                                <Typography>
                                    {selectedContact.email}
                                </Typography>
                            </Stack>
                        </Box>
                    </Box>

                    <Grid spacing={2} container>
                        <Grid size={6}>
                            <NavLink to={`/contacts/${idSelectedContact}/edit`}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    startIcon={<EditIcon/>}>
                                    Edit
                                </Button>
                            </NavLink>
                        </Grid>
                        <Grid size={6}>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="error"
                                startIcon={<DeleteIcon/>}
                                onClick={deleteSelectedContact}
                            >
                                Delete
                            </Button>
                        </Grid>

                    </Grid>
                </Box>)}
                {!modalLoading && (!idSelectedContact || !selectedContact) && 'There is no contact with this ID yet.'}

            </DialogContent>
        </Dialog>
    );
};

export default ModalContact;