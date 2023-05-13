import React from 'react';
import {Route, Routes} from "react-router-dom";
import SignUp from './components/Auth/SignUp'
import LogIn from './components/Auth/LogIn'
import Admin from './components/Admin/Admin'
import MainClient from './components/Main/MainClient'
import {createTheme, ThemeProvider} from "@mui/material";
import Payments from "./components/Main/Payments";
import History from "./components/Main/History";


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const App = () => {

  return (
      <ThemeProvider theme={darkTheme}>
            <Routes>
                <Route path='/' element={ <LogIn/>}></Route>
                <Route path='/SignUp' element={ <SignUp/>}></Route>
                <Route path='/Admin' element={ <Admin/>}></Route>
                <Route path='/main' element={ <MainClient/>}></Route>
                <Route path='/payments' element={ <Payments/>}></Route>
                <Route path='/history' element={ <History/>}></Route>

            </Routes>
      </ThemeProvider>
  )
}

export default App;
