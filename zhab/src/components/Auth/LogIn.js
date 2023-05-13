import {Link} from 'react-router-dom';
import React from 'react';
import './LogIn.css'
import {TextField} from "@mui/material";
import Button from '@mui/material/Button';
import login from '../../images/login.png';

function LogIn() {

    return(
        <div>
            <div className='form'>
                    <div>
                        <h4 className='text_head'>Вход в ЖАБ Онлайн</h4>
                        <TextField className='login' id="outlined" color="success" label="Эл. почта" variant="outlined"/>
                        <TextField className='password' id="outlined" color="success" label="Пароль" variant="outlined"/>
                    </div>

                    <div>
                        <Link to= '/main'>
                            <Button className='btn_log'
                                    variant="contained"
                                    htmlType="submit" size="lg">
                                Войти
                            </Button>
                        </Link>

                    </div>

                </div>
            <h4 className="greet">Станьте клиентом ЖАБ не выходя из дома</h4>
            <img src={login} className="frog" alt={'frog'}/>
            <Link to= '/SignUp' style={{ textDecoration: 'none' }} className="link">
                <h4 className="text_link">Стать клиентом ></h4>
            </Link>

        </div>
    )

};
export default LogIn;