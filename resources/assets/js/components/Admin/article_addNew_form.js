import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Title from './admin_content_title';
import MiniLoader from '../Reusable/mini_loader';
import Button from '../Reusable/button';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchCategories } from '../../actions/'
import { FaRegFileImage } from "react-icons/fa";
import { withRouter } from 'react-router-dom';
import variablesCSS from '../../css/variables';

const Container = styled.section`
  margin-left:1px;
  margin:20px;
  margin-top:5px;
  align-items:center;
`

const Wrapper = styled.section`
  background:#fff;
  padding:25px 35px;
  margin:1px 20px;
`

const Field = styled.div`
  margin-bottom:15px;
`

const Input = styled.input`
  display:block;
  outline:none;
  width:100%;
  border:none;
  height:45px;
  padding:14px 12px;
  border-radius:2px;
  color:${variablesCSS.black};
  background:#f2f2f2;
  &[type='file'] {
    display:none;
    border:none;
  }
  &::placeholder {
    color:${variablesCSS.black};
  }
`

const Label = styled.span`
  display:block;
  margin-bottom:5px;
  font-size:.9em;
  letter-spacing:.5px;
`

const UploadLabel = styled.label`
  display:flex;
  cursor: pointer;
  height:45px;
  letter-spacing:.35px;
  font-size:.85em;
  padding:15px 12px;
  border-radius:2px;
  color:${variablesCSS.black};
  background:#f2f2f2;
  svg {
    font-size:1.2em;
    margin-right:4px;
    color:inherit;
  }
`

const Textarea = styled.textarea`
  width:100%;
  resize: vertical;
  min-height:175px;
  max-height:400px;
  outline:none;
  padding:14px 12px;
  border:none;
  border-radius:2px;
  color:${variablesCSS.black};
  background:#f2f2f2;
  &::placeholder {
    color:${variablesCSS.black};
  }
`

const Select = styled.select`
  width:100%;
  border:none;
  outline:none;
  padding:14px 12px 14px 9px;
  border-radius:2px;
  color:${variablesCSS.black};
  background:#f2f2f2;
  option {
    color:${variablesCSS.black};
  }
`

const Footer = styled.div`
  margin-top:20px;
  display:flex;
  justify-content:flex-start;
`

class AddNewArticleForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articleToEdit: [],
      title: '',
      category: 0,
      content: '',
      summary: '',
      file: '',
      fetchingStatus: false,
    }

    this.handleSelect = this.handleSelect.bind(this);
  }

  async componentDidMount() {
    const { articleToEdit, fetchCategories } = this.props;

    await fetchCategories();
    articleToEdit && this.setState({ articleToEdit }, () => {
      this.setState({
        title: articleToEdit[0].title,
        category: articleToEdit[0].category,
        content: articleToEdit[0].content
      })
    })
  }

  async handleSubmit() {
    const { title, category, file, content } = this.state;
    const data = new FormData();

    if(title.length === 0 || Boolean(category.length) === 0 || file.length === 0 || content.length === 0)
      return alert('pola nie mogą byc puste!');

    this.setState({fetchingStatus: true})

    data.append('title', title);
    data.append('category', category);
    data.append('content', content);
    data.append('image', file);

    try {
      await axios.post(`/api/articles`, data);
    } catch (e) {
      throw new Error(e);
    } finally {
      this.setState({fetchingStatus: false});
      this.props.history.goBack();
    }
  }

  handleSelect(e) {
    const id = e.target.value;
    this.setState({category: id});
  }

  render() {
    const { title, category, content, summary, file } = this.state;
    const { label, articleToEdit, article } = this.props;

    return (
      <Container>
      <Title>{label}</Title>
      {
        article.categories.length
        ? (
          <Wrapper>
          {
              <Fragment>
                <form>
                  <Field>
                    <Label>Tytuł <span style={{color:'#ee324e'}}>*</span></Label>
                    <Input type='text' placeholder='Podaj tytuł artykułu'  maxLength='75' onChange={(e) => this.setState({title: e.target.value})} value={ title }  />
                  </Field>
                  <Field>
                  <Label>Kategoria <span style={{color:'#ee324e'}}>*</span></Label>
                  <Select onChange={this.handleSelect} value={category}>
                    <option key={0} value={0} disabled>Wybierz kategorię..</option>
                    {
                      article.categories.map(
                        item => <option key={item.idcategory} value={item.idcategory}>{item.name}</option>
                      )
                    }
                  </Select>
                  </Field>
                  <Field>
                    <Label>Treść <span style={{color:'#ee324e'}}>*</span></Label>
                    <Textarea type='text' placeholder='Podaj treść artykułu' onChange={(e) => this.setState({content: e.target.value})} value={ content } />
                  </Field>
                  <Field>
                    <Label>Zdjęcie <span style={{color:'#ee324e'}}>*</span></Label>
                    <UploadLabel htmlFor='upload'><FaRegFileImage />Wybierz zdjęcie</UploadLabel>
                    <Input type='file' id='upload' onChange={(e) => this.setState({file: e.target.files[0]})} />
                  </Field>
                </form>
                <Footer>
                  <Button
                    name='&larr; Cofnij'
                    onClick={() => { this.props.history.goBack() } }
                    title='Powrót'
                    margin='0 10px 0 0' />
                  <Button name='Dodaj'
                    blue
                    onClick={() => { this.handleSubmit() } }
                    title='Dodaj artykuł'
                    isFetching={this.state.fetchingStatus}
                    margin='0' />
                </Footer>
              </Fragment>
          }
          </Wrapper>
        ) : (
          <MiniLoader />
        )
      }
      </Container>
    )
  }
}

const mapStateToProps = ({article}) => ({article});
export default connect(mapStateToProps, { fetchCategories})(withRouter(AddNewArticleForm));
