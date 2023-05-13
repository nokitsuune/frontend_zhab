import React from "react";
import Button from "@mui/material/Button";
import Navbar from "./Navbar";
import Wallet from "./Wallet";
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import PaymentsIcon from '@mui/icons-material/Payments';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {InputAdornment, InputLabel, Modal, OutlinedInput, TextField} from "@mui/material";
function Payments() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
        <>
            <Navbar />
            <Wallet />
            <div className="payment_form">
                <h4 className="text_main_form">Переводы</h4>
                {/*Buttons*/}
                <div style={{marginTop: '80px', marginLeft: '50px'}}>
                    <div>
                        <SyncAltIcon sx={{color: '#718E67'}} className="icon"/>
                        <Button
                            onClick={handleOpen}
                            sx={{color: 'white'}}
                            variant="text">Между своими счетами</Button>
                    </div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className="payment">
                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{
                                fontWeight: 700,
                                marginTop: '20px',
                                marginLeft: '30px',
                            }} >
                                Перевод
                            </Typography>
                            <TextField className="input_payment"
                                       type="number"
                                       color="success"
                                       id="outlined-basic"
                                       label="Номер карты"
                                       variant="outlined" />

                            <div>
                                <InputLabel style={{marginTop: '25px', marginLeft:'30px'}} htmlFor="outlined-adornment-amount">Сумма</InputLabel>
                                <OutlinedInput
                                    style={{
                                        width: '350px',
                                        left: '25px',}}
                                    id="outlined-adornment-amount"
                                    type="number"
                                    color="success"
                                    startAdornment={<InputAdornment position="start">₽</InputAdornment>}
                                    label="Сумма"

                                />
                            </div>
                            <div style={{display: "flex", justifyContent: "right"}}>
                                <Button className="btn_payment" variant="contained">Перевести</Button>
                            </div>

                        </Box>
                    </Modal>

                    <div>
                        <PaymentsIcon sx={{color: '#718E67'}} className="icon"/>
                        <Button onClick={handleOpen} sx={{color: 'white'}} variant="text">По телефону, карте, счету</Button>
                    </div>

                </div>

            </div>
        </>

    )

};
export default Payments;