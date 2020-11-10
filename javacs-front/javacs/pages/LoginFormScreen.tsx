import React, {useState} from 'react';
import { View, Image, Text, TextInput, StyleSheet } from 'react-native';
import { FirebaseGoogleButton } from '../custom_components/firebaseGoogleButton';
import NextButton from '../custom_components/nextButton';
import { ImagesUtils } from '../tools/load_images';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { AuthService } from '../services/auth.service';

function checkInputs(user: string, password: string, navigator:any) {
    const auth = AuthService.getInstance()
    if (user == '' || user == undefined || user == null || password == null || password == undefined || password == '') {
        alert("Debes ingresar un usuario o una constraseña validos");
        return false;
    }

    auth.signIn(user, password)
    .then().catch(error => console.log(error));

}

function LoginFormScreen(props: any) {
    const images = new ImagesUtils();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Image
                    source={images.getImage("hi_robot")}
                    style={styles.titleImage} />
                <Text style={styles.titleText}>JAVACS</Text>
            </View>
            <Text style={styles.description}>Bienvenido a este gran grupo de estudiantes con ansias de aprender a programar</Text>
            <Text style={styles.loginTitle}>Inicio de sesión</Text>
            <TextInput
                placeholder="USUARIO"
                style={styles.input}
                onChangeText={user => setUser(user)}
                placeholderTextColor="#000" />
            <TextInput
                placeholder="CONTRASEÑA"
                style={styles.input}
                secureTextEntry={true}
                textContentType="password"
                onChangeText={password => setPassword(password)}
                placeholderTextColor="#000" />
            <NextButton style={styles.nextButton} onPress={() => { checkInputs(user, password, props.navigation) }}></NextButton>
            
            <FirebaseGoogleButton />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        backgroundColor: "rgb(192, 218, 252)"
    },
    title: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: hp("5%"),
        
    },
    titleImage: {
        width: wp(65),
        height: hp(45),
        marginRight: -100,
        marginLeft: -90,
        marginTop: -120,
        resizeMode: "contain"
    },
    titleText: {
        fontSize: 60,
        fontWeight: "bold"
    },
    input: {
        marginVertical: 15,
        padding: 5,
        borderWidth: 1,
        color: "black",
        width: 250,
        height: 50,
        textAlign: "center",
        fontSize: 20
    },
    loginTitle: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: "bold"
    },
    description: {
        width: 260,
        fontSize: 25,
        textAlign: "center",
        marginLeft: 90,
        marginTop: hp(-10),
        marginBottom: hp(4)
    },
    nextButton: {
        position: "absolute",
        right: 20,
        bottom: 20
    }
});

export default LoginFormScreen;