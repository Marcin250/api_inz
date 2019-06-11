import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Footer from '../../components/Reusable/footer'
import Wrapper from '../../components/Reusable/wrapper';
import MiniLoader from '../../components/Reusable/mini_loader';
import Articles  from '../../components/Search/articles';
import Tags  from '../../components/Search/tags';
import { Helmet } from 'react-helmet';
import { API } from '../../helpers/api';

const Main = styled.main`
  max-width: 1300px;
  color:#1e1e1e;
  padding:0 15px;
  margin:40px auto;
`

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingStatus: false,
      keyword: '',
      articles: []
    }
  }
  async componentDidMount() {
    window.scrollTo(0,0);
    const { keyword } = this.props.match.params;

    await this.setState({ keyword, fetchingStatus: true }) //ustawienie wyrażenia oraz flagi na wartośc true
    const request = await API.get(`articles_filtrate/5/${this.state.keyword}`); //zapytanie o artykyłu zawierające wyrażenie w tytule
    await this.setState({ articles: request, fetchingStatus: false }); //ustawienie zwróconych artykułow jako częśc stanu komponentu
  }

  async componentDidUpdate(prevProps) {
    const previousKeyword = prevProps.match.params.keyword;
    const currentKeyword = this.props.match.params.keyword;

    if(currentKeyword !== previousKeyword) {
      await this.setState({ keyword: currentKeyword, fetchingStatus: true });
      const request = await API.get(`articles_filtrate/5/${this.state.keyword}`);
      await this.setState({ articles: request, fetchingStatus: false });
    }
  }

  render() {
    const { keyword, articles, fetchingStatus } = this.state;

    return (
      <Fragment>
        <Helmet>
          <title>Wyszukiwarka - portal-wertykalny</title>
        </Helmet>
        <Main>
          <Wrapper>
            <Articles articles={articles} keyword={ keyword } status={ fetchingStatus } />
            <Tags articles={articles} status={ fetchingStatus } />
          </Wrapper>
        </Main>
        <Footer />
      </Fragment>
    )
  }
}

export default Search;
