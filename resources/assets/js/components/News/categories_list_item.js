import React from 'react';
import styled from 'styled-components';
import variablesCSS from '../../css/variables';


const Wrapper = styled.span`
  display:inline-block;
  margin:2px;
  border-radius:6px;
  cursor:pointer;
  line-height:1;
  padding:8px;
  background:${variablesCSS.blue};
  color:#fff;
  &:hover {
    color:${variablesCSS.yellow};
  }
`

const CategoryList = props => {
  const { item, setCategory } = props;

  return (
    <Wrapper onClick={ setCategory() } data-id={item.idcategory} data-name={item.name}> {item.name}</Wrapper>
  )
}

export default CategoryList;
