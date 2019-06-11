import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Wrapper from '../Reusable/wrapper';

const Section = styled.section`
  display:flex;
  align-items:center;
  flex-flow: row wrap;
  justify-content:center;
  width:100%;
  height:320px;
  position:relative;
  margin-bottom:10px;
  background: url('/img/match_bg2.png') no-repeat;
  &:before {
    content:'';
    width:100%;
    height:100%;
    background-color:#00529f;
    mix-blend-mode: overlay;
    position:absolute;
    left:0;
    top:0;
  }
`

const MatchWrapper = styled.div`
  display:flex;
  flex-flow:row nowrap;
  align-items:center;
`

const TeamName = styled.span`
  display:none;
  margin-top:20px;
  font-family:'Bebas';
  font-size:1.8em;
  line-height:.9;
  @media (min-width: 480px) {
    display:block;
    font-size:2em;
  }
  @media (min-width: 640px) {
    font-size:3em;
  }
`

const MatchInfo = styled.div`
  position:relative;
  z-index:1;
  min-width:170px;
  margin: 0 5px;
  margin-top:-20px;
  > span {
    display:block;
    text-align:center;
  }
  @media (min-width: 480px) {
    margin: 0 15px;
  }
  @media (min-width: 640px) {
    margin: 0 30px;
  }
`

const FixtureName = styled.span`
  font-size: .9em;
  font-family:'AvenirLTB';
  @media (min-width: 480px) {
    font-size: 1.2em;
  }
`

const Date = styled.span`
  font-size:.8em;
  font-family:'AvenirLTD';
  margin:2px 0 4px 0;
`

const Result = styled.span`
  margin-top:12px;
  font-size:2.5em;
  color:#FEBE10;
  font-family:'Bebas';
  line-height:.9;
  @media (min-width: 480px) {
    font-size:4em;
  }
`

const Location = styled.span`
  display:block;
  text-align:center;
  font-size:.8em;
  text-transform: uppercase;
  margin-top:6px;
  font-family:"AvenirLTD";
`

const Text = styled.span`
  display:block;
  margin-bottom:30px;
  font-size:1.6em;
  font-family:"Bebas";
`

const ImageWrapper = styled.figure`
  margin:0 5px;
  @media (min-width: 480px) {
    margin:0 30px;
  }
`

const Image = styled.img`
  height:65px;
  @media (min-width: 480px) {
    height:75px;
  }
  @media (min-width: 640px) {
    height:100px;
  }
`

const Team = styled.div`
  position:relative;
  z-index:1;
  display:flex;
  flex-flow:column wrap;
  justify-content:space-between;
  align-items:center;
`

const Infomation = styled.span`
  position:relative;
  z-index:1;
  font-size:1.1em;
  text-align:center;
`

const NextMatch = props => {
  const { away_team, home_team, date, league, location } = props.data;
  return (
    <Section>
    {
      props.data.length
      ? (
        <Fragment>
          <Team>
            <ImageWrapper>
              <Image src={home_team.image}/>
            </ImageWrapper>
            <TeamName>{home_team.short_name}</TeamName>
          </Team>
          <MatchInfo>
            <Text>Najbliższy mecz</Text>
            <FixtureName>{league}</FixtureName>
            <Date>{date}</Date>
            <Result>vs.</Result>
            <Location>{location === 'HOME' ? 'mecz u siebie' : 'mecz na wyjeździe' }</Location>
          </MatchInfo>
          <Team>
            <ImageWrapper>
              <Image src={away_team.image}/>
            </ImageWrapper>
            <TeamName>{away_team.short_name}</TeamName>
          </Team>
        </Fragment>
      ) : <Infomation>Koniec sezonu – brak nadchodzących meczów.</Infomation>
    }
    </Section>
  )
}

export default NextMatch;
