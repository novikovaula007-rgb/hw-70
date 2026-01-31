import {Navigate, Route, Routes} from "react-router-dom";
import Contacts from "./containers/Contacts/Contacts.tsx";
import AddContact from "./containers/AddContact/AddContact.tsx";
import EditContact from "./containers/EditContact/EditContact.tsx";
import NotFoundPage from "./containers/NotFoundPage/NotFountPage.tsx";
import {Container} from "@mui/material";
import NavBar from "./components/NavBar/NavBar.tsx";

const App = () => {
    return (
        <>
            <NavBar/>
            <Container maxWidth='sm' sx={{mt: '20px'}}>
                <Routes>
                    <Route index element={<Navigate to="/contacts" replace/>}/>
                    <Route path='/contacts' element={<Contacts/>}/>
                    <Route path="/contacts/add" element={<AddContact/>}/>
                    <Route path="/contacts/:idContact/edit" element={<EditContact/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </Container>
        </>
    )
}

export default App
