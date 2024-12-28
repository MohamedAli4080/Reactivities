
import { Fragment, useEffect, useState } from 'react'

import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [activities,setActivities]=useState<Activity[]>([]);
  const [selectedActivity,setSelectedActivity]=useState<Activity | undefined>(undefined)
  const [editMode,setEditMode]=useState(false);

  useEffect(()=>{
    axios.get<Activity[]>('http://localhost:5000/api/Activity').then(response=> {
    setActivities(response.data)
    
    })

  },[])


  function handlSelectedActivity(id:string){
    setSelectedActivity(activities.find(x=>x.id===id));
  }
  function handlCancelSelectedActivity(){

    setSelectedActivity(undefined);
  }
  
  function handleFormOpen(id:string){
    id?handlSelectedActivity(id):handlCancelSelectedActivity();
    setEditMode(true);
  }
  function handleFormClose(){   
    setEditMode(false);
  }
  function HandleCreateOrUpdateActivity(activity:Activity){
    activity.id?
    setActivities([...activities.filter(x=>x.id!=activity.id),activity])
    :
    setActivities([...activities,{...activity,id:uuidv4()}]);
    setEditMode(false);
    setSelectedActivity(activity);

  }
  function handleDeleteActivity(id:string){
      setActivities([...activities.filter(x=>x.id!=id)]);
  }
  return (
    <>
    <NavBar  openForm={handleFormOpen}/>
    <Container style={{marginTop:'7em'}}>
     <ActivityDashboard 
     activities={activities} 
     selectedActivity={selectedActivity}
     selectActivity={handlSelectedActivity}
     cancelSelectedActivity={handlCancelSelectedActivity} 
     editMode={editMode}         
     openForm={handleFormOpen}         
     closeForm={handleFormClose} 
     createOrEdit={HandleCreateOrUpdateActivity}   
     deleteActivity={handleDeleteActivity}     
     />
    </Container>
    </>
  )
}

export default App
