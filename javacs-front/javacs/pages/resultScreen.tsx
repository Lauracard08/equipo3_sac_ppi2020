import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Menu from '../custom_components/menu';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MenuService } from '../services/menu.service';
import { ImagesUtils } from '../tools/load_images';

const menu = MenuService.getInstance();
const image = ImagesUtils.getInstance();

function resultScreen(props: any) {
    return (
        <View style={styles.container}>
            <View style={styles.buble}>
                <Text style={styles.result}>Resultado.</Text>
            </View>
            <View style={styles.bar}>
                <Text style={styles.resultInfo}>Tu resultado es: {menu.correct_answers / menu.total_questions * 100}%</Text>
            </View>
            <View style={styles.resume}>
                <Text style={styles.resumeText}>Respuestas correctas: {menu.correct_answers}</Text>
                <Text style={styles.resumeText}>Respuestas incorrectas: {menu.total_questions - menu.correct_answers}</Text>
            </View>
            <View style={styles.buble}>
                <Text style={styles.score}>Tu puntaje es: {(menu.correct_answers / menu.total_questions < 0.33) ? "Bajo" : ((menu.correct_answers / menu.total_questions < 0.66) ? "Medio" : "Alto")}</Text>
            </View>
            <Image
                source={image.getImage('ant_robot')}
                style={styles.robot} />
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
    buble: {
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        marginVertical: hp(10)
    },
    result: {
        fontSize: wp(6),
        fontWeight: "bold"
    },
    bar: {
        width: wp(100),
        padding: 20,
        backgroundColor: "white"
    },
    resultInfo: {
        width: wp(100),
        textAlign: "center",
        fontSize: wp(5)
    },
    resume: {
        width: wp(100),
        paddingLeft: wp(20)
    },
    resumeText: {
        fontSize: wp(4)
    },
    score: {
        fontSize: wp(5)
    },
    robot: {
        width: wp(45),
        height: hp(30),
        position: "absolute",
        bottom: 5,
        right: 5,
        resizeMode: "stretch"
    }
});

export default resultScreen;