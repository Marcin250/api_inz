import React, { Component } from 'react';
import styled from 'styled-components';
import ArticleList from './articles_list';
import MiniLoader from '../Reusable/mini_loader';
import Wrapper from '../Reusable/wrapper';
import { deleteSelectedCategoriesByUser } from '../../actions/'
import { connect } from 'react-redux';

const Container = styled.section`
  width:100%;
  flex:1 1 580px;
  order:2;
  @media (min-width: 820px) {
    order:1;
    width:73%;
  }
`

const Information = styled.p`
  padding:10px 0;
`

const Header = styled.div`
  padding:15px 0;
  position:sticky;
  z-index:20;
  top:109px;
  background:#fff;
  display:flex;
  flex-flow:row nowrap;
  justify-content:space-between;
  border-bottom:1px solid #ededed;
  color:#1e1e1e;
  @media (min-width: 640px) {
    top:0;
  }
`

const Title = styled.h3`
  font-family:'RSBold';
  font-size:1.4em;
`

const Item = styled.span`
  display:block;
  margin:0 5px;
  span:last-child {
    margin-left:2px;
    position:relative;
    top:2px;
    color:#00529f;
    font-size:1.3em;
    font-family:'AvenirLTB';
    cursor:pointer;
  }
`

class Articles extends Component {
  render() {
    const { selectedCategoriesByUser } = this.props.article;
    const  { deleteSelectedCategoriesByUser } = this.props;

    return (
      <Container>
        <Header>
          <Title>Wiadomości</Title>
          <Wrapper>
          {
            selectedCategoriesByUser.map(item =>
              <Item key={item.id}>
                {item.name}
                <span
                  title='usuń'
                  onClick={() => deleteSelectedCategoriesByUser(item.id)}
                >×</span>
              </Item>
            )
          }
          </Wrapper>
        </Header>
        <ArticleList />
      </Container>
    )
  }
}

const mapStateToProps = ({article}) => ({article})
export default connect(mapStateToProps, { deleteSelectedCategoriesByUser })(Articles);
