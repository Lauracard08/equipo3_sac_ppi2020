import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native';
import AppButton from '../custom_components/button';
import { MenuService } from '../services/menu.service';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { GoogleSignInService } from '../services/googleSignIn.service';
import { AuthService } from '../services/auth.service';
import { navigate } from '../tools/navigation';

const menuOption = (page: string, menu: MenuService) => {
    menu.changeMenuStatus();
    navigate(page, {});
}

const Menu = (props: any) => {
    const menu = MenuService.getInstance();
    const google = GoogleSignInService.getInstance();
    const auth = AuthService.getInstance();
    const [menuStatus, changeMenuStatus] = useState(false);
    menu.menuDispacher.subscribe(() => {
        changeMenuStatus(!menuStatus);
    });

    return (
        <View style={[styles.menuContainer, menuStatus ? styles.menuOpen : styles.menuClose]}>
            <View style={styles.menuHeader}>
                <Text style={styles.title}>Javacs</Text>
                {auth.userType ? (
                    <>
                        <Text style={[styles.text, styles.role]}>Docentes</Text>
                    </>
                ) : (
                        <>
                            <Text style={[styles.text, styles.role]}>Estudiantes programadores</Text>
                        </>
                    )}
            </View>
            <View style={styles.menuOptions}>
                {auth.userType ? (
                    <>
                        <Text style={[styles.text, styles.textButton]} onPress={() => { menuOption("Profile", menu) }}>Perfil</Text>
                        <Text style={[styles.text, styles.textButton]} onPress={() => { menuOption("Nivel", menu) }}>Agregar preguntas</Text>
                        <Text style={[styles.text, styles.textButton]} onPress={() => { menuOption("Progress", menu) }}>Progreso de estudiantes</Text>
                    </>
                ) : (
                        <>
                            <Text style={[styles.text, styles.textButton]} onPress={() => { menuOption("Dash", menu) }}>Inicio</Text>
                            <Text style={[styles.text, styles.textButton]} onPress={() => { menuOption("Nivel", menu) }}>Niveles</Text>
                            <Text style={[styles.text, styles.textButton]} onPress={() => { menuOption("Profile", menu) }}>Perfil</Text>
                        </>
                    )}
                <Text style={[styles.text, styles.textButton]} onPress={() => {
                    if (auth.loginMethod) {
                        alert("Ingresaste con google como proveedor esta acción no puede realizarse");
                    }
                    else {
                        auth.resetPawssword().then(_ => {
                            if (_) {
                                alert("Se ha enviado un correo electronico para restablecer la contraseña");
                            }
                        }).catch(error => {
                            alert("Ha ocurrido un error para restablecer la contraseña");
                        });
                    }
                }}>Cambiar Contraseña</Text>
            </View>
            <View style={styles.closeSessionContainer}>
                <Text style={[styles.text, styles.logout]} onPress={() => {
                    if (auth.loginMethod) {
                        google.signOutAsync();
                    }
                    else {
                        auth.signOut();
                    }
                }}>Cerrar sesión</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        color: "rgb(231, 232, 234)",
        fontSize: wp(8),
    },
    text: {
        color: "rgb(121, 132, 146)"
    },
    role: {
        fontSize: wp(4)
    },
    textButton: {
        padding: 20,
        fontSize: wp(4)
    },
    menuOpen: {
        height: hp(93)
    },
    menuClose: {
        height: hp(0)
    },
    menuContainer: {
        position: "absolute",

        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 8000
    },
    menuHeader: {
        height: hp(25),
        backgroundColor: "rgb(40, 52, 68)",
        zIndex: 10000,
        display: "flex",
        justifyContent: "center",
        paddingLeft: wp(10)
    },
    menuOptions: {
        height: hp(50),
        backgroundColor: "rgb(32, 45, 61)",
        borderBottomWidth: 1,
        borderBottomColor: "white",
        zIndex: 10000
    },
    closeSessionContainer: {
        height: hp(18),
        backgroundColor: "rgb(32, 45, 61)",
        zIndex: 10000
    },
    logout: {
        padding: 20,
        fontSize: wp(4)
    }
});

export default Menu;