import React, {useState} from "react";
import Button from "@mui/material/Button";
import Navbar from "./Navbar";
import Wallet from "./Wallet";
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import PaymentsIcon from '@mui/icons-material/Payments';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
    FormControl,
    InputAdornment,
    InputLabel,
    List,
    ListItem, ListItemButton,
    ListItemText,
    Modal,
    OutlinedInput
} from "@mui/material";
import axios from "axios";
import {useSelector} from "react-redux";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MenuItem from "@mui/material/MenuItem";
import Select from '@mui/material/Select';

function Payments() {
    const [open, setOpen] = React.useState(false);
    const [contracts, setContracts] = useState([])
    const [all_contracts, setAllContracts] = useState([])
    const [all_accounts, setAllAccounts] = useState([])
    const [first_acc, setFirAcc] = React.useState(0);
    const [sum, setSum] = React.useState(0);
    const [sec_acc, setSecAcc] = React.useState(0);
    const [acc, setAccount] = useState([])
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {
        pk
    } = useSelector((state) => state.user);
    const [age, setAge] = React.useState('');

    const handleChange1 = (event) => {
        setAge(event.target.value);
    };


    function Pay() {
        fetch(`http://127.0.0.1:8000/contract/?status=2&auth_user=${pk}`, {
            method: "GET"})
            .then(response => response.json())
            .then((result) => {
                setContracts(result);
            })
        fetch(`http://127.0.0.1:8000/account/?authuser=${pk}`, {
            method: "GET"
        })
            .then(response => response.json())
            .then((result) => {
                setAccount(result);
            })
        fetch(`http://127.0.0.1:8000/contract/?status=2`, {
            method: "GET"})
            .then(response => response.json())
            .then((result) => {
                setAllContracts(result);
            })
        fetch(`http://127.0.0.1:8000/account/`, {
            method: "GET"
        })
            .then(response => response.json())
            .then((result) => {
                setAllAccounts(result);
            })


    }
    async function CreateTransaction(e) {

        const formData = new FormData()

        formData.append('sum_transaction', sum)
        formData.append('account1', first_acc)
        formData.append('account2', sec_acc)


        e.preventDefault();
        await axios(`http://127.0.0.1:8000/transaction/`, {
            method: 'POST',
            data: formData,

        }).then(async () => {
                await axios(`http://127.0.0.1:8000/account/${first_acc}/`, {
                    method: 'GET',
                }).then(async (result) => {
                        result.data.balance = result.data.balance-sum;

                        console.log(result.data);
                        await axios(`http://127.0.0.1:8000/account/${first_acc}/`, {
                            method: 'PUT',
                            data: result.data,
                        }).then(async () => {
                                await axios(`http://127.0.0.1:8000/account/${sec_acc}/`, {
                                    method: 'GET',
                                }).then(async (result) => {
                                        result.data.balance = result.data.balance += Number(sum);

                                        console.log(result.data);
                                        await axios(`http://127.0.0.1:8000/account/${sec_acc}/`, {
                                            method: 'PUT',
                                            data: result.data,
                                        })
                                    }
                                )
                            }
                        )
                    }
                )
            }
        )

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        CreateTransaction(e)
    }

    function SelectFirstAccount(schetpk) {
        setFirAcc(schetpk)
        console.log(schetpk)
    }

    function SelectSecondAccount(schetpk) {
        setSecAcc(schetpk)
        console.log(schetpk)
    }

    return(
        <>
            <Navbar />
            <Wallet />
            <div className="payment_form">
                <h4 className="text_main_form">Переводы</h4>
                {/*Buttons*/}
                <div style={{marginTop: '80px', marginLeft: '50px'}}>
                    <div>
                        <SyncAltIcon sx={{color: '#718E67'}} className="icon"/>
                        <Button
                            onClick={(e) => {
                                handleOpen()
                                Pay()
                        }}
                            sx={{color: 'white'}}
                            variant="text">По номеру счёта</Button>
                    </div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className="payment">
                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{
                                fontWeight: 700,
                                marginTop: '20px',
                                marginLeft: '25px',
                            }} >
                                Перевод
                            </Typography>
                            <InputLabel style={{marginTop: '10px', marginLeft:'25px'}} htmlFor="outlined-adornment-amount">Счёт списания</InputLabel>




                            <div className="schet_spis">
                                {
                                    Object.entries(contracts).map(([id, contr]) => (

                                            Object.entries(acc).map(([schet_pk, schet]) => (

                                                <div key={schet_pk}>
                                                    {contr.status === 2 && contr.account === schet.pk &&


                                                        <List>

                                                            <ListItem disablePadding>
                                                                <ListItemButton onClick={(e) => {
                                                                    SelectFirstAccount(schet.pk)
                                                                }}>
                                                                    <ListItemText sx={{marginLeft: '25px'}}
                                                                                  primary={schet.account_num}/>
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
                            <InputLabel style={{marginTop: '15px', marginLeft:'25px'}} htmlFor="outlined-adornment-amount">Счёт пополнения</InputLabel>

                            <div className="schet_spis">
                                {
                                    Object.entries(all_contracts).map(([id, allcontr]) => (

                                            Object.entries(all_accounts).map(([schet_id, allschet]) => (

                                                <div key={schet_id}>
                                                    {allcontr.status === 2 && allcontr.account === allschet.pk && allcontr.account !== first_acc &&

                                                        <List>

                                                            <ListItem disablePadding>
                                                                <ListItemButton onClick={(e) => {
                                                                    SelectSecondAccount(allschet.pk)
                                                                }}>
                                                                    <ListItemText sx={{marginLeft: '25px'}}
                                                                                  primary={allschet.account_num}/>
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



                            <div>
                                <InputLabel style={{marginTop: '15px', marginLeft:'25px'}} htmlFor="outlined-adornment-amount">Сумма</InputLabel>
                                <OutlinedInput
                                    style={{
                                        width: '350px',
                                        left: '25px',}}
                                    id="outlined-adornment-amount"
                                    type="number"
                                    color="success"
                                    value={sum} onChange={(e) => setSum(e.currentTarget.value)}
                                    startAdornment={<InputAdornment position="start">₽</InputAdornment>}
                                    label="Сумма"

                                />

                            </div>
                            <div style={{display: "flex", justifyContent: "right"}}>
                                <Button className="btn_payment"
                                        onClick={(e) => {handleSubmit(e)
                                            handleClose()
                                        }}
                                        variant="contained">Перевести</Button>
                            </div>

                        </Box>
                    </Modal>

                    {/*<div>
                        <PaymentsIcon sx={{color: '#718E67'}} className="icon"/>
                        <Button onClick={handleOpen} sx={{color: 'white'}} variant="text">По телефону, карте, счету</Button>
                    </div>*/}

                </div>

            </div>
        </>

    )

};
export default Payments;