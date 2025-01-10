
import { Fragment, useEffect, useState } from 'react'

import axios from 'axios';
import {  Container } from 'semantic-ui-react';
import { Activity } from '../../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { UseStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


function App() {
  const {activityStore}=UseStore();


  useEffect(()=>{
    activityStore.loadingActivities();
   
  },[activityStore])



  if(activityStore.loadingInitial) return <LoadingComponent content='Laoding app'/>
  return (
    <>
    <NavBar />
    <Container style={{marginTop:'7em'}}>
      
     <ActivityDashboard />
    </Container>
    </>
  )
}

export default observer(App)
