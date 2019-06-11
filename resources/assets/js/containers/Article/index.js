import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Article from '../../components/Article/article';
import ArticleImage from '../../components/Article/article_image';
import Aside from '../../components/Article/article_aside';
import Footer from '../../components/Reusable/footer'
import MiniLoader from '../../components/Reusable/mini_loader';
import {connect} from 'react-redux';
import { Helmet } from 'react-helmet';
import {fetchComments, fetchArticle} from '../../actions/'

//api calls
import { API } from '../../helpers/api';

const Main = styled.main`
  display:flex;
  flex-flow:column;
  position:relative;
  color:#1e1e1e;
`

const Container = styled.section`
  margin: 40px auto 0 auto;
  max-width:1300px;
  display:flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding:0 15px;
`

class SingleArticle extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loadingStatus: true,
      article: [],
      latest: [],
      neighbours: []
    }
  }

  async componentDidUpdate(prevProps) {
    const currentID = Number(this.props.match.params.id),
          prevID = Number(prevProps.match.params.id);

    if (currentID !== prevID) {
      await this.props.fetchArticle(currentID);
      const neighbours = await API.get(`articles_show_neighbours/${currentID}`);
      this.setState({article: this.props.article, neighbours});

      window.scrollTo(0,0);
    }

    if(prevProps.article.data.comments_count !== this.props.article.data.comments_count) {
      this.setState({article: this.props.article})
    }
  }

  async componentDidMount() {
    window.scrollTo(0,0);

    const currentID = Number(this.props.match.params.id);
    await this.props.fetchArticle(currentID);
    const latest = await API.get(`articles_latest/10`),
          neighbours = await API.get(`articles_show_neighbours/${currentID}`);

    this.setState({article: this.props.article, latest, neighbours, loadingStatus: false });
  }

  render() {
    if(this.state.loadingStatus) return <MiniLoader margin={50} />
    const { latest, neighbours } = this.state;
    const article = this.state.article.data;

    return (
      <Fragment>
      <Helmet>
        <title>{ article.title }</title>
        <meta name='description' content='main article' />
      </Helmet>
        <Main>
          <ArticleImage article={article} />
          <Container>
            <Article article={article} neighbours={neighbours} />
            <Aside latest={latest} />
          </Container>
        </Main>
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ article }) => ({ article });
export default connect(mapStateToProps, { fetchComments, fetchArticle })(SingleArticle);
