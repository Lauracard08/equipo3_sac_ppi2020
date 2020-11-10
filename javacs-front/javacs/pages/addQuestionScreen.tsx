import CheckBox from '@react-native-community/checkbox';
import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Image, Keyboard } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Menu from '../custom_components/menu';
import NextButton from '../custom_components/nextButton';
import { MenuService } from '../services/menu.service';
import { QuestionService } from '../services/question.service';
import { ImagesUtils } from '../tools/load_images';

const questionService = QuestionService.getInstance();
const menu = MenuService.getInstance();

const postInputs = (question: string, answers: any[], answer: number) => {
    questionService.addQuestion(question, answers, answer, menu.nivelSelected).then(_ => {
        alert("Pregunta agregada correctamente");
        
    }).catch(error => {
        console.log(error);
        alert("Error al agregar la pregunta");
    });
};

function AddQuestionScreen(props: any) {
    const [question, changeQuestion] = useState("");
    const [answer1, changeAnswer1] = useState({ checkbox: false, answerText: "" });
    const [answer2, changeAnswer2] = useState({ checkbox: false, answerText: "" });
    const [answer3, changeAnswer3] = useState({ checkbox: false, answerText: "" });
    const [answer4, changeAnswer4] = useState({ checkbox: false, answerText: "" });
    const [robotStatus, changeRobotStatus] = useState(true);

    const images = ImagesUtils.getInstance();

    Keyboard.addListener('keyboardDidShow', () => {
        changeRobotStatus(false);
    });

    Keyboard.addListener('keyboardDidHide', () => {
        changeRobotStatus(true);
    });

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.question}
                multiline={true}
                placeholder="Escribe tu pregunta, agrega las respuestas y luego selecciona la correcta"
                numberOfLines={5}
                value={question}
                onChangeText={text => changeQuestion(text)} />

            <View style={styles.option}>
                <CheckBox
                    value={answer1.checkbox}
                    onValueChange={(value) => changeAnswer1({ checkbox: value, answerText: answer1.answerText })} />
                <TextInput style={styles.optionInput} onChangeText={text => changeAnswer1({ checkbox: answer1.checkbox, answerText: text })}
                    placeholder="Pregunta"></TextInput>
            </View>
            <View style={styles.option}>
                <CheckBox
                    value={answer2.checkbox}
                    onValueChange={(value) => changeAnswer2({ checkbox: value, answerText: answer2.answerText })} />
                <TextInput style={styles.optionInput} onChangeText={text => changeAnswer2({ checkbox: answer2.checkbox, answerText: text })} placeholder="Pregunta"></TextInput>
            </View>
            <View style={styles.option}>
                <CheckBox
                    value={answer3.checkbox}
                    onValueChange={(value) => changeAnswer3({ checkbox: value, answerText: answer3.answerText })} />
                <TextInput style={styles.optionInput} onChangeText={text => changeAnswer3({ checkbox: answer3.checkbox, answerText: text })} placeholder="Pregunta"></TextInput>
            </View>
            <View style={styles.option}>
                <CheckBox
                    value={answer4.checkbox}
                    onValueChange={(value) => changeAnswer4({ checkbox: value, answerText: answer4.answerText })} />
                <TextInput style={styles.optionInput} onChangeText={text => changeAnswer4({ checkbox: answer4.checkbox, answerText: text })} placeholder="Pregunta"></TextInput>
            </View>
            {robotStatus ? (
                <>
                    <Image
                        source={images.getImage('smart_robot')}
                        style={styles.robot} />
                    <NextButton icon={images.getImage('check')} style={styles.check} onPress={() => {
                        var answers = [answer1, answer2, answer3, answer4];
                        var number = 0;

                        answers.forEach((value, i) => {
                            if(value.checkbox) {
                                number = i + 1;
                            }
                        });

                        postInputs(question, answers, number);
                        props.navigation.navigate('Nivel')
                    }} />

                </>
            ) : null}
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
    question: {
        width: wp(90),
        height: hp(20),
        marginTop: 20,
        marginBottom: hp(6),
        padding: 10,
        borderWidth: 1,
        textAlign: "center",
        fontSize: wp(6)
    },
    option: {
        display: "flex",
        flexDirection: "row",
        width: wp(70),
        marginVertical: 10
    },
    robot: {
        position: "absolute",
        width: wp(40),
        height: hp(25),
        resizeMode: "contain",
        bottom: 0,
        left: 0
    },
    check: {
        position: "absolute",
        bottom: 60,
        right: 20
    },
    optionInput: {
        marginLeft: 10,
        borderWidth: 1,
        width: wp(60),
        height: 40,
        fontSize: wp(4)
    }
});

export default AddQuestionScreen;