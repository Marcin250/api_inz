import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import MiniLoader from '../Reusable/mini_loader';
import { Link } from 'react-router-dom';
import ActionButton from './article_action';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { StoreAdminArticleToEdit, fetchAdminArticles, searchAdminArticles } from '../../actions'
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import ModalNotification from '../Reusable/modal_notification';
import ConfimationModal from '../Reusable/modal_confirmation';
import variablesCSS from '../../css/variables';
import { API } from '../../helpers/api';

const Table = styled.table`
  width:100%;
  text-align:left;
  border-collapse: collapse;
`

const Title = styled.th`
  padding:12px 5px;
  border-top-left-radius:3px;
  border-top-right-radius:3px;
  border:1px solid #F3F4F8;
  font-family:'SSPB';
`

const Field = styled.td`
  padding:14px 5px;
`

const Row = styled.tr`
  &:not(:last-child) {
    border-bottom:1px solid #ededed;
  }
`

const CustomRadio = styled.label`
  position:relative;
  cursor:pointer;
  top:-10px;
  vertical-align: middle;
  &:before {
    content:'';
    position:absolute;
    left:0;
    top:0;
    width:16px;
    height:16px;
    border-radius:6px;
    border:2px solid ${variablesCSS.yellow};
  }
`

 const Input = styled.input`
  display:none;
  &:checked ~ ${CustomRadio}:after {
    content:'✔';
    position:absolute;
    left:3px;
    top:-1px;
    color:${variablesCSS.yellow};
 }
`

const Information = styled.p`
  padding:10px 0;
`

class PlayerTable extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <div>
      TODO:
    <p>  - dodawanie/modyfikacja/usuwanie piłkarzy, </p>
    <p> - wyszukiwanie piłkarzy</p>
    <p>  - lista wszystkich piłkarzy,</p>
    <p>  - statystyki dla poszczególnych piłkarzy</p>
      </div>
    );
  };
};

const mapStateToProps = ({admin}) => ({admin});
export default withRouter(connect(mapStateToProps, { searchAdminArticles })(PlayerTable));
