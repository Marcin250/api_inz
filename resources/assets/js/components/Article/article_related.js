import React from 'react';
import styled from 'styled-components';
import RelatedList from './article_related_list';
import SectionHeader from '../Reusable/section_header';

const Section = styled.section`
  margin-top:40px;
`


const Related = props => {
  const {neighbours} = props;
  return (
    <Section>
      <SectionHeader margin='0 0 0 2.5px'>Powiązane artykuły</SectionHeader>
      <RelatedList neighbours = {neighbours} />
    </Section>
  )
}

export default Related;
