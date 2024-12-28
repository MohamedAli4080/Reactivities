import React from 'react'
import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Icon,Image } from 'semantic-ui-react'
import { Activity } from '../../../../models/activity'


interface props{
    activity:Activity;
    cancelSelectedActivity:()=>void;
    openForm:(id:string)=>void;
   
}

export default function ActivityDetails({activity,cancelSelectedActivity,openForm}:props) {
  return (
    <Card fluid>
    <Image src={`/assets/categoryImages/${activity.category}.jpg`}  />
    <CardContent>
      <CardHeader>{activity.title}</CardHeader>
      <CardMeta>
        <span className='date'>{activity.date}</span>
      </CardMeta>
      <CardDescription>
        {activity.description}
      </CardDescription>
    </CardContent>
    <CardContent extra>
      <Button.Group widths='2'>
        <Button  onClick={()=>openForm(activity.id)} basic color='blue' content='Edit'/>
        <Button onClick={cancelSelectedActivity} basic color='grey' content='Cancel' />
      </Button.Group>
    </CardContent>
  </Card>
  )
}
