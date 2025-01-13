import React, { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import ActivityList from './ActivityList'
import { UseStore } from '../../../stores/store'

import { observer } from 'mobx-react-lite'
import LoadingComponent from '../../../layout/LoadingComponent'




  export default observer (function ActivityDashboard() {
  const {activityStore}=UseStore();
const {loadingActivities,activityRegistery}=activityStore;

  useEffect(()=>{
    if(activityRegistery.size<=1)loadingActivities();
  
   
  },[activityStore])



  if(activityStore.loadingInitial) return <LoadingComponent content='Laoding app'/>
  return (
   <Grid>
    <Grid.Column width='10'>
      <ActivityList  />    
    </Grid.Column>
    <Grid.Column width='6'>
    <h2>Activity filter</h2>
    </Grid.Column>
   </Grid>
  )
})

