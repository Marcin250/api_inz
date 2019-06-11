import React, {Component, Fragment} from 'react';
import styled from 'styled-components';
import { GoCommentDiscussion } from 'react-icons/go';
import { IoIosEye, IoIosHeart } from 'react-icons/io';
import {incLikesCount, decLikesCount} from '../../actions/';
import { connect } from 'react-redux';
import Notification from '../Reusable/modal_notification';
import variablesCSS from '../../css/variables';

const Header = styled.header`
  background:white;
  color:#1e1e1e;
  margin: 0 5px 40px 5px;
`

const Title = styled.h2`
  display:block;
  font-family:'RSBold';
  font-size:1.65em;
  @media (min-width: 480px) {
    font-size:2em;
  }
  @media (min-width: 640px) {
    font-size:2.4em;
  }
`

const Wrapper = styled.div`
  margin-top:15px;
  display:flex;
  justify-content:flex-start;
  flex-flow: row nowrap;
`

const Item = styled.div`
  display:flex;
  cursor:default;
  cursor: pointer;
  align-items:center;
  color:${variablesCSS.gray};
  &:not(:last-child) {
    margin-right:8px;
  }
  svg {
    color:${variablesCSS.gray};
  }
`

const Count = styled.span`
  display:inline-block;
  margin-left:4px;
  font-size:.95em;
`

const LikeInfo = styled.span`
  &:hover {
    color:#ee324e;
  }
`

class ArticleTitle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articleLikes: null,
      showModal: false,
      typeModal: '',
      textModal: ''
    }

    this.handleLikeButton = this.handleLikeButton.bind(this);
    this.handleDislikeButton = this.handleDislikeButton.bind(this);
    this.handleUnloggedButton = this.handleUnloggedButton.bind(this);
  }

  async componentDidMount() {
    const {likes_count} = this.props.article.data;
    await this.setState({articleLikes: likes_count});
  }

  componentDidUpdate(prevProps) {
    const prev_likes_count = prevProps.article.data.likes_count,
          actual_likes_count = this.props.article.data.likes_count;

    if(prev_likes_count !== actual_likes_count) {
      this.setState({articleLikes: actual_likes_count})
    }
  }

  async handleLikeButton() {
    const {idarticle} = this.props.article.data;
    if(!this.props.article.blockLikeButton) {
      await this.props.incLikesCount({idreference: idarticle});
      this.setState({typeModal:'success', showModal: true, textModal: 'Artykuł został dodany do ulubionych.'})
    }
  }

  async handleDislikeButton() {
    const {idarticle} = this.props.article.data;
    if(!this.props.article.blockLikeButton) {
      await this.props.decLikesCount(idarticle);
      this.setState({typeModal:'success', showModal: true, textModal: 'Arykuł został usunięty z ulubionych.'})
    }
  }

  handleUnloggedButton() {
    this.setState({typeModal:'info', showModal: true, textModal: 'Aby polubić artykuł musisz się zalogować!'})
  }

  render() {
    const {title, likes_count, comments_count, views, liked} = this.props.article.data,
          {articleLikes} = this.state,
          {user} = this.props.user;

    return (
      <Header>
        <Title>{title}</Title>
        <Wrapper>
          <Item title='komentarze'>
            <GoCommentDiscussion />
            <Count>{comments_count}</Count>
          </Item>
          <Item title='Wyświetlenia artykułu'>
            <IoIosEye />
            <Count>{views}</Count>
          </Item>
          {
           liked && user.length
           ? (
             <Item
              title='Nie podoba mi się'
              onClick = {this.handleDislikeButton}>
               <IoIosHeart style={{color:'#ee324e'}} />
               <Count>{articleLikes}</Count>&nbsp; — &nbsp;<LikeInfo>Usuń z ulubionych</LikeInfo>
             </Item>
           ) : user.length ? (
             <Item
              title='Podoba mi się'
              onClick = {this.handleLikeButton}>
              <IoIosHeart />
              <Count>{articleLikes}</Count>&nbsp; — &nbsp;<LikeInfo>Dodaj do ulubionych</LikeInfo>
             </Item>
           ) : (
             <Item
              title='Zaloguj się, aby móc polubić artykuł'
              onClick = {this.handleUnloggedButton}>
               <IoIosHeart />
               <Count>{articleLikes}</Count>
             </Item>
           )
          }
        </Wrapper>
        <Notification
          options={{
            text: this.state.textModal,
            type: this.state.typeModal,
            timeout: 3500,
            showModal: this.state.showModal,
            hideModalFunction: () => this.setState({showModal: false}),
          }}
        />
      </Header>
    )
  }
}

const mapStateToProps = ({article, user}) => ({article, user});
export default connect(mapStateToProps, {incLikesCount, decLikesCount})(ArticleTitle);
