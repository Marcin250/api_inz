import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Footer from '../../components/Reusable/footer'
import MiniLoader from '../../components/Reusable/mini_loader';
import ContactForm from '../../components/Contact/form';
import PageHeader from '../../components/Reusable/PageHeader';
import ContactData from '../../components/Contact/aside';
import { Helmet } from 'react-helmet';
import { API } from '../../helpers/api';

const Main = styled.main`
  max-width: 1300px;
  color:#1e1e1e;
  padding:0 15px;
  margin:40px auto;
`

const Container = styled.div`
  display:flex;
  flex-flow: row wrap;
  justify-content:space-between;
  margin-top:30px;
`

class Contact extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Contact - portal-wertykalny</title>
        </Helmet>
        <Main>
          <PageHeader>Kontakt</PageHeader>
          <Container>
            <ContactForm />
            <ContactData />
          </Container>
        </Main>
        <Footer />
      </Fragment>
    )
  }
}

export default Contact;
