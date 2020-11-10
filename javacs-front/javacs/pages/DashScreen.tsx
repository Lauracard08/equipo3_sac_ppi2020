import React from 'react';
import { StyleSheet, View, Text, Image, Alert } from 'react-native';
import NextButton from '../custom_components/nextButton';
import { ImagesUtils } from '../tools/load_images';
import Menu from '../custom_components/menu';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AuthService } from '../services/auth.service';
import { GoogleSignInService } from '../services/googleSignIn.service';

function DashScreen(props: any) {
    const auth = AuthService.getInstance();
    const google = GoogleSignInService.getInstance();

    React.useEffect(() => {
        props.navigation.addListener('beforeRemove', (e: any) => {
            e.preventDefault();

            Alert.alert("¿En verdad quieres salir?",
            "Si vuelves a atras la sección actual sera cerrada",
            [
                {text: "Cancelar", style: "cancel", onPress: () => {} },
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¿Qué es Javacs?</Text>
            <Text style={styles.description}>Es una plataforma a la disposición de los estudiantes
                con el objectivo de aprender sobre el lenguaje de Java.
            </Text>
            <View style={styles.wireContainer}>
                <Text style={styles.wireText}>Importante: Esta plataforma solo esta a disposición de
                    estudiantes de 9 grado de la Instutición Educativa Santos
                    Ángeles Custodios que sean aspirantes a la media técnica.
                </Text>
            </View>
            <Text style={styles.temas}>¿Que temas se trabajan?</Text>
            <View style={styles.listContainer}>
                <Text style={styles.listItem}>- Java</Text>
                <Text style={styles.listItem}>- Sintaxis</Text>
                <Text style={styles.listItem}>- Expresiones propias del sistema</Text>
            </View>
            <NextButton 
                style={styles.nextButton}
                onPress={() => {props.navigation.navigate("Nivel")}} />

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
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: hp(4),
        marginBottom: hp(4),
    },
    description: {
        fontSize: wp(5),
        paddingHorizontal: wp(5),
        fontWeight: "800"
    },
    nextButton: {
        position: "absolute",
        right: 20,
        bottom: 10
    },
    wireContainer: {
        marginTop: hp(4),
        borderWidth: 10,
        marginHorizontal: wp(5)
    },
    wireText: {
        fontSize: 15,
        fontWeight: "900",
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    temas: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: hp(2)
    },
    listContainer: {
        borderWidth: 1,
        padding: wp(5),
        marginTop: 20
    },
    listItem: {
        fontSize: 18
    }
});

export default DashScreen;