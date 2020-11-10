import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Image, View, Text, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import AppButton from '../custom_components/button'

function HomeScreen(props: any) {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(63, 136, 234, 1)', 'transparent']}
                style={styles.gradient}
            />
            <Image
                source={require('../assets/javacs_ico.png')}
                style={styles.logo} />
            <Text style={[styles.textCenter, styles.title]}>BIENVENIDO</Text>
            <Text style={[styles.textCenter, styles.introduction]}>Únete a nosotros y empisa a disfrutar el mundo de programación</Text>
            <AppButton
                title="Iniciar sesión"
                style={styles.button}
                textColor="white"
                onPress={() => { props.navigation.navigate('Login') }} />
            <AppButton
                title="Registrate"
                style={styles.button}
                textColor="white"
                onPress={() => { props.navigation.navigate('Register') }} />

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    title: {
        fontSize: 40,
        backgroundColor: "rgb(10, 80, 245)",
        marginBottom: 25,
        padding: 10,
        color: "snow"
    },
    button: {
        width: wp("45%"),
        height: 50,
        borderWidth: 0,
        marginBottom: hp(4),
        backgroundColor: "rgb(10, 80, 245)",
        color: "black",
        elevation: 8
    },
    introduction: {
        paddingHorizontal: 20,
        marginBottom: hp(5),
        fontSize: 25
    },
    textCenter: {
        textAlign: "center"
    },
    logo: {
        width: wp("45%"),
        height: hp("25%"),
        resizeMode: 'contain',
        margin: "auto",
        marginVertical: hp(5),
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }
});


export default HomeScreen;