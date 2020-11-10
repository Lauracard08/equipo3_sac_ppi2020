import { ProgressBar } from '@react-native-community/progress-bar-android';
import { read } from 'fs/promises';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Menu from '../custom_components/menu';
import { StudentService } from '../services/student.service';
import { UsersService } from '../services/users.service';

const studentService = StudentService.getInstance();
const userService = UsersService.getInstance();

function ProgressScreen() {
    const [students, changeStudentsState] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await userService.getUsers();
                var modifyResult = Promise.all(result.map(async (_result: any) => {
                    var result = await studentService.getUser(_result.id);
                    _result["progress"] = result.progress_percent;
                    return _result
                }));

                modifyResult.then((ready: any) => {
                    changeStudentsState(ready);
                });
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Progreso</Text>
            <ScrollView style={styles.scroollStyle}>
                {students.map((student: any) => (
                    <>
                        <View style={styles.studentContainer}>
                            <Text style={styles.studentName}>{student.nombre + " " + student.apellido}</Text>
                            <ProgressBar styleAttr="Horizontal" style={styles.progressBarStyle}
                                indeterminate={false}
                                progress={student.progress} />
                        </View>
                    </>
                ))}
            </ScrollView>
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
    scroollStyle: {
        marginBottom: 10
    },
    title: {
        fontSize: wp(10),
        marginVertical: 20,
        fontWeight: "bold"
    },
    studentContainer: {
        width: wp(80),
        marginVertical: 20,
        marginHorizontal: "auto"
    },
    studentName: {
        fontSize: wp(6)
    },
    progressBarStyle: {
        height: 50
    }
})

export default ProgressScreen;