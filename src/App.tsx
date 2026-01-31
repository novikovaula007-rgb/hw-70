import {Navigate, Route, Routes} from "react-router-dom";
import Contacts from "./containers/Contacts/Contacts.tsx";
import AddContact from "./containers/AddContact/AddContact.tsx";
import EditContact from "./containers/EditContact/EditContact.tsx";
import NotFoundPage from "./containers/NotFoundPage/NotFountPage.tsx";

const App = () => {
  return (
    <>
      <Routes>
          <Route index element={<Navigate to="/contacts" replace/>}/>
          <Route path='/contacts' element={<Contacts/>}/>
          <Route path="/contacts/add" element={<AddContact/>}/>
          <Route path="/contacts/:idContact/edit" element={<EditContact/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </>
  )
}

export default App
