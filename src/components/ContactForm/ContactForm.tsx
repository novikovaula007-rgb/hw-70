import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import {useAppDispatch, useAppSelect} from "../../hooks.ts";
import {editContact, selectContactsLoading} from "../../features/ContactsSlice/ContactsSlice.ts";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import {useEffect, useState} from "react";
import {addContact} from "../../features/ContactsSlice/ContactsSlice.ts";
import React from "react";
import {toast} from "react-toastify";
import type {IContactMutation} from "../../types";

const initialContactForm: IContactMutation = {
    name: '',
    email: '',
    phone: '',
    photo: ''
}

interface Props {
    isEditing?: boolean,
    editId?: string,
    initialValueForm?: IContactMutation,
}

const ContactForm: React.FC<Props> = ({isEditing, editId, initialValueForm = initialContactForm}) => {
    const initialPreviewURL = 'https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png'

    const loadingForm = useAppSelect(selectContactsLoading).loadingForm;
    const dispatch = useAppDispatch();

    const [form, setForm] = useState<IContactMutation>(initialValueForm);
    const [previewURL, setPreviewURL] = useState<string>(initialPreviewURL);


    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) => {
        if (typeof e === 'string') {
            setForm((prevState) => ({
                ...prevState,
                phone: e
            }))
        } else {
            const {name, value} = e.target;
            setForm((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    }

    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const contactForm = {...form, photo: previewURL};
        if (contactForm.phone.length < 7 || contactForm.phone.length > 15) {
            toast.error('The phone number you entered is incorrect. It is between 7 and 15 characters long.')
        }
        if (contactForm.name.trim() && contactForm.email.trim()) {
            if (isEditing && editId) {
                await dispatch(editContact({...contactForm, id: editId}))
            }
            await dispatch(addContact(contactForm))
        } else {
            toast.error('Fill all fields.')
        }
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setPreviewURL(form.photo);
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        }
    }, [form.photo]);

    return (
        <Box component="form" sx={{maxWidth: 450, mx: 'auto', mt: 4}} onSubmit={onSubmit}>
            <Typography variant='h4' sx={{textAlign: 'center', marginBottom: '15px'}}>
                {isEditing ? 'Edit' : 'Add'} contact
            </Typography>
            <Stack spacing={2} sx={{alignItems: 'center'}}>
                <TextField
                    label="Name"
                    name="name"
                    fullWidth
                    disabled={loadingForm}
                    onChange={onInputChange}
                    value={form.name}
                />

                <PhoneInput
                    country={'kg'}
                    disabled={loadingForm}
                    value={form.phone}
                    inputStyle={{width: '100%'}}
                    onChange={(phone) => onInputChange(phone)}
                />

                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    value={form.email}
                    disabled={loadingForm}
                    onChange={onInputChange}
                />

                <TextField
                    label="Photo"
                    name="photo"
                    type="photo"
                    fullWidth
                    disabled={loadingForm}
                    value={form.photo}
                    onChange={(e) => setForm({...form, photo: e.target.value})}
                />

                <Box>
                    <img
                        src={previewURL || initialPreviewURL}
                        alt="preview"
                        style={{
                            width: '150px',
                            height: '150px',
                            objectFit: 'cover',
                            border: '1px solid #ccc',
                            borderRadius: '5%'
                        }}
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = initialPreviewURL;
                            setPreviewURL(initialPreviewURL)
                        }}
                    />
                </Box>

                <Button
                    fullWidth
                    type='submit'
                    sx={{width: '50%', backgroundColor: '#171717', textAlign: 'center'}}
                    loading={loadingForm}
                    loadingPosition='end'
                    variant='contained'
                    endIcon={<SaveIcon/>}>
                    {isEditing ? 'Edit' : 'Add'}
                </Button>
            </Stack>
        </Box>
    );
};

export default ContactForm;