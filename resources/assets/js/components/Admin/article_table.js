import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import MiniLoader from '../Reusable/mini_loader';
import { Link } from 'react-router-dom';
import ActionButton from './article_action';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { StoreAdminArticleToEdit, fetchAdminArticles, searchAdminArticles } from '../../actions'
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import ModalNotification from '../Reusable/modal_notification';
import ConfimationModal from '../Reusable/modal_confirmation';
import createLink from '../../helpers/createLink';
import dateConverter from '../../helpers/dateConverter';
import variablesCSS from '../../css/variables';
import { API } from '../../helpers/api';

const Field = styled.td`
  padding:10px;
  font-size:.95em;
`

const Table = styled.table`
  width:100%;
  text-align:left;
  border-collapse: collapse;
  &:first-of-type ${Field} {
    padding:16px 10px;
  }
`

const Title = styled.th`
  text-transform: uppercase;
  letter-spacing:.5px;
  padding:16px 10px;
  font-family:${variablesCSS.categoryFont};
  background:${variablesCSS.gray};
  font-size:.75em;
`

const Row = styled.tr`
  &:not(:last-child) {
    border-bottom:1px solid ${variablesCSS.gray};
  }
`

const CustomRadio = styled.label`
  position:relative;
  cursor:pointer;
  top:-10px;
  vertical-align: middle;
  &:before {
    content:'';
    position:absolute;
    left:0;
    top:0;
    width:16px;
    height:16px;
    border-radius:${variablesCSS.radius};
    border:2px solid ${variablesCSS.gray};
  }
`

 const Input = styled.input`
  display:none;
  &:checked ~ ${CustomRadio}:after {
    content:'✔';
    position:absolute;
    left:3px;
    top:-1px;
    color:${variablesCSS.gray};
 }
`

const Information = styled.p`
  padding:10px 0;
`

class ArticleTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      mainArticle: [],
      showConfirmationModal: false,
      showNotificationModal: false,
      modalType: '',
      modalText: '',
      fetchingStatus: false,
      modalFetching: false,
      selectedArticleID: null,
      currentMainRef: null,
      clickedInput: null
    }

    this.setInputRef = this.setInputRef.bind(this);
    this.handleMainArticleUpdate = this.handleMainArticleUpdate.bind(this);
    this.onDenied = this.onDenied.bind(this);
    this.setCurrentMain = this.setCurrentMain.bind(this);
  }

  componentWillUnmount() {
    this.props.searchAdminArticles('');
    this.setState({showNotificationModal: false});
  }

  async componentDidMount() {
    const { loadCounter } = this.props.admin;
    this.setState({fetchingStatus: true})

    const mainArticle = await axios.get('/api/articles_latest_main/1');
    await this.props.fetchAdminArticles();
    this.setState({articles: this.props.admin.ownArticles, mainArticle:mainArticle.data, fetchingStatus: false })

    //executes only after article was edited - push function with a state prop (article_edit_form.js - line 136)
    if(this.props.history.location.state !== undefined) {
      const { showNotificationModal, text, type } = this.props.history.location.state;
      this.setState({
        showNotificationModal: showNotificationModal,
        modalText: text,
        modalType: type
      });
    }
  }

  async componentDidUpdate(prevProps) {
    const currentProps = this.props;

    if(prevProps.admin.ownArticles.length !== currentProps.admin.ownArticles.length)
      this.setState({
        articles: currentProps.admin.ownArticles,
      })
  }

  async handleDelete(id) {
    try {
      const request = await axios.delete(`/api/articles/${id}`)
    } catch (e) {
      throw new Error(e);
    }
  }


  async handleMainArticleUpdate() {
      const { selectedArticleID } = this.state;
      const data = new FormData();

      this.setState({modalFetching: true});
      try {
        const request = await axios.put(`/api/articles_staff_change_main/${selectedArticleID}`)
      } catch (e) {
        throw new Error(e);
      } finally {
        this.setState({
          modalFetching: false,
          showConfirmationModal: false,
          showNotificationModal: true,
          modalText: 'Artykuł głowny został zmieniony',
          modalType: 'success'
        })
      }
    }

  setInputRef(node) {
    this.setState({clickedInput: node.target})
  }

  setCurrentMain(node) {
    this.setState({currentMainRef: node})
  }

  async onDenied() {
    const { clickedInput, currentMainRef } = this.state;

    this.setState({showConfirmationModal: false});
    this.state.clickedInput.checked = false;

    if(currentMainRef !== null)
      currentMainRef.checked = true;
  }

  render() {
    const { articles, fetchingStatus, showConfirmationModal, modalFetching, mainArticle } = this.state;
    const { searchKeyword } = this.props.admin;

    return (
      fetchingStatus
      ? <MiniLoader />
      : articles.length
      ? (
        <div>
          <Table>
          <thead>
              <tr>
                <Title>Na głównej</Title>
                <Title>Data dodania</Title>
                <Title>Autor</Title>
                <Title>Kategoria</Title>
                <Title>Tytuł</Title>
                <Title>Odnośnik</Title>
              </tr>
            </thead>
            <tbody>
              <Row>
                <Field>Tak</Field>
                <Field>{dateConverter.toStageDate(mainArticle[0].create_date)}</Field>
                <Field>{mainArticle[0].user.name}</Field>
                <Field>{mainArticle[0].category}</Field>
                <Field>{mainArticle[0].title}</Field>
                <Field><Link to={createLink(mainArticle[0])} target='_blank'>zobacz na żywo</Link></Field>
              </Row>
            </tbody>
          </Table>
          <Table>
            <thead>
              <tr>
                <Title title='Data dodania'>Data</Title>
                <Title title='Status'>Status</Title>
                <Title title='Tytuł'>Tytuł</Title>
                <Title title='Artykuł dnia'>Gł.</Title>
                <Title title='Kategoria'>Kategoria</Title>
                <Title title='Akcje'>Akcje</Title>
              </tr>
            </thead>
            <tbody>
              {
              articles
              .filter(item => item.title.toLowerCase().includes(searchKeyword))
              .map(
                item => {
                  return (
                      <Row key={item.idarticle}>
                        <Field>{new Date (item.create_date).toLocaleString()}</Field>
                        <Field>DODANY</Field>
                        <Field>{item.title}</Field>
                        <Field>
                          {
                            item.main
                            ? (
                              <Fragment>
                                 <Input type='radio' id={item.idarticle} name='mainArticle' defaultChecked ref={this.setCurrentMain} />
                                 <CustomRadio htmlFor={item.idarticle} />
                               </Fragment>
                             )	: (
                               <Fragment>
                                 <Input type='radio' id={item.idarticle} name='mainArticle' onChange={this.setInputRef} />
                                 <CustomRadio
                                   htmlFor={item.idarticle}
                                   onClick={() => this.setState({showConfirmationModal: true, selectedArticleID: item.idarticle})} />
                               </Fragment>
                             )
                          }
                        </Field>
                        <Field>{item.category}</Field>
                        <Field>
                        <Link to={`/admin/articles/edit/${item.idarticle}`} style={{display:'inline-block'}}>
                          <ActionButton title='Edytuj artykuł' icon={ <MdEdit /> } onClick={() => { this.props.StoreAdminArticleToEdit(item) }} />
                        </Link>
                          <ActionButton title='Usuń artykuł' icon={ <MdDeleteForever /> } onClick={() => this.handleDelete(item.idarticle)} />
                        </Field>
                      </Row>
                      );
                    }
                  )
                }
            </tbody>
          </Table>
          <ConfimationModal
            title='Zmiana artykułu głównego'
            text='Czy jesteś pewien, że chcesz ustawić ten artykuł jako główny? Tylko jeden artykuł w danym momencie może pełnić taką rolę.'
            btnTextYes='Ustaw'
            btnTextNo='Cofnij'
            denied={this.onDenied}
            accept={this.handleMainArticleUpdate}
            status={modalFetching}
            showModal={showConfirmationModal}
          />
          <ModalNotification
            options = {{
              type: this.state.modalType,
              text: this.state.modalText,
              hideModalFunction: () => this.setState({showNotificationModal: false}),
              timeout: 3500,
              showModal: this.state.showNotificationModal
            }}
          />
        </div>
      ) : <Information>Brak artykułów.</Information>
    );
  };
};

const mapStateToProps = ({admin}) => ({admin});
export default withRouter(connect(mapStateToProps, { StoreAdminArticleToEdit, fetchAdminArticles, searchAdminArticles })(ArticleTable));
