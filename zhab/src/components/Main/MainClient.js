import * as React from 'react';

import frog from '../../images/frog.png';

import Navbar from "./Navbar";
import Wallet from "./Wallet";



function MainClient() {


    return (
        <div>
            <Navbar />
            <div>
                <div className="main_form">
                    <h4 className="text_main_form">Новости</h4>
                    <h6 style={{marginTop:'80px', marginLeft:'50px'}}>If you see this TOAD in lefortovo park, you shouldn't lick it - and this is why</h6>
                    <div className="news_pic">
                        <img src={frog}/>
                    </div>



                </div>
                {/*Кошелек*/}
                <Wallet />
            </div>



        </div>


    )
};
export default MainClient;