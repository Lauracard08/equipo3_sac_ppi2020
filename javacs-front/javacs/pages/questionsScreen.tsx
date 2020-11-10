import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Image } from 'react-native';
import Menu from '../custom_components/menu';
import { MenuService } from '../services/menu.service';
import { QuestionService } from '../services/question.service';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen';
import CheckBox from '@react-native-community/checkbox';
import { ImagesUtils } from '../tools/load_images';
import NextButton from '../custom_components/nextButton';
import { StudentService } from '../services/student.service';
import { AuthService } from '../services/auth.service';

const question = QuestionService.getInstance();
const menu = MenuService.getInstance();
const image = ImagesUtils.getInstance();
const student = StudentService.getInstance();
const auth = AuthService.getInstance();

function calculatedNivelInfo() {
    switch (menu.nivelSelected) {
        case "java":
            return ["Java", 1]
        case "sintaxis":
            return ["Sintaxis", 2]
        case "epds":
            return ["Expreciones propias del sistema", 3]
        default:
            return ["", 0]
    }
}

function QuestionScreen(props: any) {
    const [questions, changeQuestion] = useState<any[]>([])
    const [selected, changeSelected] = useState(0);
    const [response1, changeResponse1] = useState<boolean>(false);
    const [response2, changeResponse2] = useState<boolean>(false);
    const [response3, changeResponse3] = useState<boolean>(false);
    const [response4, changeResponse4] = useState<boolean>(false);

    const states = [response1, response2, response3, response4];
    const changeStates = [changeResponse1, changeResponse2, changeResponse3, changeResponse4];

    const nivelInfo = calculatedNivelInfo();

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                console.log(auth.user.id)
                const result = await question.getQuestionsForCategory(menu.nivelSelected);
                menu.total_questions = result.length;
                changeQuestion(result);
            } catch (error) {
                console.log("Error fetching questions");
                alert("Ocurrio un error trayendo las preguntas");
            }
        }

        fetchQuestion();
    }, []);

    return (
        <View style={styles.container}>
            {selected == 0 ? (
                <>
                    <View style={styles.intro}>
                        <Text style={styles.introText}>Esta es la evaluación correspondiente al nivel {nivelInfo[1]}, el cual trata sobre {nivelInfo[0]}, ¡Suerte!</Text>
                    </View>
                </>
            ) : null}
            <View style={styles.tip}>
                <Image style={styles.tipImage} source={image.getImage('check')} />
                <Text style={styles.tipText}>Escoge la respuesta correcta</Text>
            </View>
            {questions.length > 0 ? (
                <>
                    <View>
                        <Text style={styles.question}>{questions[selected].pregunta}</Text>
                        {questions[selected].respuestas.split('|').map((answer: string, i: number) => (
                            <View style={styles.option}>
                                <CheckBox value={states[i]}
                                    onValueChange={(value) => changeStates[i](value)} />
                                <Text style={styles.optionText} >{answer}</Text>
                            </View>
                        ))}
                    </View>
                </>
            ) : (
                    <ActivityIndicator />
                )}

            <NextButton onPress={() => {
                var checkSum = false;
                states.forEach((state, i: number) => {

                    if (state) {
                        checkSum = state;
                        if (i + 1 == questions[selected].respuesta) {
                            //student.addProgress(parseInt(""+auth.user.id));
                            student.addCompleteQuestion(parseInt("" + auth.user.id), questions[selected].id);
                            menu.correct_answers++;
                        }
                    }
                    changeStates[i](false);
                });
                if (checkSum) {
                    if (questions.length - 1 == selected) {
                        props.navigation.navigate('Result');
                    }
                    else {
                        changeSelected(selected + 1);
                    }
                }
                else {
                    alert("Debes seleccionar una opción, para continuar")
                }
            }} />
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
    intro: {
        width: wp(80),
        marginVertical: hp(2),
        padding: 8,
        borderRadius: 10,
        backgroundColor: "#fff",
    },
    introText: {
        fontSize: wp(5)
    },
    tip: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: wp(10),
        marginRight: wp(10),
        marginVertical: hp(4)
    },
    tipImage: {
        width: wp(20),
        height: hp(10),
        marginRight: 10,
        resizeMode: 'stretch'
    },
    tipText: {
        fontSize: wp(6),
        width: wp(55),
        fontWeight: "bold"
    },
    question: {
        paddingHorizontal: 10,
        fontSize: wp(6),
        fontWeight: "bold",
        marginVertical: hp(2),
        textAlign: "center"
    },
    option: {
        display: "flex",
        flexDirection: "row",
        width: wp(70),
        marginVertical: 5,
        alignItems: "center"
    },
    optionText: {
        marginLeft: 10,
        width: wp(60),
        height: 40,
        fontSize: wp(5),
        lineHeight: 40
    }
})

export default QuestionScreen;