import React from "react";
import { TextInput, StyleSheet, View } from "react-native";

const CustomInput = ({value, setValue, placeholder, secureTextEntry, onChangeText}) => {
    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                style={styles.inputControl}
                placeholderTextColor="black"
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 25,
        paddingVertical: 5,
    },

    inputControl: {
        height: 70,
        backgroundColor: 'white',
        paddingHorizontal: 25,
        borderRadius: 5,
        fontSize: 15,
        fontWeight: '400',
        color:'black',
    },
});

export default CustomInput;