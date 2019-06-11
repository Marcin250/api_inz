import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import MiniLoader from '../Reusable/mini_loader';
import { Link } from 'react-router-dom';
import ActionButton from './article_action';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { StoreAdminArticleToEdit, fetchAdminArticles, searchAdminArticles, fetchCurrentPoll } from '../../actions'
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import ModalNotification from '../Reusable/modal_notification';
import ConfimationModal from '../Reusable/modal_confirmation';
import variablesCSS from '../../css/variables';
import PollData from './poll_data';

const PreLoader = styled.div`
  padding:18px;
  background:#fff;
`

const Title = styled.h5`
  font-size:1em;
  font-weight:lighter;
  padding:14px 10px;
  background:${variablesCSS.gray}
`


const Information = styled.p`
  padding:10px 0;
`

class PollTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: true,
    }
  }

  async componentDidMount() {
    await this.props.fetchCurrentPoll();
    this.setState({isFetching: false});
  }

  render() {
    const { pollData } = this.props.user;
    const { isFetching } = this.state;

    return (
      <div>
        {
          !isFetching
          ? <PollData poll={pollData } />
          : <PreLoader>
              <MiniLoader />
           </PreLoader>
        }
      </div>
    );
  };
};

const mapStateToProps = ({admin, user}) => ({admin, user});
export default withRouter(connect(mapStateToProps, { searchAdminArticles, fetchCurrentPoll })(PollTable));
