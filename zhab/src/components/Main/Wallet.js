import Button from "@mui/material/Button";
import * as React from "react";

export default function Wallet() {
    return(
        <div className="wallet">
            <div className='cards'>
                <h4 className='text_wal'>Кошелек</h4>
                <Button className="btn_add" variant="text">+ Выпустить карту</Button>
            </div>
            <div>
                <h4 className='text_check'>Счета</h4>
                <Button className="btn_add" variant="text">+ Открыть счет</Button>
            </div>


        </div>

    )
};