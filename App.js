import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import TEST_DATA from './data.json'
import MovieList from './MovieList.js'
import MovieProfile from './MovieProfile.js'
import {StackNavigator} from 'react-navigation'

const api_key = "a07e22bc18f5cb106bfe4cc1f83ad8ed"

const Routes = StackNavigator({
  MovieList: {screen:MovieList},
  MovieProfile: {screen:MovieProfile},
})

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.fetchPage = this.fetchPage.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.onSearching = this.onSearching.bind(this);
    this.onSearchFinish = this.onSearchFinish.bind(this);
    this.onSearchEnter = this.onSearchEnter.bind(this);
    this.onChangeTab = this.onChangeTab.bind(this);

    this.state = {
      movies : [],
      loading : false,
      page : 1,
      isSearching: false,
      tabMode: 'NowPlaying'
    }
  }

  componentWillMount(props) {
    console.log("component will mount");
    this.fetchPage(this.state.page)
  }

  getUrl() {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&page=${this.state.page}`;
    if(this.state.isSearching) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${this.state.keyword}&page=${this.state.page}`
    } else {
      if(this.state.tabMode == 'TopRated') {
        console.log("top rate mode");
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&page=${this.state.page}&sort_by=vote_average.desc`;
      } else if(this.state.tabMode == 'NowPlaying') {
        console.log("now playing mode");
        url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&page=${this.state.page}`;
      }
    }

    return url;
  }

  fetchPage(page) {
    console.log("fetchPage");
    let url = this.getUrl();
  
    this.setState({
      loading : true
    }, () => {
        fetch(url)
        .then((data) => data.json())
        .then((json) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(json)
            }, 2000)
          })
        })
        .then((json) => {
          const mSet = new Set([...this.state.movies.map(m => m.id)])
          const plusSet = json.results.filter((m) => !mSet.has(m.id))
          this.setState({
            movies : this.state.movies.concat(plusSet),
            loading : false,
          })
        })
    })
  }

  loadMore() {
    console.log("load more");
    let newPage = this.state.page + 1;
    this.setState( {
      page : newPage
    }, () => {
      
      this.fetchPage(newPage)
    })
  }

  onSearching(text) {
    if(text == '') {
      this.onSearchFinish();
    } else {
      this.setState({
        isLoading : true,
        movies : [],
        keyword: text,
        isSearching: true,
      })
    }
  }

  onSearchEnter() {
    console.log("on search enter");
    this.setState({
      isLoading : false,
      movies : [],
      page : 1
    }, () => {
      this.fetchPage(this.state.page)
    })
  }

  onSearchFinish() {
    console.log("on search finish")
    let newPage = 1;
    this.setState( {
      page : newPage,
      isSearching: false,
      keyword : ''
    }, () => {
      this.fetchPage(newPage)
    })
  }

  onChangeTab(tabMode) {
    console.log("on change tab " + tabMode);
    this.setState({
      tabMode: tabMode,
      page : 1,
      movies : [],
    }, () => {
      this.fetchPage(this.state.page);
    })
  }

  render() {
    return (
          <Routes screenProps= {{
            movies: this.state.movies,
            loading: this.state.loading, 
            loadMore: this.loadMore,
            onSearching: this.onSearching,
            onSearchEnter: this.onSearchEnter,
            onSearchFinish: this.onSearchFinish,
            onChangeTab: this.onChangeTab
          }}
          /> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
