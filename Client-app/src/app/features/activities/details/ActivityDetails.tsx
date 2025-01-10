import React from 'react'
import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Icon,Image } from 'semantic-ui-react'
import { UseStore } from '../../../stores/store';
import LoadingComponent from '../../../layout/LoadingComponent';
import { observer } from 'mobx-react-lite';




export default observer(function ActivityDetails() {
  const {activityStore}=UseStore();
  const {selectedActivity:activity,openForm,CancelSelectedActivity}=activityStore;
  if(!activity)return <LoadingComponent/>;

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
        <Button onClick={CancelSelectedActivity} basic color='grey' content='Cancel' />
      </Button.Group>
    </CardContent>
  </Card>
  )
}
)