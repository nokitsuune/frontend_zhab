import Button from "@mui/material/Button";
import * as React from "react";
import axios from "axios";
import {useEffect, useState} from "react";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {ADD_PK} from "../AuthRedux/actions";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import {useSelector} from "react-redux";
import {
    Alert,
    InputAdornment,
    InputLabel,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText, Modal,
    OutlinedInput,
    TextField
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Wallet() {
    const [loading, setLoading] = useState(false);

    const [contracts, setContracts] = useState([])
    const [cards, setCards] = useState([])
    const [acc, setAccount] = useState([])
    const [contract_of_card, setCardContract] = React.useState(0);
    const [cardCVC, setCardCVC] = React.useState(0);
    const [cardNum, setCardNum] = React.useState(0);
    const [cardPin, setCardPin] = React.useState(0);

    const [adm, setAdm] = useState([]) //для проверки на админа
    const [accNum, setAccNum] = useState(0)
    const {
        pk
    } = useSelector((state) => state.user);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useEffect(() => {
        fetch(`http://127.0.0.1:8000/user/${pk}/`, {
            method: "GET"
        })
            .then(response => response.json())
            .then((result) => {
                setAdm(result);
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
        fetch(`http://127.0.0.1:8000/card/`, {
            method: "GET"})
            .then(response => response.json())
            .then((result) => {
                setCards(result);
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

    async function SendKafkaMessage(authuser, account_num, balance) {
        try {
            const response = await fetch(`http://localhost:8000/grpc/?id_card=1&number_card=67890&cvc=20000&pin=456&contract_id=789`, {
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
    }


    async function CreateAccount(e) {
        const bool = await SendKafkaMessage(pk, accNum, 20000);
        if (bool){

            const formData = new FormData()


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
                    }).then(() => {
                        return alert('Заявка отправлена администратору!')

                    })
                }
            )

        }
        else {
            console.log('Не удалось создать счет')
            return alert('Не удалось создать заявку на открытие счета:(')
        }


    }

    const handleSubmit = (e) => {
        e.preventDefault()
        CreateAccount(e)
    }
    function SelectContractOfAccount(contrpk) {
        setCardContract(contrpk)
        console.log(contrpk)
    }
    function GetRandomCard() {

        fetch('http://127.0.0.1:8000/getRandomCard/', {
            method: "GET",
        }).then((response) => response.json()).then((resp) => {
            setCardNum(resp)
        })
        return cardNum


    }
    function GetRandomCVC() {

        fetch('http://127.0.0.1:8000/getRandomCVC/', {
            method: "GET",
        }).then((response) => response.json()).then((resp) => {
            setCardCVC(resp)
        })
        return cardCVC


    }
    function GetRandomPin() {

        fetch('http://127.0.0.1:8000/getRandomPin/', {
            method: "GET",
        }).then((response) => response.json()).then((resp) => {
            setCardPin(resp)
        })
        return cardPin


    }
    const handleSubmitCard = (e) => {
        e.preventDefault()
        CreateCard(e)
    }
    async function CreateCard(e) {
        const formData = new FormData()

        formData.append('number_card', cardNum)
        formData.append('cvc', cardCVC)
        formData.append('pin', cardPin)
        formData.append('contract', contract_of_card)


        e.preventDefault();
        await axios(`http://127.0.0.1:8000/card/`, {
            method: 'POST',
            data: formData,

        })

    }
    return (


        <div className="wallet">
            {/*Открытие Карты*/}
            <div>
                <h4 className='text_wal'>Карты</h4>
                <div className="cards">
                    {
                        Object.entries(contracts).map(([id, contr]) => (
                            Object.entries(acc).map(([schet_pk, schet]) =>(

                                Object.entries(cards).map(([card_pk, card]) => (

                                    <div key={card_pk}>
                                        {contr.pk === card.contract && contr.account === schet.pk &&
                                            <List>

                                                <ListItem  disablePadding>
                                                    <ListItemButton >
                                                        <ListItemIcon sx={{marginLeft: '27px'}}>
                                                            <CreditCardIcon sx={{color:'#718E67'}} className="icon" />

                                                        </ListItemIcon>

                                                        <ListItemText
                                                            secondary={card.number_card}/>
                                                        <br />
                                                    </ListItemButton>



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
                            )
                        )
                    }

                </div>
                <Button className="btn_add"
                        onClick={(e) => {
                            handleOpen()
                        }}
                        variant="text">+ Выпустить карту</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className="create_card">
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{
                            fontWeight: 700,
                            marginTop: '20px',
                            marginLeft: '25px',
                        }} >
                            Выберите счёт
                        </Typography>
                        <InputLabel style={{marginTop: '10px', marginLeft:'25px'}} htmlFor="outlined-adornment-amount">Счёт карты</InputLabel>




                        <div className="schet_spis">
                            {
                                Object.entries(contracts).map(([id, contr]) => (

                                        Object.entries(acc).map(([schet_pk, schet]) => (

                                            <div key={schet_pk}>
                                                {contr.status === 2 && contr.account === schet.pk &&


                                                    <List>

                                                        <ListItem disablePadding>
                                                            <ListItemButton onClick={(e) => {
                                                                SelectContractOfAccount(contr.pk)
                                                                GetRandomCard()
                                                                GetRandomCVC()
                                                                GetRandomPin()
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





                        <div style={{display: "flex", justifyContent: "right"}}>
                            <Button className="btn_payment"
                                    onClick={(e) => {handleSubmitCard(e)
                                        handleClose()
                                    }}
                                    variant="contained">Открыть карту</Button>
                        </div>

                    </Box>
                </Modal>
            </div>
            {/*Открытие СЧЕТА*/}
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