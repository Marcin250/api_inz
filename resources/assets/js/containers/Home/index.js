import React, { Component } from 'react';
import MainArticle from '../../components/Home/main_article';
import LatestResult from '../../components/Home/latest_result';
import LeagueTable from '../../components/Home/league_table';
import SmallNews from '../../components/Home/small_news';
import Schedule from '../../components/Home/fixtures_upcoming';
import LatestNews from '../../components/Home/latest_news';
import StrawPoll from '../../components/Home/Poll';
import NextMatch from '../../components/Home/next_match';
import Injuries from '../../components/Home/injuries';
import SocialMedia from '../../components/Home/social_media';
import styled from 'styled-components';

//api calls
import { API } from '../../helpers/api';

const Main = styled.main`
  display:flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-bottom:100px;
`

const Container = styled.div`
  width:100%;
`

const RestNewsAndPolls = styled.section`
  flex:2;
  margin-right:10px;
`

const RestNews = styled.section`
  align-content:flex-start;
  display:flex;
  margin-left:5px;
  flex-flow:row wrap;
  justify-content:space-between;
`

const Polls = styled.section`
  margin-top:20px;
  padding:0 10px;
  display:flex;
  align-items: flex-start;
  flex-flow:row wrap;
  justify-content:space-between;
`

const TableAndSocial = styled.section`
  flex:.9;
  padding:0 10px;
`

const FixturesInfo = styled.section`
  width:100%;
  padding:0 10px;
  display:flex;
  justify-content:space-between;
  flex-flow: row wrap;
`

class Home extends Component {
  constructor (props)
  {
	  super(props);
	  this.state = {
    loadingStatus: true,
    articles: [],
    schedule: [],
    leagueTable: [],
    latestResult: [],
    pollData: [],
    injuriesData: []
  };
  }
  async componentDidMount() {
    const articles = await API.get('articles_latest/22'),
          schedule = await API.get('upcomingmatches_get_upcoming_matches/4'),
          leagueTable = await API.get('leaguescoreboard_get_league_scoreboard/2018-2019/PD'),
          latestResult = await API.get('latestmatchresult_get_latest_match_result'),
          pollData = await API.get('surveys_latest/1'),
          injuriesData = await API.get('injuriessuspensions_actual_injuries');

    this.setState({ articles, schedule, leagueTable, latestResult, pollData, injuriesData });
    this.setState({ loadingStatus: false });
  }

  render() {
    const { articles, schedule, leagueTable, latestResult, pollData, injuriesData, loadingStatus } = this.state;

    if(loadingStatus) return <div style={{color: 'black'}}>loading data</div>
    const mainArticle = articles.slice(0, 1),
          asideArticles = articles.slice(1, 3),
          lastestNewsBig = articles.slice(3, 9),
          smallNews = articles.slice(10, 19),
          nextMatch = schedule[0],
          upcomingMatches = schedule.slice(1, 4);

    return (
      <Container>
        <MainArticle mainArticle={ mainArticle } asideArticles={ asideArticles } />
        <Main>
          <FixturesInfo>
            <LatestResult latestResult={latestResult} />
            <NextMatch  nextMatch={nextMatch} />
            <Schedule schedule={upcomingMatches}/>
          </FixturesInfo>
          <LatestNews latestArticles={lastestNewsBig} />
          <RestNewsAndPolls>
            <RestNews>
              { smallNews.map((item, key) => <SmallNews key={ key } data={ item } />) }
            </RestNews>
            <Polls>
              <StrawPoll pollData={pollData} />
              <Injuries injuriesData={injuriesData} />
            </Polls>
          </RestNewsAndPolls>
          <TableAndSocial>
            <LeagueTable leagueTable={leagueTable} />
            <SocialMedia />
          </TableAndSocial>
        </Main>
      </Container>
    )
  }
}

export default Home;