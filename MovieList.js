import React from 'react';
import { Text, FlatList, StyleSheet, View, ActivityIndicator, Image, Dimensions } from 'react-native';
import { SearchBar, Button } from 'react-native-elements'
import MovieCard from './MovieCard.js';
import TabNavigator from 'react-native-tab-navigator';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class MovieList extends React.Component {
    constructor(props) {
        super(props);
        this.renderListView = this.renderListView.bind(this);
        this.state = {
            selectedTab: 'NowPlaying',
            isSearchingMovie: false,
            renderMode : 'singleRow',
            numColumns : 1,
        }
    }
    
    changeRenderViewListMode() {
        this.setState({
            renderMode : this.state.renderMode == 'singleRow' ? 'grid' : 'singleRow',
            numColumns : this.state.renderMode == 'singleRow' ? 3 : 1
        })
    }

    renderSearchBar() {
        const screenProps = this.props.screenProps;
        let renderObj =
            <View >
                <SearchBar style={topViewStyles.searchbar}
                    onChangeText={(text) => { screenProps.onSearching(text) }}
                    placeholder='Type Here...'
                    onSubmitEditing={(text) => { screenProps.onSearchEnter(text) }}
                />
                <Button style = {topViewStyles.buttonViewMode}
                    onPress = {() => {this.changeRenderViewListMode()}}
                     />
            </View>
        return renderObj
    }


    renderListView(renderMode) {
        const screenProps = this.props.screenProps;
        const navigate = this.props.navigation.navigate;
        return (
            <View style={styles.container}>
                {this.renderSearchBar()}
                <FlatList
                    data={screenProps.movies}
                    keyExtractor={(movie) => movie.id}
                    renderItem={(movieItem) => <MovieCard 
                        {...movieItem.item}
                        renderMode = {this.state.renderMode}
                        loadProfile={() => {
                        navigate('MovieProfile', movieItem.item)
                    }} />}
                    key = {( this.state.renderMode == 'singleRow' ) ? 1 : 0 }
                    onEndReached={screenProps.loadMore}
                    onEndReachedThreshold={0.05}
                    refreshing={screenProps.loading}
                    numColumns={this.state.numColumns}
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

const topViewStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },

    searchbar: {
        width: screenWidth * (2 / 3)
    },

    buttonViewMode: {
        top : 2,
        width: 20,
        height: 20,
        bottom : 2,
    }
})