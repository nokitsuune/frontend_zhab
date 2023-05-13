import {Link} from 'react-router-dom';
import React from 'react';
import './SignUp.css'
import {TextField} from "@mui/material";
import Button from '@mui/material/Button';





function SignUp() {

    return(
        <div>
            <div className='sign_form'>
                <div>
                    <h4 className='sign_text'>Регистрация в ЖАБ Онлайн</h4>
                    <TextField className='name' id="outlined" color="success" label="Имя" variant="outlined"/>
                    <TextField className='surname' id="outlined" color="success" label="Фамилия" variant="outlined"/>
                    <TextField className='name' id="outlined" color="success" label="Эл. почта" variant="outlined"/>
                    <TextField className='surname' id="outlined" color="success" label="Телефон" variant="outlined"/>
                    <TextField className='sign_password' id="outlined" color="success" label="Пароль" variant="outlined"/>
                    <Link>
                        <Button className="sign_btn"
                                variant="contained"
                                htmlType="submit">
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