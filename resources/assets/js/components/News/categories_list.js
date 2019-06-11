import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import MiniLoader from '../Reusable/mini_loader';
import { fetchNews, fetchCategories, setSelectedCategoriesByUser } from '../../actions/'
import CategoryList from './categories_list_item';

const Container = styled.div`
  margin-top:20px;
  position:sticky;
  top:75px;
`

class CategoriesList extends Component {
  constructor(props) {
    super(props);

    this.setCategory = this.setCategory.bind(this);
  }

  async componentDidUpdate(prevProps, prevState) {
    if(prevProps.article.selectedCategoriesByUser !== this.props.article.selectedCategoriesByUser)
    {
      const categoriesID = this.props.article.selectedCategoriesByUser.map(({id}) => id);
      await this.props.fetchNews(categoriesID)
    }
  }

  async componentDidMount() {
    await this.props.fetchCategories()
  }

  setCategory(e) {
    const target = e.target;
    const { setSelectedCategoriesByUser } = this.props;

    setSelectedCategoriesByUser({
      id: target.getAttribute('data-id'),
      name: target.getAttribute('data-name'),
    });
  }

  render() {
    const { article } = this.props;

    return (
      <Container>
        {
          article.categories.length
          ? article.categories.map(item => <CategoryList setCategory={() => this.setCategory} key={ item.idcategory } item={ item } />)
          : <MiniLoader />
        }
      </Container>
    )
  }
}

const mapStateToProps = ({article}) => ({article})
export default connect(mapStateToProps, { fetchNews, fetchCategories, setSelectedCategoriesByUser })(CategoriesList);
