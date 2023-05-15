import Button from "@mui/material/Button";
import * as React from "react";
import axios from "axios";
import {useEffect, useState} from "react";
import {ADD_PK} from "../AuthRedux/actions";
import {useSelector} from "react-redux";
import {Title} from "@mui/icons-material";

export default function Wallet() {
    const [userId, setUserId] = useState([])
    const [loading,setLoading] = useState(false);
    const [accNum, setAccNum] = useState(0)
    const [accId, setAccId] = useState(0)
    const{
        isSubmitted,
        token,
        username,
        pk
    } = useSelector((state)=> state.user);


    useEffect(() => {
        if (GetRandomAccount()===0){
            fetch('http://127.0.0.1:8000/getRandomAccount/', {
                method: "GET",
            }).then((response) => response.json()).then((resp) => {
                setAccNum(resp)
            })
        }

        setAccId(pk+1)

    }, [ accId ]);
    useEffect(() => {

        fetch(`http://127.0.0.1:8000/user/${pk+1}/`, {
            method: "GET"})
            .then(response => response.json())
            .then((result) => {
                setUserId(result);
                console.log(result);
                console.log(pk+1)
            })


    }, [pk]);

    function GetRandomAccount() {

        fetch('http://127.0.0.1:8000/getRandomAccount/', {
            method: "GET",
        }).then((response) => response.json()).then((resp) => {
            setAccNum(resp)
        })
        return accNum


    }
    async function CreateAccount(e) {


        const formData = new FormData()

        console.log(GetRandomAccount())

            formData.append('authuser', pk+1)
            formData.append('account_num', GetRandomAccount())
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
                setAccId(result.data.pk)
                formDataContract.append('account', accId)
                formDataContract.append('auth_user', pk+1)
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
    return(
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