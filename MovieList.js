import React from 'react';
import { Text, FlatList, StyleSheet, View, ActivityIndicator, Image } from 'react-native';
import { SearchBar } from 'react-native-elements'
import MovieCard from './MovieCard.js';
import TabNavigator from 'react-native-tab-navigator';

export default class MovieList extends React.Component {
    constructor(props) {
        super(props);
        this.renderListView = this.renderListView.bind(this);
        this.state = {
            selectedTab: 'NowPlaying',
            isSearchingMovie: false,
        }
    }

    renderSearchBar() {
        const screenProps = this.props.screenProps;
        let renderObj =
            <SearchBar
                onChangeText={(text) => {screenProps.onSearching(text)}}
                placeholder='Type Here...' 
                onSubmitEditing={(text) => {screenProps.onSearchEnter(text)}}
                onClearText = {() => {alert('1')}}/>
        return renderObj
    }


    renderListView() {;
        const screenProps = this.props.screenProps;
        const navigate = this.props.navigation.navigate;
        return (
            <View style={styles.container}>
                {this.renderSearchBar()}
                <FlatList
                    data={screenProps.movies}
                    keyExtractor={(movie) => movie.id}
                    renderItem={(movieItem) => <MovieCard {...movieItem.item} loadProfile={() => {
                        navigate('MovieProfile', movieItem.item)
                    }} />}
                    onEndReached={screenProps.loadMore}
                    onEndReachedThreshold={0.05}
                    refreshing={screenProps.loading}
                    ListFooterComponent={
                        <View style={{ flex: 1, padding: 10 }}>
                            <ActivityIndicator size="large" />
                        </View>
                    }
                />
            </View>)

    }

    render() {
        const screenProps = this.props.screenProps;
        const navigate = this.props.navigation.navigate;
        return (<TabNavigator style={styles.TabNavigator}>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'NowPlaying'}
                title="Now Playing"
                renderIcon={() => <Image source={require('./now-playing-normal.png')} />}
                renderSelectedIcon={() => <Image source={require('./now-playing-normal.png')} />}
                onPress={() => {
                    this.setState({ selectedTab: 'NowPlaying' })
                    screenProps.onChangeTab('NowPlaying');
                }}>
                {this.renderListView()}
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'TopRated'}
                title="Top Rated"
                renderIcon={() => <Image source={require('./top-rate-normal.png')} />}
                renderSelectedIcon={() => <Image source={require('./top-rate-normal.png')} />}
                onPress={() => {
                    this.setState({ selectedTab: 'TopRated' })
                    screenProps.onChangeTab('TopRated');
                }}>
                {this.renderListView()}
            </TabNavigator.Item>
        </TabNavigator>)
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(220, 220, 220, 0.87)',
    },

    tabNavigator: {
        height: 300,
    }
})