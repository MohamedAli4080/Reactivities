import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

export default function Homepage() {
  return (
    <Container style={{marginTop:'7em'}}>
        <h1>Home page</h1>
        <h3 >go to  <Link to='/activities'>Activities</Link></h3>
    </Container>
  )
}
