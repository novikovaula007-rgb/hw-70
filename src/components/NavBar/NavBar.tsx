import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

const NavBar = () => {
    return (
        <Box sx={{flexGrow: 1, zIndex: 10}}>
            <AppBar position='static' sx={{backgroundColor: '#171717'}}>
                <Toolbar>
                    <Typography variant='h6'
                                sx={{flexGrow: 1, textDecoration: 'none', color: 'white'}}
                                component={NavLink}
                                to='/contacts'>
                        Contacts
                    </Typography>

                    <Button color='inherit' to='/contacts/add' component={NavLink}>Add contact</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;