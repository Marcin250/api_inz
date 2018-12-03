import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
  display:flex;
  width:100%;
  min-width:330px;
  align-items:center;
  background: #00529f;
  height:170px;
  font-family:'DoHyeon';
  justify-content:center;
`

const Result = styled.div`
  display:flex;
  flex-flow:column nowrap;
  justify-content: center;
  flex:6;
`

const Image = styled.img`
  height:80px;
  align-self: center;
`

const TeamName = styled.span`
  text-transform: uppercase;
  display:block;
  margin-top:12px;
  font-size:.95em;
  letter-spacing:1px;
  text-align:center;
  word-break:none;
`

const Team = styled.div`
  display:flex;
  flex-flow:column nowrap;
  justify-content:center;
`

const Fixtures = styled.div`
  font-family:'AvenirR';
  font-size:.8em;
  margin:0 auto;
  text-transform: 'capitalize';
  line-height:1.5em;
`

const FixturesInfo = styled.span`
  text-align:center;
  position:relative;
  font-size:1.1em;
  display:block;
  &:nth-child(3) {
    padding-bottom:16px;
    &:before {
      content: '';
      position:absolute;
      width:25px;
      height:1px;
      background: white;
      transform: translateX(-50%);
      left:50%;
      bottom:7px;
    }
  }
`

const TeamWrapper = styled.div`
  display:flex;
  flex-flow:row nowrap;
  justify-content:center;
  flex:7;
  align-items:flex-start;
`

const NextMatchItem = props => {
  const { date, league, club, location } = props.data;

  return (
    <Container>
      <TeamWrapper>
        <Team>
          <Image src='https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg' />
          <TeamName>real madrid</TeamName>
        </Team>
      </TeamWrapper>
      <Result>
        <Fixtures>
          <FixturesInfo>{league}</FixturesInfo>
          <FixturesInfo>{new Date(date).toLocaleString()}</FixturesInfo>
          <FixturesInfo>{location === 'HOME' ? 'Mecz domowy' : 'Mecz wyjazdowy' }</FixturesInfo>
          <FixturesInfo><u>Centrum meczowe</u></FixturesInfo>
        </Fixtures>
      </Result>
      <TeamWrapper>
        <Team>
          <Image src={club.image} />
          <TeamName>{club.name}</TeamName>
        </Team>
      </TeamWrapper>
    </Container>
  )
}

export default NextMatchItem;