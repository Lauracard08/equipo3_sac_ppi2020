import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, Alert } from 'react-native'
import Menu from "../custom_components/menu";
import { ImagesUtils } from "../tools/load_images";
import { AuthService } from "../services/auth.service";
import AppButton from "../custom_components/button";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MenuService } from '../services/menu.service';
import { GoogleSignInService } from '../services/googleSignIn.service';

function ProfileScreen(props: any) {
    const images = ImagesUtils.getInstance();
    const auth = AuthService.getInstance();
    const menu = MenuService.getInstance();
    const google = GoogleSignInService.getInstance();
    const [hideButton, changeButton] = useState(true);

    React.useEffect(() => {
        if (auth.userType)
            props.navigation.addListener('beforeRemove', (e: any) => {
                e.preventDefault();

                Alert.alert("¿En verdad quieres salir?",
                    "Si vuelves a atras la sesión actual sera cerrada",
                    [
                        { text: "Cancelar", style: "cancel", onPress: () => { } },
                        {
                            text: "Salir", style: "destructive",
                            onPress: () => {
                                if (auth.loginMethod) {
                                    google.signOutAsync()
                                }
                                else {
                                    auth.signOut();
                                }
                                props.navigation.dispatch(e.data.action)
                            }
                        }
                    ])
            })
    });

    menu.menuDispacher.subscribe(_ => {
        changeButton(!hideButton);
    });

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>{auth.userType ? 'Usuario docente' : 'Usuario estudiante'}</Text>
                {auth.user.photoUrl ? (
                    <>
                        <Image
                            source={{ uri: auth.user.photoUrl }}
                            style={styles.profilePicture} />
                    </>
                ) : (
                        <>
                            <Image
                                source={images.getImage('logo')}
                                style={styles.profilePicture} />
                        </>
                    )}
                {hideButton ? (
                    <>
                        <AppButton title="Cambiar foto de perfil" textColor="snow" style={styles.profileButton}></AppButton>
                    </>
                ) : null}
            </View>
            <View style={styles.information}>
                <Text style={styles.infoTitle}>Nombre:</Text>
                <Text style={styles.info}>{auth.user.firstName} {auth.user.lastName}</Text>
                <Text style={styles.infoTitle}>Correo electronico:</Text>
                <Text style={styles.info}>{auth.user.email}</Text>
            </View>
            <Image
                source={images.getImage('iron_robot')}
                style={styles.robot} />
            <Menu></Menu>
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
    headerContainer: {
        display: "flex",
        alignItems: "center"
    },
    title: {
        fontSize: wp(6),
        fontWeight: "bold",
        marginVertical: 30
    },
    profilePicture: {
        width: wp(30),
        height: hp(20),
        marginBottom: 20,
        borderRadius: 100
    },
    profileButton: {
        width: wp(70),
        backgroundColor: "rgb(73, 82, 93)"
    },
    information: {
        display: "flex",
        alignItems: "center"
    },
    infoTitle: {
        fontSize: wp(7),
        fontWeight: "bold",
        marginBottom: 5
    },
    info: {
        fontSize: wp(4.5)
    },
    robot: {
        width: wp(50),
        height: hp(50),
        position: "absolute",
        bottom: -130,
        right: -40
    }
});

export default ProfileScreen;