import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'
import { UseStore } from '../stores/store';
export default  function NavBar() {
    const {activityStore}=UseStore();

  return (
    <Menu inverted fixed='top'>
        <Container>
            <Menu.Item header>
                <img src='../assets/logo.png' alt='' style={{marginRight:'10px'}}/>
                Reactivities
            </Menu.Item>
            <Menu.Item name='Activities'/>
            <Menu.Item >
              <Button onClick={ ()=> activityStore.openForm()} positive content="Create Activity"></Button>
             
            </Menu.Item>
        </Container>
    </Menu>
  )
}

