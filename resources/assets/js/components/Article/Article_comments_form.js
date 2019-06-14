import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Button from '../Reusable/button';
import User from './article_user';
import axios from 'axios';
import {connect} from 'react-redux';
import MiniLoader from '../../components/Reusable/mini_loader';
import AddCommentButtonMobile from './article_comment_add_mobile';
import AddCommentModalMobile from './article_comment_add_modal';
import ModalNotification from '../Reusable/modal_notification';
import {API} from '../../helpers/api';
import variableCSS from '../../css/variables';

import { addComment, setCommentStatus } from '../../actions/';

const Wrapper = styled.section`
  display:none;
  flex-flow: row wrap;
  justify-content: space-between;
  @media only screen and (min-width: 640px) {
    display:flex;
  }
`

const Form = styled.form`
  flex:8;
  width:100%;
`

const TextField = styled.textarea`
  font-size:1.1em;
  resize:vertical;
  line-height:1.5;
  width:100%;
  border-radius:5px;
  border:2px solid rgb(169, 169, 169);
  min-height:80px;
  max-height:200px;
  padding:10px;
  margin-bottom:10px;
  outline:none;
  transition: border .25s;
  &:focus {
    transition: all .25s;
    border:2px solid ${variableCSS.blue};
    border-radius: 5px;
  }
`

const UserImageContainer = styled.figure`
  display:none;
  justify-content:center;
  min-width:55px;
  min-height:55px;
  max-width:55px;
  max-height:55px;
  margin-right:10px;
  overflow:hidden;
  align-self:flex-start;
  border-radius:100%;
  @media (min-width: 640px) {
    display:flex;
  }
`

const UserImage = styled.img`
  height:55px;
`

const Counter = styled.span`
  font-weight:lighter;
  display:block;
  align-self:center;
  color: rgb(169, 169, 169);
  font-size:.85em;
`

const Warning = styled.span`
  color:#ee324e;
  font-weight:bold;
`

class AddCommentForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fetchingStatus: false,
      content: '',
      charactersUsed: 0,
      openCommentModal: false,
      showNotificationModal: false,
      modalText: '',
      modalType: ''
    };

    this.commentContent = React.createRef();
    this.handleTextarea = this.handleTextarea.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }


  componentDidMount() {
    const { showAnswerForm } = this.props;

    if(showAnswerForm === true)
      this.setState({openCommentModal: true});
  }

  handleTextarea(event) {
    const charactersUsed = event.target.value.length;

    this.setState({content: event.target.value});
    if(charactersUsed <= 500)
      return this.setState({charactersUsed: event.target.value.length});
  }

  async handlePost(e) {
    e.preventDefault();

    const { charactersUsed, content } = this.state;
    const { articleID, commentID, handleForm } = this.props;
    const idsubreference = !commentID ? 0 : commentID;
    const idreference = articleID;

    if (charactersUsed <= 0) return this.commentContent.current.style.borderColor = `${variableCSS.crimson}`;
    this.setState({ fetchingStatus: true });

    await this.props.addComment({content, idsubreference, idreference});
    await this.setState({
      charactersUsed: 0,
      content: '',
      fetchingStatus: false,
      showNotificationModal: true,
      modalText: 'Komentarz został dodany.',
      modalType: 'success'
    });

    this.commentContent.current.style.cssText = '';
    handleForm && handleForm();
  }

  render() {
    const { charactersUsed, fetchingStatus, openCommentModal } = this.state,
          { articleID, commentID, user, comments, isEditing, article, showAnswerForm, handleForm, author } = this.props;

    return (
      <Fragment>
        <Wrapper showingForm>
          <UserImageContainer>
            <UserImage  src={user[0].image} title='' alt='' />
          </UserImageContainer>
          <Form>
            <TextField
              value={this.state.content}
              onChange={this.handleTextarea}
              maxLength='500'
              ref={this.commentContent}></TextField>
            <Wrapper>
              {
                charactersUsed == 500
                ? <Counter><Warning>Użyto znaków: {charactersUsed}/500</Warning></Counter>
                : <Counter>Użyto znaków: {charactersUsed}/500</Counter>
              }
              <Wrapper style={{alignSelf: 'flex-end', alignItems:'center'}}>
                <Button
                  name='Dodaj post'
                  colorBlue
                  onClick={this.handlePost}
                  isFetching={fetchingStatus}
                  blue
                  minWidth
                />
              </Wrapper>
            </Wrapper>
          </Form>
        </Wrapper>
        <AddCommentButtonMobile
          openCommentModal={() => this.setState({openCommentModal: !openCommentModal})}
          handleForm={handleForm} />
        <AddCommentModalMobile
          openCommentModal={() => this.setState({openCommentModal: !openCommentModal})}
          statusModal={openCommentModal}
          showAnswerForm={showAnswerForm}
          article={article}
          handleForm={handleForm}
          commentID={commentID}
          author={author} />
        <ModalNotification
          options = {{
            type: this.state.modalType,
            text: this.state.modalText,
            hideModalFunction: () => this.setState({showNotificationModal: false}),
            timeout: 3500,
            showModal: this.state.showNotificationModal
          }}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = ({comments, article}) => ({comments, article});
export default connect(mapStateToProps, {addComment, setCommentStatus})(AddCommentForm);
