import React, { SyntheticEvent, useState } from 'react'
import { Button, Item,  Label, Segment } from 'semantic-ui-react'
import { UseStore } from '../../../stores/store';
import { observer } from 'mobx-react-lite';
import { Link, NavLink } from 'react-router-dom';


export default observer(function ActivityList() {

    const [target,setTarget]=useState('')
    const {activityStore}=UseStore();
    const {deleteActivity,ActivityByDate,loading}=activityStore

function handleActivityDelete(e:SyntheticEvent<HTMLButtonElement> ,id:string){
    setTarget(e.currentTarget.name);
    deleteActivity(id);
}
  return (
    <Segment>
        <Item.Group divided>
                {ActivityByDate.map((activity,index)=>(
                    <Item key={index}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city},{activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                               
                                <Button as={Link} to={`/activities/${activity.id}`}  floated='right' content='view' color='blue' />
                                <Button 
                                    name={activity.id}
                                    loading={loading && target==activity.id} 
                                    onClick={(e)=>handleActivityDelete(e,activity.id)} 
                                    floated='right'  
                                    content='delete' color='red' />

                                
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
        </Item.Group>
    </Segment>
  )
}
)
