import React, { Component } from 'react';
import styled from 'styled-components';
import MiniLoader from '../Reusable/mini_loader';
import ActionButton from './article_action';
import { connect } from 'react-redux';
import { searchAdminArticles } from '../../actions/';
import { Link } from 'react-router-dom';
import { MdBlock, MdRemoveCircleOutline, MdBuild } from 'react-icons/md';
import { API } from '../../helpers/api';
import variablesCSS from '../../css/variables';

const Table = styled.table`
  width:100%;
  text-align:left;
  border-collapse: collapse;
`

const Title = styled.th`
  text-transform: uppercase;
  letter-spacing:.5px;
  padding:16px 10px;
  font-family:${variablesCSS.categoryFont};
  background:${variablesCSS.gray};
  font-size:.75em;
`

const Field = styled.td`
  padding:10px;
  font-size:.95em;
  word-break: break-word;
`

const Row = styled.tr`
  &:not(:last-child) {
    border-bottom:1px solid ${variablesCSS.gray};
  }
  ${Field} {
    &:last-child {
      max-width:230px;
    }
  }
`


class UsersTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    }
  }

  componentWillUnmount() {
    this.props.searchAdminArticles('')
  }

  async componentDidMount() {
    const users = await API.get('users_list/0/25');
    this.setState({
      users
    });
  }

  render() {
    const { users } = this.state;
    const { searchKeyword } = this.props;

    return (
        users.length
        ? (
          <Table>
            <thead>
              <tr>
                <Title>Rejestracja</Title>
                <Title>Status</Title>
                <Title>Nazwa</Title>
                <Title>Email</Title>
                <Title>Prawa</Title>
                <Title>Akcje</Title>
              </tr>
            </thead>
            <tbody>
              {
              users
              .sort((a, b) => new Date(b.create_date).getTime() - new Date(a.create_date).getTime())
              .filter(item => item.name.toLowerCase().includes(searchKeyword))
              .map(
                item => {
                  return (
                      <Row key={item.iduser}>
                        <Field>{new Date(item.create_date).toLocaleString()}</Field>
                        <Field>{item.status}</Field>
                        <Field>{item.name}</Field>
                        <Field>{item.email}</Field>
                        <Field>{item.privilege}</Field>
                        <Field>
                        {
                          item.status === 'aktywny' ?
                          (
                            <ActionButton title='Zablokuj użytkownika' icon={<MdBlock />} />
                          ) : (
                            <ActionButton title='Odblokuj użytkownika' icon={<MdRemoveCircleOutline />} />
                          )
                        }
                          <ActionButton title='Zmień prawa użytkownika' icon={<MdBuild />} />
                        </Field>
                      </Row>
                      );
                    }
                  )
                }
            </tbody>
          </Table>
      ) : (
        <MiniLoader />
      )
    );
  };
};

const mapStateToProps = state => {
  return {
    searchKeyword: state.admin.searchKeyword
  }
}
export default connect(mapStateToProps, {searchAdminArticles})(UsersTable);
