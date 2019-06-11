import React from 'react';
import styled from 'styled-components';
import ReactChartkick, { LineChart } from 'react-chartkick';
import variablesCSS from '../../css/variables';
import Chart from 'chart.js';

const FlexWrapper = styled.div`
  display:flex;
  justify-content:space-between;
  flex-flow: column wrap;
  align-items:flex-start;
  margin:0 20px 20px 20px;
  background:#fff;
  border-radius:3px;
  color:#1c232e;
`

const ChartContainer = styled.div`
  margin:0 15px;
  width:calc(100% - 30px);
`

const Topic = styled.span`
  display:block;
`

const SubTopic = styled.span`
  font-size:.7em;
  letter-spacing:.35px;
  font-family:${variablesCSS.categoryFont};
  text-transform: uppercase;
`

const Header = styled.div`
  margin-bottom:20px;
  padding:15px 20px;
  width:100%;
  background:${variablesCSS.gray};
`

const Title = styled.span`
  margin-left:10px;
  font-size:1.1;
  font-family:'SSPB';
`

const SubTitle = styled.span`
  margin-bottom:20px;
  margin-left:10px;
  font-family:'SSPL';
  font-size:.95em;
`

ReactChartkick.addAdapter(Chart);

const Visits = props => {
  const { uniqueVisits } = props;
  const month = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
  const newArray = uniqueVisits.totalVisitorsAndPageViews
    .map( item => ({[new Date(item.date.date).getDate() + ' ' + month[new Date(item.date.date).getMonth()]]: item.pageViews}))
    .sort()
    .reduce((obj1, obj2) => Object.assign(obj1, obj2), {})

  return (
    <FlexWrapper>
      <Header>
        <SubTopic>Wyświetlenia</SubTopic>
        <Topic>Unikatowa liczba dziennych wyświetleń</Topic>
      </Header>
      <ChartContainer>
        <LineChart
          data={newArray}
          colors={['#1c232e']}
          xtitle='Dzień tygodnia'
          ytitle="Wyświetlenia"
          messages={{ empty: 'Brak danych' }}
        />
      </ChartContainer>
    </FlexWrapper>
  )
}


export default Visits;
