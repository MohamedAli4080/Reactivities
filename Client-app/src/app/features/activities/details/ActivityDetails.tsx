import React, { useEffect } from 'react'
import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Icon,Image } from 'semantic-ui-react'
import { UseStore } from '../../../stores/store';
import LoadingComponent from '../../../layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { Link, NavLink, useParams } from 'react-router-dom';




export default observer(function ActivityDetails() {
  const {activityStore}=UseStore();
  const {selectedActivity:activity,loadActitivty,loadingInitial}=activityStore;
  let {id}=useParams();
  
  
  useEffect(() => {
  
    if (id) loadActitivty (id);
    
  },[id,loadActitivty])
  if(loadingInitial || !activity)return <LoadingComponent/>;
  
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
        <Button as={Link} to={`/manage/${activity.id}`}   basic color='blue' content='Edit'/>
        <Button as={Link} to='/activities'  basic color='grey' content='Cancel' />
      </Button.Group>
    </CardContent>
  </Card>
  )
}
)