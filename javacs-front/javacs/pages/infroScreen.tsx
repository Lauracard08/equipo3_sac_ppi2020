import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Image, Linking, TouchableHighlight } from 'react-native';
import Menu from '../custom_components/menu';
import NextButton from '../custom_components/nextButton';
import { MenuService } from '../services/menu.service';
import { ImagesUtils } from '../tools/load_images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const menu = MenuService.getInstance();
const image = ImagesUtils.getInstance();

const javaDocument = "https://firebasestorage.googleapis.com/v0/b/javacs-f213a.appspot.com/o/QU%C3%89%20ES%20JAVA.pdf?alt=media&token=270c851c-07b9-4db0-ae51-9e6c55a4e34d";
const javaVideo = "https://firebasestorage.googleapis.com/v0/b/javacs-f213a.appspot.com/o/Que%20es%20Java.mp4?alt=media&token=d08e2b65-d92f-47c5-8c39-9f1c932c0985";
const sintaxisDocument = "https://firebasestorage.googleapis.com/v0/b/javacs-f213a.appspot.com/o/SINTAXIS.pdf?alt=media&token=b8ab88f3-f96b-47b8-aa58-3c0906b0d072";
const sintaxisVideo = "https://firebasestorage.googleapis.com/v0/b/javacs-f213a.appspot.com/o/Sintaxis%20de%20java%20y%20comentarios%20-%20Curso%20Java.mp4?alt=media&token=33b2813b-fdb3-48f7-afcb-440beb98262e";
const epdsDocument = "https://firebasestorage.googleapis.com/v0/b/javacs-f213a.appspot.com/o/expresiones.doc.pdf?alt=media&token=46e9e242-3579-4f07-b582-fdb02222ea92";
const epdsVideo = "https://firebasestorage.googleapis.com/v0/b/javacs-f213a.appspot.com/o/Ejercicios%20Java%20-%20Expresiones%20regulares%201%20Validando%20un%20DNI%20y%20un%20nombre.mp4?alt=media&token=f340eae6-26b5-461d-8045-1986822f2846";

async function _openUrl(url: any) {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
        await Linking.openURL(url);
    } else {
        alert("Error abriendo la url");
    }
}

function InfoScreen(props: any) {
    menu.correct_answers = 0;

    return (
        <View style={styles.container}>
            {menu.nivelSelected == "java" ? (
                <>
                    <Text style={styles.title}>Nivel 1: ¿Qué es Java?</Text>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>En este nivel aprenderas lo que es Java, te dejamos material de apoyo para que puedas mejorar tus conocimientos.</Text>
                    </View>
                    <View style={styles.files}>
                        <TouchableHighlight onPress={_ => _openUrl(javaDocument)}>
                            <View>
                                <Image
                                    style={styles.file}
                                    source={image.getImage('pdf')} />
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={_ => _openUrl(javaVideo)}>
                            <View>
                                <Image
                                    style={styles.file}
                                    source={image.getImage('mp4')} />
                            </View>
                        </TouchableHighlight>
                    </View>
                    <Image
                        style={styles.robot}
                        source={image.getImage('mature')} />
                    <NextButton onPress={() => props.navigation.navigate('Question')} />
                </>
            ) : null}
            {menu.nivelSelected == "sintaxis" ? (
                <>
                    <Text style={styles.title}>Nivel 2: "Sintaxis"</Text>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>En este nivel verás lo que es la estructura y apariencia de la escritura del código Java.</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>A continuación, podrás ver en el PDF o en el video mas información sobre lo que es "Sintaxis"
                        , para un conocimiento más profundo del tema, y un mejor resultado en la evaluación.</Text>
                    </View>
                    <View style={styles.files}>
                        <TouchableHighlight onPress={_ => _openUrl(sintaxisDocument)}>
                            <View>
                                <Image
                                    style={styles.file}
                                    source={image.getImage('pdf')} />
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={_ => _openUrl(sintaxisVideo)}>
                            <View>
                                <Image
                                    style={styles.file}
                                    source={image.getImage('mp4')} />
                            </View>
                        </TouchableHighlight>
                    </View>
                    <Image
                        style={styles.robot}
                        source={image.getImage('mature')} />
                    <NextButton onPress={() => props.navigation.navigate('Question')} />
                </>
            ) : null}
            {menu.nivelSelected == "epds" ? (
                <>
                    <Text style={styles.title}>Nivel 3:</Text>
                    <Text style={styles.subtitle}> ¿Que son las expresiones propias del sistema?</Text>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>En este nivel verás lo que es la estructura y apariencia de la escritura del código Java.</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>Una expresión es una seria de variables, operadores y llamadas a métodos
                        (construida de acuerdo a la sintaxis del lenguaje) que evalúa a un valor sencillo.</Text>
                    </View>
                    <View style={styles.files}>
                        <TouchableHighlight onPress={_ => _openUrl(epdsDocument)}>
                            <View>
                                <Image
                                    style={styles.file}
                                    source={image.getImage('pdf')} />
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={_ => _openUrl(epdsVideo)}>
                            <View>
                                <Image
                                    style={styles.file}
                                    source={image.getImage('mp4')} />
                            </View>
                        </TouchableHighlight>
                    </View>
                    <Image
                        style={styles.robot}
                        source={image.getImage('info_robot')} />
                    <NextButton onPress={() => props.navigation.navigate('Question')} />
                </>
            ) : null}
            <Menu />
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
        fontSize: wp(7),
        fontWeight: "bold",
        marginVertical: 20
    },
    subtitle: {
        fontSize: wp(5),
        textAlign: "center",
        marginBottom: 5
    },
    infoContainer: {
        marginHorizontal: wp(4),
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        marginTop: 5,
        backgroundColor: "white"
    },
    infoText: {
        fontSize: wp(5)
    },
    files: {
        display: "flex",
        flexDirection: "row"
    },
    file: {
        width: wp(20),
        height: hp(15),
        marginTop: 10,
        marginHorizontal: 5,
        resizeMode: 'contain'
    },
    robot: {
        width: wp(40),
        height: hp(30),
        resizeMode: 'contain',
        position: 'absolute',
        bottom: 10,
        left: 10
    }
});

export default InfoScreen;