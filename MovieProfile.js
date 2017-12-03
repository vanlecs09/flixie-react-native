import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


class MovieProfile extends Component {
    render() {
        const props = this.props.navigation.state.params;
        const img = {
            uri: `https://image.tmdb.org/t/p/w342${props.poster_path}`
        };
        return (
            <View style={{ flex: 1 }}>
                <Image style={styles.image} source={img}/>
                <View style={styles.textContainer}>
                    <Text style={styles.title}> {props.title} </Text>
                    <Text style={styles.overview}> {props.overview} </Text>
                    <Text style={styles.overview}> {props.vote_average} </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        width: screenWidth,
        height: screenHeight,
        position: 'absolute',
        top: 1,
    },

    textContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
    },

    title: {
        color: 'rgb(200, 200, 200)',
        fontSize: 18,
        fontWeight: '600',
    },

    overview: {
        color: 'rgb(200,200,200)'
    }

})

export default MovieProfile