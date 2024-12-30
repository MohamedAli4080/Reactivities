
import { Fragment, useEffect, useState } from 'react'

import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';
import { v4 as uuidv4 } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';


function App() {
  const [activities,setActivities]=useState<Activity[]>([]);
  const [selectedActivity,setSelectedActivity]=useState<Activity | undefined>(undefined)
  const [editMode,setEditMode]=useState(false);
  const [loading,setLoading]=useState(true);
  const [submitting,setSubmitting]=useState(false);

  useEffect(()=>{
    agent.Activities.list().then(response=> {
      let activities:Activity[]=[];
      response.forEach(activity=>{
        activity.date=activity.date.split('T')[0];
        activities.push(activity);
      })
    setActivities(activities);
    setLoading(false);
    
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
   setSubmitting(true);
   if (activity.id) {
      agent.Activities.update(activity).then(()=>{
      setActivities([...activities.filter(x=>x.id!=activity.id),activity]) 
      setEditMode(false);
      setSelectedActivity(activity);
      setSubmitting(false);
    })
   }else{
      activity.id=uuidv4();
      agent.Activities.create(activity).then(()=>{

        setActivities([...activities,activity]);
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      })
   }
 

  }
  function handleDeleteActivity(id:string){
    setSubmitting(true);
    agent.Activities.delele(id).then(()=>{
      setActivities([...activities.filter(x=>x.id!=id)]);
      setSubmitting(false);
    });
  }

  if(loading) return <LoadingComponent content='Laoding app'/>
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
     submitting={submitting} 
     />
    </Container>
    </>
  )
}

export default App
