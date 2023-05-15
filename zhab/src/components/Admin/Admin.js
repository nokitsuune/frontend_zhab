import React, {useEffect, useState} from 'react';


import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import logo from "../../images/logo.png";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {Card, InputAdornment, List, ListItem, ListItemButton, ListItemText, TextField} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AppBar from "@mui/material/AppBar";
import SearchIcon from '@mui/icons-material/Search';
import CachedIcon from '@mui/icons-material/Cached';

import './Admin.css'
import {Col, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {Title} from "@mui/icons-material";
import Button from "@mui/material/Button";



function Admin() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [loading,setLoading] = useState(false);

    const [contract, setContract] = useState([])
    const [item, setItem] = useState([])
    const [items, setItems] = useState([])
    const [search, setSearch] = useState([]);


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    function getFilter (search) {
        if (search) {
            return `?search=${search}`
        }
        return ('')
    }
    function GetUser(userId) {

        fetch(`http://127.0.0.1:8000/user/${userId}/`, {
            method: "GET"})
            .then(response => response.json())
            .then((result) => {
                setItem(result);
                console.log(result);
            })


    }
    function GetContract() {

        fetch(`http://127.0.0.1:8000/contract/`, {
            method: "GET"})
            .then(response => response.json())
            .then((result) => {
                setContract(result);
                console.log(result);
            })


    }
    function Alert(userId) {
        if (contract.status ==1 && contract.auth_user == userId){
            return <Button
                color="error"
                variant="contained"
                size="lg">
                Заявка
            </Button>
        }
        else
        return



    }
    useEffect(() => {
        setLoading(true)
        fetch(`http://127.0.0.1:8000/user/${getFilter(search)}`, {
            method: "GET"})
            .then(response => response.json())
            .then((result) => {
                setItems(result);
                console.log(result);
            })
        setLoading(false)
        console.log(items)
    }, [search]);


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
                {/*Клиенты*/}
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
                    <div style={{marginTop: '45px'}}>
                        {
                            Object.entries(items).map(([id, client]) => (
                                <div key={id} >

                                    <List >
                                        <ListItem disablePadding>
                                            <ListItemButton
                                                onClick={(e) => {
                                                    GetUser(client.pk)
                                                    GetContract()
                                                    Alert(client.pk)
                                            }}>
                                                <ListItemText sx={{marginLeft:'25px'}} primary={client.username} />

                                            </ListItemButton>
                                        </ListItem>

                                    </List>
                                </div>
                            ))
                        }
                    </div>

                </div>
                {/*Основная информация о клиенте*/}
                <div className="info">
                    <h5 className="head_info">Основная информация</h5>
                    <div className='general'>
                        <div className='info_text'>
                            <div className='just'>Фамилия</div>

                            <div className='green_field'>
                                {item.last_name}
                            </div >
                        </div>

                        <div className='info_text' >
                            <div className='just'>Имя</div>

                            <div className='green_field'>
                                {item.first_name}
                            </div >
                        </div>
                        <div className='info_text'>
                            <div className='just'>Почта</div>

                            <div className='green_field'>
                                {item.email}
                            </div >
                        </div>
                        <div className='info_text'>
                            <div className='just'>Телефон</div>

                            <div className='green_field'>
                                {item.phone}
                            </div >
                        </div>







                    </div>

                    <h5 className="head_info">Карты</h5>

                    <div className='cards_admin'>

                    </div>

                    <h5 className="head_info">Счета</h5>
                    <div className='cards_admin'>

                    </div>



                </div>



            </div>



        </div>


    )
};
export default Admin;