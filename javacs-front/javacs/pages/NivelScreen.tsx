import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AppButton from '../custom_components/button';
import { ImagesUtils } from '../tools/load_images';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Menu from '../custom_components/menu';
import { MenuService } from '../services/menu.service';
import { AuthService } from '../services/auth.service';

const auth = AuthService.getInstance();
const menu = MenuService.getInstance();

function redirectAction(navigation: any, selection: string) {
    if (auth.userType) {
        menu.nivelSelected = selection;
        navigation.navigate('AddQuestion');
    }
    else {
        menu.nivelSelected = selection;
        navigation.navigate('Info');
    }
}

function NivelScreen(props: any) {
    const images = new ImagesUtils();
    const menu = MenuService.getInstance();
    const [hideButton, changeHideStatus] = useState(true);

    menu.menuDispacher.subscribe(() => {
        changeHideStatus(!hideButton);
    });

    return (
        <View style={styles.container}>
            {auth.userType ? (
                <>
                    <Text style={styles.title}>AGREGAR PREGUNTAS</Text>
                    <Text style={styles.subtitle}>Aca podras agregar preguntas personalizadas a tus alumnos</Text>
                    <Text style={styles.explain_teacher}>Escoge a que nivel quieres agregarle preguntas</Text>
                </>
            ) : (
                    <>
                        <Text style={styles.title}>NIVELES</Text>
                        <Text style={styles.subtitle}>Selecciona un nivel</Text>
                        <Text style={styles.explain}>En el primer nivel podrás visualizar ¿Qué es Java?,
            en el segundo "La Sintaxis" y el tercero "Expresiones Propias del Sistema"</Text>
                    </>
                )}
            <View style={styles.buttonsContainer}>
                {hideButton ? (
                    <>
                        <AppButton title="Java" icon="java" style={styles.button} onPress={() => redirectAction(props.navigation, "java")} />
                        <AppButton title="SINTAXIS" icon="java" style={styles.button} onPress={() => redirectAction(props.navigation, "sintaxis")} />
                        <AppButton title="EXPRESIONES PROPIAS DEL SISTEMA" icon="java" style={styles.button} onPress={() => redirectAction(props.navigation, "epds")} />
                    </>
                ) : null}

            </View>
            <Image
                source={images.getImage("lost_robot")}
                style={styles.robot} />
            <Menu></Menu>
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
        fontSize: wp(9),
        marginVertical: hp(2),
        fontWeight: "bold"
    },
    subtitle: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: hp(2)
    },
    explain: {
        fontSize: wp(4),
        paddingHorizontal: wp(5),
        marginBottom: hp(2)
    },
    explain_teacher: {
        fontSize: wp(5),
        textAlign: "center",
        marginBottom: 10
    },
    buttonsContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center"
    },
    button: {
        backgroundColor: "rgb(192,218,252)",
        width: wp(90),
        height: hp(10),
        borderWidth: 1,
    },
    robot: {
        width: wp(55),
        height: hp(55),
        marginTop: -80,
        marginLeft: -220
    }
});

export default NivelScreen;