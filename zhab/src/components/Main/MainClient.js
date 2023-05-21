import * as React from 'react';

import frog from '../../images/frog.png';

import Navbar from "./Navbar";
import Wallet from "./Wallet";



function MainClient() {


    return (
        <div style={{ display: "-ms-flexbox"}}>
            <Navbar />
            <div>
                <div className="main_form">
                    <h4 className="text_main_form">Новости</h4>
                    <h6 style={{marginTop:'80px', marginLeft:'50px', marginRight: '20px'}}>If you see this TOAD in lefortovo park, you shouldn't lick it - and this is why</h6>
                    <div className="news_pic">
                        <img src={frog}/>
                    </div>



                </div>
                <div style={{flex: "none"}}>
                    <Wallet />
                </div>
                {/*Кошелек*/}

            </div>



        </div>


    )
};
export default MainClient;