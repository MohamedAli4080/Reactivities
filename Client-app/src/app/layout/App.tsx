
import { Fragment, useEffect, useState } from 'react'

import {  Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import {Outlet, useLocation} from "react-router-dom" 
import Homepage from '../features/Home/HomePage';

function App() {
  const loction=useLocation();
  return (
    
    <>
    {(loction.pathname==='/')?<Homepage/> :
      <>

    <NavBar />
    <Container style={{marginTop:'7em'}}>
      <Outlet/>    
    </Container>
      </>

    }
    </>
  )
}

export default observer(App)
