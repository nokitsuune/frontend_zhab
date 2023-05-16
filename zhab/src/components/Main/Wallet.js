import Button from "@mui/material/Button";
import * as React from "react";
import axios from "axios";
import {useEffect, useState} from "react";
import {ADD_PK} from "../AuthRedux/actions";
import {useSelector} from "react-redux";
import {Title} from "@mui/icons-material";

export default function Wallet() {
    const [userId, setUserId] = useState([])
    const [loading, setLoading] = useState(false);
    const [accNum, setAccNum] = useState(0)
    const [accId, setAccId] = useState(0)
    const {
        isSubmitted,
        token,
        username,
        pk
    } = useSelector((state) => state.user);


    useEffect(() => {
        if (GetRandomAccount() === 0) {
            fetch('http://127.0.0.1:8000/getRandomAccount/', {
                method: "GET",
            }).then((response) => response.json()).then((resp) => {
                setAccNum(resp)
            })
        }


    }, [pk]);
    useEffect(() => {

        fetch(`http://127.0.0.1:8000/user/${pk + 1}/`, {
            method: "GET"
        })
            .then(response => response.json())
            .then((result) => {
                setUserId(result);
                console.log(result);
                console.log(pk + 1)
            })


    }, [pk]);

    async function GetRandomAccount() {

        fetch('http://127.0.0.1:8000/getRandomAccount/', {
            method: "GET",
        }).then((response) => response.json()).then((resp) => {
            setAccNum(resp)
        })
        return accNum


    }

    async function SendKafkaMessage(authuser, account_num, balance) {
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
    }

    async function CreateAccount(e) {
        const account = await GetRandomAccount()
        const bool = await SendKafkaMessage(pk + 1, account, 20000);
        if (bool){
            const formData = new FormData()

            console.log(await GetRandomAccount())

            formData.append('authuser', pk + 1)
            formData.append('account_num', account)
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
                    formDataContract.append('auth_user', pk + 1)
                    await axios(`http://127.0.0.1:8000/contract/`, {
                        method: 'POST',
                        data: formDataContract,
                    })
                }
            )
        }
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
                <Button className="btn_add"
                        onClick={(e) => {
                            handleSubmit(e)
                        }}
                        variant="text">+ Открыть счет</Button>
            </div>


        </div>

    )
};