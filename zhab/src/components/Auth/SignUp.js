import {Link, Navigate} from 'react-router-dom';
import React, {useState} from 'react';
import './SignUp.css'
import {TextField} from "@mui/material";
import Button from '@mui/material/Button';
import axios from "axios";





function SignUp() {
    const [firstName, setFirstName] = useState(null);
    const [tel, setTel] = useState('');
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(null);
    const [username, setUsername] = useState('');
    const [test, setTest] = useState(0);
    const [isReg, setIsReg] = useState(false);

    async function SignUp(e) {
        const formData1 = new FormData()
        formData1.append('email_address', email)
        formData1.append('username', username)
        formData1.append('password', password)

        // Вызов API login
        e.preventDefault();
        await axios(`http://127.0.0.1:8000/auth/users/`, {
            method: 'POST',
            data: formData1,

        })
            .then((result) => {
                setTest(result.data.id);
                console.log(result.data.id);
                const aq = result.data.id;
                setIsReg(true);
                return aq;
            }).then(async (aq) => {
                    await axios(`http://127.0.0.1:8000/user/${aq}/`, {
                        method: 'GET',
                    }).then(async (result) => {
                            const formData = new FormData()
                            result.data.first_name = firstName;
                            result.data.email = email;
                            result.data.last_name = lastName;
                            result.data.phone = tel;
                            console.log(result.data);
                            await axios(`http://127.0.0.1:8000/user/${aq}/`, {
                                method: 'PUT',
                                data: result.data,
                            }).then( () =>{
                                alert('Успешная регистрация')
                                }

                            )
                        }
                    )
                }
            )
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        SignUp(e)
    }

    return(
        <div>
            <div className='sign_form'>
                <div>
                    <h4 className='sign_text'>Регистрация в ЖАБ Онлайн</h4>
                    <TextField value={firstName}
                               onChange={(e) => setFirstName(e.currentTarget.value)}
                               className='name' id="outlined" color="success"
                               label="Имя" variant="outlined"/>
                    <TextField value={lastName}
                               onChange={(e) => setLastName(e.currentTarget.value)}
                               className='surname' id="outlined" color="success"
                               label="Фамилия" variant="outlined"/>
                    <TextField value={username}
                               onChange={(e) => setUsername(e.currentTarget.value)}
                               className="username" id="outlined" color="success"
                               label="Логин" variant="outlined"/>
                    <TextField value={email} onChange={(e) => setEmail(e.currentTarget.value)}
                               className='name' id="outlined" color="success"
                               label="Эл. почта" variant="outlined"/>
                    <TextField value={tel} onChange={(e) => setTel(e.currentTarget.value)}
                               className='surname' id="outlined" color="success"

                               label="Телефон" variant="outlined"/>
                    <TextField value={password} onChange={(e) => setPassword(e.currentTarget.value)}
                               className='sign_password' id="outlined" color="success"
                               label="Пароль" variant="outlined"/>
                    <Link to= '/'>
                        <Button className="sign_btn"
                                onClick={(e) => {
                                    handleSubmit(e)
                                }}
                                variant="contained"
                                htmltype="submit">
                            Регистрация
                        </Button>
                    </Link>
                </div>

                <div>

                    <Link to= '/' style={{ textDecoration: 'none' }} className="sign_link">
                        <h4 className="sign_text_link">Вернуться ко входу</h4>
                    </Link>
                </div>

            </div>

        </div>
    )

};
export default SignUp;