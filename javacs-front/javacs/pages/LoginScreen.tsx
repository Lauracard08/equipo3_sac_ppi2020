import React from 'react';
import AppButton from '../custom_components/button'

import { View, Text, StyleSheet, Image } from 'react-native';

//tools
import { ImagesUtils } from '../tools/load_images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AuthService } from '../services/auth.service';

function LoginScreen(props: any) {
    var images = new ImagesUtils();
    const auth = AuthService.getInstance();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>JAVACS</Text>
            <Text style={styles.body}>Selecciona un tipo de usuario</Text>
            <AppButton
                title="Estudiante"
                style={styles.button}
                icon="student"
                onPress={() => {
                    auth.userType = false;
                    auth.storeData('userType', "0");
                    props.navigation.navigate('LoginForm');
                }} />
            <AppButton
                title="Docente"
                style={styles.button}
                icon="teacher"
                onPress={() => {
                    auth.userType = true;
                    auth.storeData('userType', "1");
                    props.navigation.navigate('LoginForm');
                }} />
            <Image
                source={images.getImage("cute_robot")}
                style={styles.robot} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        backgroundColor: "rgb(192, 218, 252)"
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        marginTop: 100,
    },
    body: {
        fontSize: 20,
        marginVertical: 50,
        marginBottom: 100
    },
    button: {
        backgroundColor: "rgb(192,218,252)",
        width: wp("80%"),
        height: hp("10%"),
        borderWidth: 1
    },
    robot: {
        position: "absolute",
        width: wp("80%"),
        height: hp("50%"),
        bottom: -80,
        right: -60,
        zIndex: -1
    }
});

export default LoginScreen;