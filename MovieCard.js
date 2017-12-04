import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';
import Image from 'react-native-image-progress';
import Progress from 'react-native-progress';
import ProgressBar from 'react-native-progress/Circle';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class MovieCard extends React.Component {
    constructor(props) {
        super(props);
        this.renderGrid = this.renderGrid.bind(this);
        this.renderSingleRow = this.renderSingleRow.bind(this);
    }

    renderGrid() {
        const img = {
            uri: `https://image.tmdb.org/t/p/w342${this.props.poster_path}`
        }
        return (
            <View style = {gridStyles.container}>
                <Image
                    style={gridStyles.image}
                    source={img}
                    indicator={ProgressBar} 
                    resizeMode={'contain'} />
                <View>
                    <Text style={gridStyles.textHeader}> 
                        {this.props.original_title} 
                    </  Text>
                </View>
            </View>
        )   
    }

    renderSingleRow() {
        const img = {
            uri: `https://image.tmdb.org/t/p/w342${this.props.poster_path}`
        }
        return (
            <View style={singleRowStyles.container}>
                <Image
                    style={singleRowStyles.image}
                    source={img}
                    indicator={ProgressBar} 
                    resizeMode={'contain'} />
                <View>
                    <View>
                        <Text style={singleRowStyles.textHeader}> {this.props.original_title} </  Text>
                    </View>
                    <View style={singleRowStyles.textBodyContainer}>
                        <Text style={singleRowStyles.textOverview}
                            numberOfLines={5}
                        >{this.props.overview}</Text>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        const renderMode = this.props.renderMode;
        return (<TouchableHighlight
            underlayColor = 'rgba(0, 0, 0, 0.2)'
            onPress={this.props.loadProfile}>
            {renderMode == 'grid' ? this.renderGrid() : this.renderSingleRow()}
        </TouchableHighlight>)
    }
}

const gridStyles = StyleSheet.create({
    container: {
        width : screenWidth/3,
        flex: 1,
        flexDirection: 'column',
        marginTop: 10,
    },

    image: {
        width: screenWidth/3, height: 150, 
        alignSelf: 'stretch'
    },

    textHeader: {
        width: 250,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign : 'center',
        width : screenWidth/3 - 10,
    },

    textOverview: {
        flexWrap: "wrap",
    },

    textBodyContainer: {
        marginTop: 5,
        marginLeft: 10,
        width: 250,
        height: 50
    }
})


const commonStyle = StyleSheet.create({
    button : {
        backgroundColor: '#DDDDDD',
    }
})

const singleRowStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10
    },

    image: {
        width: 100, height: 150, 
        alignSelf: 'stretch'
    },

    textHeader: {
        width: 250,
        fontSize: 15,
        fontWeight: 'bold'
    },

    textOverview: {
        flexWrap: "wrap",
    },

    textBodyContainer: {
        marginTop: 5,
        marginLeft: 10,
        width: 250,
        height: 50
    }
})
