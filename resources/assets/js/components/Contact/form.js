import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '../Reusable/button';
import variablesCSS from '../../css/variables';

const Form = styled.form`
  flex:4 1 430px;
  margin:0 5px;
  order:2;
  @media (min-width: 820px) {
    order:1;
  }
  div:not(:last-child) {
    margin-bottom:12px;
  }
  label {
    display:block;
    margin-bottom:4px;
  }
  input, textarea {
    color:#1e1e1e;
    width:100%;
    padding:10px;
    border-radius:6px;
    outline:none;
    border:2px solid ${variablesCSS.gray};
    transition: border .3s;
    &:focus {
      border:2px solid ${variablesCSS.yellow};
    }
  }
  textarea {
    resize: vertical;
    min-height:100px;
    max-height:300px;
  }
`

class ContactForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nickname: '',
      lastname: '',
      email: '',
      content: ''
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();

    console.log('sending a form');
  }

  render() {
    return (
      <Form>
        <div>
          <label forhtml='name'>Imię</label>
          <input type='text' name='name' />
        </div>
        <div>
          <label forhtml='lastname'>Nazwisko</label>
          <input type='text' name='lastname' />
        </div>
        <div>
          <label forhtml='email'>Email</label>
          <input type='email' name='email' />
        </div>
        <div>
          <label forhtml='content'>Treść</label>
          <textarea type='text' name='content'></textarea>
        </div>
        <Button
          name='Wyślij'
          onClick={this.handleFormSubmit}
          warning />
      </Form>
    )
  }
}

export default ContactForm;
