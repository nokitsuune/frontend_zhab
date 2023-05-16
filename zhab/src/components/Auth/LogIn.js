import {Link, Navigate} from 'react-router-dom';
import React, {useState} from 'react';
import './LogIn.css'
import {TextField} from "@mui/material";
import Button from '@mui/material/Button';
import login from '../../images/login.png';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {ADD_PK, ADD_USER} from "../AuthRedux/actions";

function LogIn() {

    const dispatch = useDispatch()
    const{
        isSubmitted,
        token
    } = useSelector((state)=> state.user);

    const [user, setUser] = useState(0);
    const [username, setUsername]= useState('');
    const [password, setPassword]=useState('');
    async function Authorization1(e){
        const formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)
        console.log(password,username)

        //setUsername(JSON.stringify(username));
        // Вызов API login
        e.preventDefault();
        await axios(`http://127.0.0.1:8000/auth/token/login/`, {
            method: 'POST',
            data: formData,
        })
            .then((result) => {
                dispatch({
                    type:ADD_USER,
                    payload: {token: result.data.auth_token, username:username }
                })
                return result;
            })
            .then(async (result) => {
                await axios(`http://127.0.0.1:8000/auth/users/me/`, {
                    method: 'GET',
                    headers:{
                        "Authorization": "Token "+result.data.auth_token,
                    }
                })
                    .then((result) => {
                        setUser(result.data.id);
                        console.log(result.data);
                        console.log(user);
                        dispatch({
                            type:ADD_PK,
                            payload: result.data
                        })

                    })
            }
            )
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        Authorization1(e);

    };


    return(
        <div>

                <div className='form'>

                    {token !== '' ?
                        <div><Navigate to={username === 'admin' ? '/admin': "/main"}/></div> :
                        <div>
                            <h4 className='text_head'>Вход в ЖАБ Онлайн</h4>
                            <TextField value={username} onChange={(e) => setUsername(e.currentTarget.value)}
                                       className='login'
                                       id="outlined"
                                       color="success"
                                       label="Логин" variant="outlined"/>
                            <TextField value={password} onChange={(e) => setPassword(e.currentTarget.value)}
                                       className='password'
                                       id="outlined"
                                       color="success"
                                       label="Пароль"
                                       variant="outlined"/>
                        </div>
                    }



                    <div>
                        {username === 'admin' ?
                            <Link to='/admin'>
                                <Button onClick={(e) => handleSubmit(e)}
                                        className='btn_log'
                                        variant="contained"
                                        htmlType="submit" size="lg">
                                    Админ
                                </Button>
                            </Link>
                            :
                            <Link to='/main'>
                                <Button onClick={(e) => handleSubmit(e)}
                                        className='btn_log'
                                        variant="contained"
                                        htmlType="submit" size="lg">
                                    Войти
                                </Button>
                            </Link>
                        }


                    </div>

                </div>
                <h4 className="greet">Станьте клиентом ЖАБ не выходя из дома</h4>
                <img src={login} className="frog" alt={'frog'}/>
                <Link to= '/SignUp' style={{textDecoration: 'none'}} className="link">
                <h4 className="text_link">Стать клиентом ></h4>
                </Link>


        </div>
    )

};
export default LogIn;