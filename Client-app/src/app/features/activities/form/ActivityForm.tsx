import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { UseStore } from '../../../stores/store';
import { observer } from 'mobx-react-lite';


export default observer(function ActivityForm() {
const {activityStore}=UseStore();
const {selectedActivity,closeForm,submitting,createActivity,updateActivity,loading}=activityStore
  const InitialState=selectedActivity ?? {
    id: '',
    title: '',
    date: '',
    description: '',
    category: '',
    city: '',
    venue: '',
  }
  const [activity,setActivity]=useState(InitialState);

  function handlInputChange(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ){ 
   const {name,value}= event.target;
    setActivity({...activity,[name]:value})
  }
  function handlSubmit(){
    activity.id?updateActivity(activity):createActivity(activity)
  }
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
            <Button onClick={closeForm} floated='right' positive type='button' content='Cancel'/>
            
        </Form>
    </Segment>
  )
})
