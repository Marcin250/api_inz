import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '../Reusable/button';
import { connect } from 'react-redux';
import { addComment, editComment } from '../../actions/';
import variableCSS from '../../css/variables';

const Container = styled.div`
  position:fixed;
  z-index:9999;
  width:100%;
  height:100%;
  top:0;
  left:0;
  background:#fff;
  animation: .4s ease-out 0s 1 slideInFromBottom;
  @media only screen and (min-width: 640px) {
    display:none;
  }
  @keyframes slideInFromBottom {
    0% {
      opacity:0;
      transform: translateY(80%);
    }
    100% {
      opacity:1;
      transform: translateY(0);
    }
`

const ArticleTitle = styled.h4`
  height:74px;
  padding:15px;
  border-bottom:1px solid #ededed;
`

const CommentContent = styled.textarea`
  border:none;
  font-size:1.1em;
  background:transparent;
  padding:15px;
  outline:none;
  height:calc(100% - 139px);
  width:100%;
`

const ButtonWrapper = styled.div`
  position:fixed;
  bottom:0;
  width:100%;
  display:flex;
  background:#ededed;
  padding:15px;
  justify-content:flex-end;
`

class AddCommentModalMobile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      content: '',
      fetchingStatus: false,
    }

    this.handlePost = this.handlePost.bind(this);
    this.setTextareaRef = this.setTextareaRef.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleTextarea = this.handleTextarea.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleTextarea(e) {
    this.setState({content: e.target.value})
  }

  async handlePost(e) {
    e.preventDefault();

    const { content } = this.state;
    const { commentID, article, showAnswerForm, statusModal } = this.props;
    const idsubreference = !commentID ? 0 : commentID;

    if(content.length < 1) {
      this.textareaRef.style.border = '2px solid #ee324e';
    } else {
      this.setState({ fetchingStatus: true });

      !statusModal
      ? await this.props.addComment({content, idsubreference: 0, idreference: article.data.idarticle})
      : await this.props.addComment({content, idsubreference, idreference: article.data.idarticle});
      this.setState({ fetchingStatus: false, content: '' });
      this.props.openCommentModal();
    }
  }

  async handleEdit(e) {
    e.preventDefault();

    const { content } = this.state,
    { commentID, article } = this.props;

    if(content.length < 1) {
      this.textareaRef.style.border = '2px solid #ee324e';
    } else {
      this.setState({fetchingStatus: true})
      await this.props.editComment({content, selectedCommentID: commentID, articleID: article.data.idarticle});
      this.setState({content: '', fetchingStatus: false });
      this.closeModal();
    }
  }

  setTextareaRef(node) {
    this.textareaRef = node;
  }

  closeModal() {
    const { handleForm, openCommentModal, showAnswerForm } = this.props;

    if(showAnswerForm)
      handleForm();

    openCommentModal();
  }

  componentDidMount() {
    const { isEditing } = this.props;

    if(isEditing)
      this.setState({content: this.props.content});
    }

  render() {
    const  { article, statusModal, openCommentModal, showAnswerForm, author, isEditing } = this.props;
    const { content, fetchingStatus } = this.state;

    return (
      statusModal
      ? (
        <Container>
        {
          isEditing
          ? <ArticleTitle>Edytujesz post w {article.data.title}</ArticleTitle>
          : <ArticleTitle>{!showAnswerForm ? article.data.title : `Odpowiadasz użytkownikowi ${author}`}</ArticleTitle>
        }
          <CommentContent
            onChange={this.handleTextarea}
            value={content}
            type='text'
            ref={this.setTextareaRef}
            placeholder='Napisz komentarz..'></CommentContent>
          <ButtonWrapper>
            <Button
              name="Anuluj"
              onClick={this.closeModal} />
              {
                !isEditing
                ? (
                  <Button
                    name="Dodaj post"
                    onClick={this.handlePost}
                    isFetching={fetchingStatus}
                    blue />
                ) : (
                  <Button
                    name="Edytuj"
                    onClick={this.handleEdit}
                    isFetching={fetchingStatus}
                    blue />
                )
              }
          </ButtonWrapper>
        </Container>
      ) : ''
    )
  }
}

export default connect(null, {addComment, editComment})(AddCommentModalMobile);
