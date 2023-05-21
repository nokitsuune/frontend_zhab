import Button from "@mui/material/Button";
import * as React from "react";
import axios from "axios";
import {useEffect, useState} from "react";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {ADD_PK} from "../AuthRedux/actions";
import {useSelector} from "react-redux";
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField} from "@mui/material";

export default function Wallet() {
    const [loading, setLoading] = useState(false);

    const [contracts, setContracts] = useState([])
    const [acc, setAccount] = useState([])
    const [accNum, setAccNum] = useState(0)
    const {
        pk
    } = useSelector((state) => state.user);


    useEffect(() => {
        fetch(`http://127.0.0.1:8000/user/${pk}/`, {
            method: "GET"
        })
            .then(response => response.json())
            .then((result) => {
                console.log(result);
                console.log(pk)
            })
        fetch(`http://127.0.0.1:8000/contract/?status=2&auth_user=${pk}`, {
            method: "GET"})
            .then(response => response.json())
            .then((result) => {
                setContracts(result);
                console.log(result);
            })
        fetch(`http://127.0.0.1:8000/account/?authuser=${pk}`, {
            method: "GET"
        })
            .then(response => response.json())
            .then((result) => {
                setAccount(result);
                console.log(result);
            })
        if (GetRandomAccount() === 0) {
            fetch('http://127.0.0.1:8000/getRandomAccount/', {
                method: "GET",
            }).then((response) => response.json()).then((resp) => {
                setAccNum(resp)
            })
        }
        setLoading(false)


    }, [pk]);

    function GetRandomAccount() {

        fetch('http://127.0.0.1:8000/getRandomAccount/', {
            method: "GET",
        }).then((response) => response.json()).then((resp) => {
            setAccNum(resp)
        })
        return accNum


    }

    /*async function SendKafkaMessage(authuser, account_num, balance) {
        try {
            const response = await fetch(`http://localhost:8000/grpc/?id_card=${authuser}&number_card=${account_num}&cvc=${balance}&pin=456&contract_id=789`, {
                method: "GET",
            });
            console.log('Status:', response.status);
            if (response.status === 500) {
                throw Error('Internal server error');
                // или возвращать что-то другое в зависимости от вашей потребности
            }
            return true;
        } catch (error) {
            console.log('Error:', error);
            return false;
        }
    }*/

    async function CreateAccount(e) {
        // const bool = await SendKafkaMessage(pk + 1, GetRandomAccount(), 20000);
        /*if (bool){*/
            const formData = new FormData()

            console.log(GetRandomAccount())

            formData.append('authuser', pk)
            setAccNum(GetRandomAccount())
            formData.append('account_num', accNum)
            formData.append('balance', 20000)


            e.preventDefault();
            await axios(`http://127.0.0.1:8000/account/`, {
                method: 'POST',
                data: formData,

            }).then(async (result) => {
                    console.log(result.data)
                    const formDataContract = new FormData()
                    formDataContract.append('status', 1)
                    console.log(result.data.pk)
                    formDataContract.append('account', result.data.pk)
                    formDataContract.append('auth_user', pk)
                    await axios(`http://127.0.0.1:8000/contract/`, {
                        method: 'POST',
                        data: formDataContract,
                    })
                }
            )

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        CreateAccount(e)
    }
    return (
        <div className="wallet">
            <div className='cards'>
                <h4 className='text_wal'>Кошелек</h4>
                <Button className="btn_add"
                        variant="text">+ Выпустить карту</Button>
            </div>
            <div>
                <h4 className='text_check'>Счета</h4>
                <div className="accounts">
                    {
                        Object.entries(contracts).map(([id, contr]) => (

                                Object.entries(acc).map(([schet_pk, schet]) => (

                                    <div key={schet_pk}>
                                        {contr.status === 2 && contr.account === schet.pk &&


                                            <List>

                                                <ListItem sx={{marginLeft: '45px'}} disablePadding>
                                                    <ListItemIcon>
                                                        <AccountBalanceWalletIcon sx={{color:'#718E67'}} className="icon" />

                                                    </ListItemIcon>

                                                    <ListItemText
                                                                  secondary={schet.account_num}/>
                                                    <br />


                                                </ListItem>
                                                <ListItem sx={{marginLeft: '85px'}}>
                                                    <h6>{schet.balance} ₽</h6>

                                                </ListItem>

                                            </List>


                                        }

                                    </div>
                                ))
                            )
                        )
                    }

                </div>

                <Button className="btn_add"
                        onClick={(e) => {
                            handleSubmit(e)
                        }}
                        variant="text">+ Открыть счет</Button>
            </div>


        </div>

    )
};