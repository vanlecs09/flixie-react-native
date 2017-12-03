import React from 'react';
import {View, Image, Text, TouchableHighlight, StyleSheet} from 'react-native';

export default class MovieCard extends React.Component {
    render() {
        const img = {
            uri : `https://image.tmdb.org/t/p/w342${this.props.poster_path}`
        }
        return (
            <TouchableHighlight onPress = {this.props.loadProfile}>
                <View style={styles.container}>
                    <Image 
                        style={{width: 100, height : 150, alignSelf: 'stretch',}} 
                        source = {img} 
                        resizeMode={'contain'}/>
                    <View>
                        <View>
                            <Text style={styles.textHeader}> {this.props.original_title} </  Text>
                        </View>
                        <View style={styles.textBodyContainer}>
                            <Text style={styles.textOverview}
                            // ellipsizeMode = 'mid'
                            numberOfLines = {5}
                            >{this.props.overview}</  Text>
                        </View>
                        {/* <Text> [th] */}
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'row',
        marginTop : 10
    },

    textHeader : {
        width : 250,
        fontSize: 15,
        fontWeight: 'bold'
    },

    textOverview : {
        flexWrap: "wrap",
    },

    textBodyContainer: {
        marginTop : 5,
        marginLeft : 10,
        // marginRight : 5,
        width : 250,
        height : 50
    }
})
