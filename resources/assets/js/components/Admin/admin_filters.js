import React, { Component } from 'react';
import styled from 'styled-components';
import Title from './admin_content_title';
import Button from '../Reusable/button';
import Wrapper from '../Reusable/wrapper';
import { connect } from 'react-redux';
import { searchAdminArticles, setAdminLoadCounter } from '../../actions/';
import variablesCSS from '../../css/variables';

const Select = styled.select`
  padding:10px;
  border-radius:${variablesCSS.radius};
  border:1px solid ${variablesCSS.gray};
  outline: none;
  align-self:flex-start;
`

const Search = styled.input`
  align-self:flex-end;
  padding:10px;
  border-radius:${variablesCSS.radius};
  outline: none;
  border:1px solid ${variablesCSS.gray};
`

class ArticleFilters extends Component {
  constructor(props) {
    super(props);

    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSearchInput(e) {
    const { searchAdminArticles } = this.props;

    searchAdminArticles(e.target.value)
  }

  handleSelect(e) {
    this.props.setAdminLoadCounter(e.target.value);
  }

  render() {

    return (
      <Wrapper>
        <Select onChange={this.handleSelect}>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={9999}>&infin;</option>
        </Select>
        <Search
          type='search'
          placeholder='Szukaj po nazwie..'
          onChange={this.handleSearchInput}
          />
      </Wrapper>
    );
  }
};

export default connect(null, { searchAdminArticles, setAdminLoadCounter })(ArticleFilters);
