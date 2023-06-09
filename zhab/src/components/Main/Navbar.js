import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import logo from '../../images/logo.png';
import './main.css'
import {Badge, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal} from "@mui/material";
import {Link, useMatch, useResolvedPath} from "react-router-dom";
import {LOGOUT} from "../AuthRedux/actions";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import CreditCardIcon from "@mui/icons-material/CreditCard";



export default function Navbar() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const [open, setOpen] = React.useState(false);
    const [declined_contracts, setDeclinedContracts] = useState([])
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch()
    const {
        pk
    } = useSelector((state) => state.user);


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    function GetDeclinedContracts() {
        fetch(`http://127.0.0.1:8000/contract/?status=3&auth_user=${pk}`, {
            method: "GET"})
            .then(response => response.json())
            .then((result) => {
                setDeclinedContracts(result);
                console.log(result);
            })
    }

    return (

        <>
            <AppBar className='navbarik' position="static" >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/*LOGOTIP*/}
                        <img src={logo} width={40} height={40} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/main"
                            sx={{
                                mr: 2,
                                display: {md: 'flex' },
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            ЖАБ
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Button sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <CustomLink to='/main' >
                                    Главная
                                </CustomLink>

                            </Button>
                            <Button sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <CustomLink to='/payments' >
                                    Платежи
                                </CustomLink>

                            </Button>


                        </Box>

                        {/*Notification and user*/}
                        <Box sx={{ flexGrow: 0 }}>
                            {/*Notification start*/}
                            <IconButton onClick={(e) => {
                                handleOpen()
                                GetDeclinedContracts()
                            }}sx={{color: '#718E67', height: '50px', width:'50px'}}
                                        size="large"
                                        aria-label="show 17 new notifications"
                                        color="inherit"
                            >

                                    <NotificationsIcon className="icon" />

                            </IconButton>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box className="notification">
                                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{
                                        fontWeight: 700,
                                        marginTop: '20px',
                                        marginLeft: '30px',
                                    }} >
                                        Все уведомления
                                    </Typography>
                                    <div style={{overflow:"scroll", height: "100px"}}>
                                    {
                                        Object.entries(declined_contracts).map(([id, contr]) => (
                                            <div key={id}>
                                                    <List>

                                                        <ListItem  disablePadding>
                                                                <ListItemIcon sx={{marginLeft: '27px', marginTop: '20px'}}>
                                                                    <img src={logo} width={40} height={40} />
                                                                    <ListItemText sx={{marginLeft: '10px'}}>Заявка на создание счета отклонена :(</ListItemText>

                                                                </ListItemIcon>





                                                        </ListItem>


                                                    </List>




                                            </div>
                                            )
                                        )
                                    }
                                    </div>

                                </Box>
                            </Modal>

                            {/*notification end*/}
                            <Tooltip title="Профиль">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color: '#718E67', height: '50px', width:'50px'}}
                                            size="large"
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true">
                                    <AccountCircle className="icon"/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >

                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography
                                        onClick={(e) => {
                                            dispatch({
                                                type:LOGOUT,
                                                payload: 'log'
                                            });}
                                        }
                                        sx={{color: '#718E67'}}
                                        textAlign="center"
                                        component="a"
                                        href="/"
                                        style={{ textDecoration: 'none' }}
                                        className="navlink">Выход</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
};
function CustomLink({to, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
    return (
        <li className = {isActive === to ? "active" : ""} style={{listStyleType: 'none'}}>
            <Link to={to} {...props} style={{ textDecoration: 'none' }} className="navlink">
                {children}
            </Link>
        </li>

    );
}