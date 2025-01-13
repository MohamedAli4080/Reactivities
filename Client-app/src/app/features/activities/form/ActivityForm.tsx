import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { UseStore } from '../../../stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Activity } from '../../../../models/activity';
import LoadingComponent from '../../../layout/LoadingComponent';
import {v4 as uuid} from 'uuid';


export default observer(function ActivityForm() {
const {activityStore}=UseStore();
const {selectedActivity,createActivity,updateActivity,loading,loadActitivty,loadingInitial}=activityStore
const navigate=useNavigate()
const {id}=useParams();
const [activity,setActivity ]=useState<Activity>({

  id: '',
  title: '',
  date: '',
  description: '',
  category: '',
  city: '',
  venue: '',
})

useEffect(() => {
 if(id) loadActitivty(id).then(activity=>setActivity(activity!))
},[id,loadActitivty])


  function handlInputChange(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ){ 
   const {name,value}= event.target;
    setActivity({...activity,[name]:value})
  }
  function handlSubmit(){
    if (!activity.id) {
      activity.id=uuid()
      createActivity(activity).then(()=> navigate(`/activities/${activity.id}`))
    }else{
      updateActivity(activity).then(()=> navigate(`/activities/${activity.id}`))
    }
    
  }

  if (loadingInitial)return <LoadingComponent content='loading activity ...'/>
  return (
    <Segment clearing>
        <Form onSubmit={handlSubmit} autoComplete='off'>
            <Form.Input placeholder='Title'           name='title'        value={activity.title}        onChange={handlInputChange} />
            <Form.TextArea placeholder='Description'  name='description'  value={activity.description}  onChange={handlInputChange}/>
            <Form.Input placeholder='Category'        name='category'     value={activity.category}     onChange={handlInputChange}/>
            <Form.Input type='date' placeholder='Date'            name='date'         value={activity.date}         onChange={handlInputChange}/>
            <Form.Input placeholder='City'            name='city'         value={activity.city}         onChange={handlInputChange}/>
            <Form.Input placeholder='Venue'           name='venue'        value={activity.venue}        onChange={handlInputChange}/>
            <Button loading={loading} floated='right' positive type='submit' content='submit'/>
            <Button as={Link} to='/Activities'  floated='right'  type='button' content='Cancel'/>
            
        </Form>
    </Segment>
  )
})
