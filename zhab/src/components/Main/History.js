import React from "react";
import Navbar from "./Navbar";
import Wallet from "./Wallet";

function History() {

    return(
        <>
            <Navbar />
            <Wallet />
            <div className="main_form">
                <h4 className="text_main_form">История операций</h4>

            </div>
        </>

    )

};
export default History;