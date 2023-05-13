import React from 'react';


import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import logo from "../../images/logo.png";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {InputAdornment, TextField} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AppBar from "@mui/material/AppBar";
import SearchIcon from '@mui/icons-material/Search';
import CachedIcon from '@mui/icons-material/Cached';

import './Admin.css'



function Admin() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <div>
            <AppBar className='navbarik' position="static" >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/*LOGOTIP*/}
                        <img src={logo} width={40} height={40}  alt={'logo'}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/admin"
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
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>

                        {/*Notification and user*/}
                        <Box sx={{ flexGrow: 0 }}>
                            {/*Notification start*/}
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
                                sx={{ mt: '45px' }}
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
            <div>
                <div className="info">
                    <h5 className="head_info">Основная информация</h5>
                    <div className='general'>

                    </div>

                    <h5 className="head_info">Карты</h5>
                    <div className='cards_admin'>

                    </div>

                    <h5 className="head_info">Счета</h5>
                    <div className='cards_admin'>

                    </div>



                </div>
                {/*Кошелек*/}
                <div className="wallet">
                    <div>
                        <h4 className='text_wal'>Клиенты</h4>
                        <IconButton style={{marginTop:'33px', left: '80%'}}>
                            <CachedIcon />
                        </IconButton>
                        <TextField
                            className="search"
                            id="filled-search"
                            color="success"
                            label="Поиск"
                            type="search"
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <IconButton>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>

                </div>


            </div>



        </div>


    )
};
export default Admin;