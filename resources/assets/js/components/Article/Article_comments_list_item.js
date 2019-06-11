import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FaReply, FaBan } from 'react-icons/fa';
import { IoIosFlag } from 'react-icons/io';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import User from './article_user';
import Comments from './article_comments_list';
import AddCommentForm from './article_comments_form';
import EditCommentForm from './article_comments_edit_form';
import dateConverter from '../../helpers/dateConverter';
import ConfimationModal from '../Reusable/modal_confirmation';
import variableCSS from '../../css/variables';
import { selectedCommentID, deleteComment, hideComment } from '../../actions';

const ListItem = styled.li`
  display:flex;
  animation:animateComment .3s ease-in;
  flex-flow:row nowrap;
  justify-content:flex-start;
  margin-top:25px;
  &:not(:last-child) {
    margin-bottom:15px;
  }
  @keyframes animateComment {
  0% {
    margin-top:-50px;
    opacity:0;
  }
  100% {
    margin-left:0;
    opacity:1;
  }
}
`;

const Article = styled.article`
  flex:1;
  ul {
    margin-left:-20px;
    @media only screen and (min-width: 640px) {
      margin-left:-20px;
    }
  }
`;

const Header = styled.header`
  display:flex;
  justify-content:space-between;
  align-items:baseline;
  flex-flow: column wrap;
  @media (min-width: 640px) {
    flex-flow: row wrap;
  }
`;

const Added = styled.span`
  font-size:.8em;
  text-align:left;
  line-height:1.3;
  letter-spacing:.6px;
  color:${variableCSS.darkGray};
  @media (min-width: 640px) {
    text-align: right;
  }
`;

const Content = styled.p`
  white-space:pre-line;
  text-align:justify;
  padding:8px 0;
  margin-left:-50px;
  font-size:1.05em;
  margin-top:10px;
  @media (min-width: 640px) {
    margin-left:0;
  }
`;

const Footer = styled.footer`
  margin-top:6px;
  margin-left:-50px;
  display:flex;
  flex-flow:row wrap;
  align-items:center;
  justify-content:flex-start;
  margin-bottom:15px;
  @media (min-width: 640px) {
    margin-left:0;
  }
`;

const ActionName = styled.span`
  display:inline-block;
  margin-left:3px;
  position:relative;
  top:-1px;
`;

const FooterItem = styled.button`
  background:none;
  font-size:.85em;
  outline:none;
  cursor:pointer;
  padding:3px;
  border:none;
  color:${variableCSS.darkGray}
  cursor:pointer;
  &:not(:last-child) {
    margin-right:6px;
  }
  &:hover {
    color:${variableCSS.blue};
  }
`

const LinkTo = styled(Link)`
  color:inherit;
  &:hover {
    color:${variableCSS.blue};
  }
`

/**
 * Renders single Comment.
 */
class SingleComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingForm: false,
      isEditing: false,
      showModal: false,
      fetchingStatus: false
    };

    this.handlePostForm = this.handlePostForm.bind(this);
    this.handleEditForm = this.handleEditForm.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }

  handlePostForm() {
    const { showingForm } = this.state;
    this.setState({ showingForm: !showingForm });
  }

  handleEditForm() {
    const { isEditing } = this.state;
    this.setState({ isEditing: !isEditing });
  }

  handleEdit() {
    const { comment, selectedCommentID } = this.props;
    selectedCommentID(comment.idcomment);
    this.handleEditForm();
  }

  async handleDelete() {
    const { articleID, comment, deleteComment } = this.props;
    this.setState({fetchingStatus: true})
    deleteComment({ articleID, idcomment: comment.idcomment });
  }

  handleHide() {
    const { articleID, comment, hideComment } = this.props;
    hideComment({ articleID, idcomment: comment.idcomment });
  }

  render() {
    const { comment, articleID, user } = this.props;
    const { showingForm, isEditing, showModal, fetchingStatus } = this.state;

    return (
      <ListItem>
        <ConfimationModal
          showModal={showModal}
          title='Usunięcie komentarza'
          text='Czy jesteś pewien, że chcesz usunąć ten komentarz? Nie będziesz mógł cofnąć tej operacji.'
          btnTextYes='Usuń'
          btnTextNo='Cofnij'
          accept={this.handleDelete}
          denied={() => this.setState({showModal: false})}
          status={fetchingStatus}
        />
        <User user={comment.user} />
        <Article>
          <Header>
            <span title={`Profil użytkownika ${comment.user.name}`}>
              <LinkTo to={`/app/user/${comment.user.iduser}`}>{comment.user.name}</LinkTo>
            </span>
            {!comment.modify_date
              ? <Added title={comment.create_date}>{dateConverter.toStageDate(comment.create_date)}</Added>
              : (
                <Added title={`${comment.create_date}, edited at ${comment.modify_date}`}>{dateConverter.toStageDate(comment.create_date)}, <br/>edytowano {dateConverter.toStageDate(comment.modify_date)}</Added>
              )
            }
          </Header>
          {isEditing
            ? (
              <EditCommentForm
                articleID={articleID}
                handleEdit={() => this.handleEdit()}
                handleEditForm={() => this.handleEditForm()}
                content={comment.content}
                isEditing={isEditing}
              />
            )
            : <Content>{comment.content}</Content>
          }
          {user.length
            ? (
              <Footer>
                <FooterItem onClick={this.handlePostForm} title="Napisz odpowiedź">
                  <FaReply />
                  <ActionName>Odpowiedz</ActionName>
                </FooterItem>
                {user[0].iduser === comment.user.iduser
                  ? (
                    <Fragment>
                      <FooterItem title="Edytuj komentarz" onClick={this.handleEdit}>
                        <MdEdit />
                        <ActionName>Edytuj</ActionName>
                      </FooterItem>
                      <FooterItem title="Usuń komentarz" onClick={() => this.setState({showModal: true})}>
                        <MdDeleteForever />
                        <ActionName>Usuń</ActionName>
                      </FooterItem>
                    </Fragment>
                  )
                  : ''}
                  {
                  user[0].iduser !== comment.user.iduser
                  ? (
                    <FooterItem title="Zgłoś użytkownika">
                      <FaBan />
                      <ActionName>Zgłoś</ActionName>
                    </FooterItem>
                  ) : ''
                }
                {user[0].tier > 2 && user[0].iduser !== comment.user.iduser
                  ? (
                    <FooterItem title="Zbanuj komentarz" style={{ color: variableCSS.crimson }} onClick={this.handleHide}>
                      <IoIosFlag />
                      <ActionName>Zbanuj</ActionName>
                    </FooterItem>
                  )
                  : ''
                }
              </Footer>
            )
            : ''}
          {
            showingForm
            ? <AddCommentForm
                showAnswerForm={showingForm}
                user={user} articleID={articleID}
                commentID={comment.idcomment}
                author={comment.user.name}
                handleForm={this.handlePostForm} />
            : ''}
          {
            comment.comments ? <Comments comments={comment.comments} user={user} articleID={articleID} /> : ''}
        </Article>
      </ListItem>
    );
  }
}

SingleComment.defaultProps = {
  articleID: null,
  user: [],
};

SingleComment.propTypes = {
  articleID: PropTypes.number,
  user: PropTypes.arrayOf(PropTypes.object),
};

export default connect(null, { deleteComment, selectedCommentID, hideComment })(SingleComment);
