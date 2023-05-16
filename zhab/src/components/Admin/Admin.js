import React, {useEffect, useState} from 'react';


import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import logo from "../../images/logo.png";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {Card, InputAdornment, List, ListItem, ListItemButton, ListItemText, Modal, TextField} from "@mui/material";
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
import {useDispatch, useSelector} from "react-redux";
import {Title} from "@mui/icons-material";
import Button from "@mui/material/Button";
import axios from "axios";
import {LOGOUT} from "../AuthRedux/actions";



function Admin() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [loading,setLoading] = useState(false);
    const [req, setReq] = useState(0)
    const [selectedClient, setSelectedClient] = useState(0)
    const [contract, setContract] = useState([])
    const [acc, setAccount] = useState([])
    const [contracts, setContracts] = useState([])
    const [item, setItem] = useState([])
    const [items, setItems] = useState([])
    const [search, setSearch] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch()

    const {
        isSubmitted,
        token,
        username,
        pk
    } = useSelector((state) => state.user);


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    function getFilter (search) {
        if (search) {
            return `?search=${search}`
        }
        return ('')
    }
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/user/${pk + 1}/`, {
            method: "GET"
        })
            .then(response => response.json())
            .then((result) => {
                console.log(result);
                console.log(pk + 1)
            })
        setLoading(true)
        fetch(`http://127.0.0.1:8000/user/${getFilter(search)}`, {
            method: "GET"})
            .then(response => response.json())
            .then((result) => {
                setItems(result);
                console.log(result);
            })
        setLoading(false)
        AdminIsOnline()
        console.log(items)
    }, [search]);

    async function AcceptRequest(contrId) {
        await axios(`http://127.0.0.1:8000/contract/${contrId}/`, {
            method: 'GET',
        }).then(async (result) => {
                result.data.status = 2;
                console.log(result.data);
                await axios(`http://127.0.0.1:8000/contract/${contrId}/`, {
                    method: 'PUT',
                    data: result.data,
                })
            }
        )

        /*fetch(`http://127.0.0.1:8000/contract/${contrId}/`, {
            method: "GET"})
            .then(response => response.json())
            .then(async (result) => {

                result.status = 2;
                await axios(`http://127.0.0.1:8000/contract/${contrId}/`, {
                    method: 'PUT',
                    data: result.data,
                })
            })*/



    }
    async function DeclineRequest(contrId) {
        await axios(`http://127.0.0.1:8000/contract/${contrId}/`, {
            method: 'GET',
        }).then(async (result) => {
                result.data.status = 3;
                console.log(result.data);
                await axios(`http://127.0.0.1:8000/contract/${contrId}/`, {
                    method: 'PUT',
                    data: result.data,
                })
            }
        )

        /*fetch(`http://127.0.0.1:8000/contract/${contrId}/`, {
            method: "GET"})
            .then(response => response.json())
            .then(async (result) => {

                result.status = 2;
                await axios(`http://127.0.0.1:8000/contract/${contrId}/`, {
                    method: 'PUT',
                    data: result.data,
                })
            })*/



    }
    /*async function AcceptRequest1(reqId) {

        const formData = new FormData()

        formData.append('authuser', pk+1)
        formData.append('account_num', GetRandomAccount())
        formData.append('balance', 20000)


        e.preventDefault();
        await axios(`http://127.0.0.1:8000/contract/`, {
            method: 'PUT',
            data: formData,

        })
    }*/

    function GetUser(userId) {

        fetch(`http://127.0.0.1:8000/user/${userId}/`, {
            method: "GET"})
            .then(response => response.json())
            .then((result) => {
                setItem(result);
                console.log(result);
            })


    }

    function AdminIsOnline() {

        fetch(`http://127.0.0.1:8000/online/`, {
            method: "GET"})
            .then(response => response.json())
            .then((result) => {
                console.log(result);
            })


    }
    function GetContracts(userId) {

        fetch(`http://127.0.0.1:8000/contract/?search=${userId}`, {
            method: "GET"})
            .then(response => response.json())
            .then((result) => {
                setContracts(result);
                console.log(result);
            })


    }
    function GetAccount(userId) {

        fetch(`http://127.0.0.1:8000/account/?search=${userId}`, {
            method: "GET"})
            .then(response => response.json())
            .then((result) => {
                setAccount(result);
                console.log(result);
            })


    }
    function GetContract(contrId) {

        fetch(`http://127.0.0.1:8000/contract/${contrId}`, {
            method: "GET"})
            .then(response => response.json())
            .then((result) => {
                setContract(result);
                console.log(result);
            })


    }
    function SetRequest(contrId){
        setReq(contrId)
        console.log(contrId)

    }
    function SetClient(userId){
        setSelectedClient(userId)
        console.log(userId)

    }
    function Alert() {

        if (contract.status ===1){
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
                                        onClick={(e) => {
                                            dispatch({
                                                type:LOGOUT,
                                                payload: 'log'
                                            });}
                                        }
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
                        {/*ОБНОВИТЬ*/}
                        <IconButton
                            onClick={(e) => {
                                AdminIsOnline()
                                GetContracts(selectedClient)
                                GetAccount(selectedClient)
                            }}
                            style={{marginTop:'33px', left: '80%'}}>
                            <CachedIcon />
                        </IconButton>
                        {/*ПОИСК*/}
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
                                        <IconButton >
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>
                    {/*СПИСОК КЛИЕНТОВ*/}
                    <div style={{marginTop: '45px', overflow:"scroll"}}>
                        {
                            Object.entries(items).map(([id, client]) => (
                                <div key={id} >

                                    <List >
                                        <ListItem disablePadding>
                                            <ListItemButton
                                                onClick={(e) => {
                                                    AdminIsOnline()
                                                    GetUser(client.pk)
                                                    GetContracts(client.pk)
                                                    GetAccount(client.pk)
                                                    setSelectedClient(client.pk)

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
                                Заявка на открытие счета
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2, fontWeight: 700,
                                marginTop: '20px',
                                marginLeft: '30px',
                                marginBottom: '20px',

                            }}>
                                <Button
                                    onClick={(e) => {
                                        AcceptRequest(req)
                                        AdminIsOnline()
                                        handleClose()
                                        GetContracts(selectedClient)
                                        GetAccount(selectedClient)
                                    }}
                                    color="success"
                                    variant="contained"
                                    size="lg">
                                    Принять
                                </Button>
                                <Button
                                    onClick={(e) => {
                                        DeclineRequest(req)
                                        AdminIsOnline()
                                        handleClose()
                                        GetContracts(selectedClient)
                                        GetAccount(selectedClient)
                                    }}
                                    sx={{marginLeft: '30px'}}

                                    color="error"
                                    variant="contained"
                                    size="lg">
                                    Отказ
                                </Button>
                            </Typography>

                        </Box>
                    </Modal>
                    {/*ЗАЯВКА*/}
                    <h5 className="head_info">Счета</h5>
                    {
                        Object.entries(contracts).map(([id, contr]) => (
                            <div key={id} >

                                {contr.status===1 &&
                                    <Button
                                        onClick={(e) => {
                                            handleOpen()
                                            SetRequest(contr.pk)
                                            SetClient(contr.auth_user)
                                            AdminIsOnline()
                                        }}
                                        color="error"
                                        variant="contained"
                                        size="lg">
                                        Заявка
                                    </Button>

                                }

                            </div>
                        ))
                    }


                    {/*НОМЕРА СЧЕТОВ*/}
                    <div className='cards_admin'>
                        {
                            Object.entries(contracts).map(([id, contr]) => (

                                Object.entries(acc).map(([schet_pk, schet]) => (

                                    <div key={schet_pk} >
                                        {contr.status===2 && contr.account=== schet.pk &&


                                            <List>

                                                <ListItem disablePadding>
                                                    <ListItemButton>
                                                        {/*{GetAccount(contr.account)}*/}

                                                            <ListItemText sx={{marginLeft:'25px'}} primary={schet.account_num} />




                                                    </ListItemButton>
                                                </ListItem>

                                            </List>



                                        }

                                    </div>
                                ))
                            )
                            )
                        }

                    </div>



                </div>



            </div>



        </div>


    )
};
export default Admin;