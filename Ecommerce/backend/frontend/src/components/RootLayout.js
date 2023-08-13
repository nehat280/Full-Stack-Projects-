import React from 'react'
import {Outlet} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Header from './Header'
import Footer from './Footer'

function RootLayout() {
  return (
    <>
      <Header/>
      <Container className='py-3'>
        <Outlet/>
      </Container>
      <Footer/>
    </>
  )
}

export default RootLayout
