import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Wrapper from '../../components/Reusable/wrapper';
import Footer from '../../components/Reusable/footer';
import MiniLoader from '../../components/Reusable/mini_loader';
import UserActivity from '../../components/User/user_activity';
import NoUser from '../../components/User/no_user_info';
import UserSettings from '../../components/User/user_settings';
import { Helmet } from 'react-helmet';
import { API } from '../../helpers/api';
import axios from 'axios';
import { fetchUserProfile } from '../../actions';

const Main = styled.main`
  max-width: 1300px;
  color:#1e1e1e;
  padding:0 15px;
  margin:40px auto;
`

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: [],
      userActivity: [],
      fetchingStatus: true
    }
  }

  async componentDidUpdate(prevProps) {
    window.scrollTo(0,0);
    const currentID = this.props.match.params.id;
    const prevID = prevProps.match.params.id;

    if(currentID !== prevID) {
      const user = await axios.get(`/api/users_by_id/${currentID}`);
      const userActivity = await axios.get(`/api/users_get_profile/${currentID}/15`);
      this.setState({user, userActivity: userActivity.data, fetchingStatus: false});
    }
  }

  async componentDidMount() {
    const { id } = this.props.match.params;

    await this.props.fetchUserProfile(id);
    const userActivity = await axios.get(`/api/users_get_profile/${id}/15`);

    this.setState({user: this.props.user.userProfile, userActivity: userActivity.data, fetchingStatus: false});
   }

  render() {
    const { user, userActivity, fetchingStatus } = this.state;

    return (
      <Fragment>
        <Helmet>
          <title>
            { fetchingStatus ? 'Pobieram profil użytkownika..' : userActivity.user !== null ? `Profil użytkownika — ${userActivity.user.name.toLowerCase()}` : 'Taki użytkownik nie istnieje!'  }
          </title>
        </Helmet>
        <Main>
          <Wrapper>
          {
            !fetchingStatus
            ? userActivity.user !== null
            ? (
              <Fragment>
                <UserActivity
                  status={ fetchingStatus }
                  activity={ userActivity }
                  status={ fetchingStatus }
                />
                <UserSettings
                  user={ user }
                  activity={ userActivity }
                  userSession = { this.props.user }
                  status={ fetchingStatus }
                  fetchUserProfile={ this.props.fetchUserProfile }
                />
              </Fragment>
            ) : (
              <NoUser />
            ) : (
              <MiniLoader margin={20} />
            )
          }
          </Wrapper>
        </Main>
        <Footer />
      </Fragment>
    )
  }
}

const mapStateToProps = ({user}) => ({user})
export default connect(mapStateToProps, {fetchUserProfile})(User);
