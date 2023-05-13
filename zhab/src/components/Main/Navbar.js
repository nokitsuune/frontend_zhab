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
import {Badge, Modal} from "@mui/material";
import {Link, useMatch, useResolvedPath} from "react-router-dom";



export default function Navbar() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

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
                            <Button sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <CustomLink to='/history' >
                                    История
                                </CustomLink>

                            </Button>

                        </Box>

                        {/*Notification and user*/}
                        <Box sx={{ flexGrow: 0 }}>
                            {/*Notification start*/}
                            <IconButton onClick={handleOpen} sx={{color: '#718E67', height: '50px', width:'50px'}}
                                        size="large"
                                        aria-label="show 17 new notifications"
                                        color="inherit"
                            >
                                <Badge badgeContent={2} color="error">
                                    <NotificationsIcon className="icon" />
                                </Badge>
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
                                    <Typography id="modal-modal-description" sx={{ mt: 2, fontWeight: 700,
                                        marginTop: '20px',
                                        marginLeft: '30px',
                                        marginBottom: '20px',

                                    }}>
                                        Пока уведомлений нет
                                    </Typography>
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