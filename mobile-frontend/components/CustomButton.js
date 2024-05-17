import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";

const CustomButton = ({onPress, text}) => {
    
    return (
        <View style={styles.root}>
            <TouchableOpacity onPress={onPress} style={styles.container}>
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        paddingHorizontal: 25,
        paddingTop: 10,
    },

    container:{
        backgroundColor: 'black',
        alignSelf: 'center',
        width: '100%',
        paddingVertical: 25,
        borderRadius: 5,
    },

    text: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: '800',
        color: 'white'
    }

});

export default CustomButton;